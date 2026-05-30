<?php

namespace App\Imports;

use App\Models\MenuItem;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class MenuItemsImport implements ToModel, WithHeadingRow, WithValidation
{
    protected $businessId;

    public function __construct($businessId)
    {
        $this->businessId = $businessId;
    }

    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new MenuItem([
            'business_id'   => $this->businessId,
            'name'          => $row['name'],
            'category'      => $row['category'] ?? null,
            'unit'          => $row['unit'] ?? 'cup',
            'selling_price' => $row['selling_price'],
            'cogs'          => $row['cogs'] ?? 0,
            'is_seasonal'   => filter_var($row['is_seasonal'] ?? false, FILTER_VALIDATE_BOOLEAN),
            'notes'         => $row['notes'] ?? null,
            'is_active'     => true,
        ]);
    }

    public function rules(): array
    {
        return [
            'name'          => 'required|string|max:200',
            'category'      => 'nullable|string|max:100',
            'unit'          => 'nullable|string|max:50',
            'selling_price' => 'required|numeric|min:0',
            'cogs'          => 'nullable|numeric|min:0',
            'is_seasonal'   => 'nullable|boolean',
            'notes'         => 'nullable|string',
        ];
    }
}
