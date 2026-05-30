<?php

namespace App\Imports;

use App\Models\DailySale;
use App\Models\DailySaleItem;
use App\Models\MenuItem;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class DailySalesImport implements ToCollection, WithHeadingRow, WithValidation
{
    protected $businessId;

    public function __construct($businessId)
    {
        $this->businessId = $businessId;
    }

    public function collection(Collection $rows)
    {
        // Group by sale_date
        $grouped = $rows->groupBy(function($row) {
            // Check if sale_date is excel date integer or string
            if (is_numeric($row['sale_date'])) {
                return \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row['sale_date'])->format('Y-m-d');
            }
            return Carbon::parse($row['sale_date'])->format('Y-m-d');
        });

        foreach ($grouped as $date => $items) {
            // Create or update DailySale
            $dailySale = DailySale::updateOrCreate(
                [
                    'business_id' => $this->businessId,
                    'sale_date'   => $date,
                ],
                [
                    'notes'        => 'Imported from Excel/CSV',
                    'input_method' => 'manual',
                ]
            );

            foreach ($items as $row) {
                // Find menu item by name
                $menuItem = MenuItem::where('business_id', $this->businessId)
                    ->where('name', 'like', '%' . $row['menu_name'] . '%')
                    ->first();

                if (!$menuItem) {
                    continue; // Skip if menu not found
                }

                $qtySold = $row['qty_sold'] ?? 0;
                $revenue = $qtySold * $menuItem->selling_price;

                DailySaleItem::updateOrCreate(
                    [
                        'daily_sale_id' => $dailySale->id,
                        'menu_item_id'  => $menuItem->id,
                    ],
                    [
                        'qty_sold'     => $qtySold,
                        'qty_produced' => $row['qty_produced'] ?? 0,
                        'qty_wasted'   => $row['qty_wasted'] ?? 0,
                        'revenue'      => $revenue,
                    ]
                );
            }
        }
    }

    public function rules(): array
    {
        return [
            'sale_date'    => 'required',
            'menu_name'    => 'required|string',
            'qty_sold'     => 'required|numeric|min:0',
            'qty_produced' => 'nullable|numeric|min:0',
            'qty_wasted'   => 'nullable|numeric|min:0',
        ];
    }
}
