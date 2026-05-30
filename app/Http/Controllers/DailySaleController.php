<?php

namespace App\Http\Controllers;

use App\Models\Business;
use App\Models\DailySale;
use App\Models\DailySaleItem;
use App\Models\MenuItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\DailySalesImport;

use OpenApi\Attributes as OA;

class DailySaleController extends Controller
{
    #[OA\Get(
        path: "/api/businesses/{business}/daily-sales",
        summary: "Get daily sales history for a specific business",
        tags: ["Daily Sale"],
        security: [["bearerAuth" => []]],
        parameters: [
            new OA\Parameter(name: "business", in: "path", required: true, description: "Business ID", schema: new OA\Schema(type: "integer", example: 1)),
            new OA\Parameter(name: "start_date", in: "query", required: false, description: "Start Date (YYYY-MM-DD)", schema: new OA\Schema(type: "string", format: "date")),
            new OA\Parameter(name: "end_date", in: "query", required: false, description: "End Date (YYYY-MM-DD)", schema: new OA\Schema(type: "string", format: "date"))
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "List of daily sales",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "status", type: "string", example: "success"),
                        new OA\Property(property: "data", type: "array", items: new OA\Items(type: "object"))
                    ]
                )
            ),
            new OA\Response(response: 401, description: "Unauthenticated"),
            new OA\Response(response: 404, description: "Business not found")
        ]
    )]
    public function index(Request $request, $businessId)
    {
        $business = $request->user()->businesses()->find($businessId);

        if (!$business) {
            return $this->errorResponse('Business not found or unauthorized', 404);
        }

        $query = $business->dailySales()->with('items.menuItem');

        if ($request->filled('start_date')) {
            $query->whereDate('sale_date', '>=', $request->start_date);
        }

        if ($request->filled('end_date')) {
            $query->whereDate('sale_date', '<=', $request->end_date);
        }

        $sales = $query->orderBy('sale_date', 'desc')->get();

        return $this->successResponse($sales);
    }

    #[OA\Post(
        path: "/api/businesses/{business}/daily-sales",
        summary: "Input daily sales data",
        tags: ["Daily Sale"],
        security: [["bearerAuth" => []]],
        parameters: [
            new OA\Parameter(name: "business", in: "path", required: true, description: "Business ID", schema: new OA\Schema(type: "integer", example: 1))
        ],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ["sale_date", "items"],
                properties: [
                    new OA\Property(property: "sale_date", type: "string", format: "date", example: "2026-05-09"),
                    new OA\Property(property: "notes", type: "string", example: "Hujan deras, toko sepi"),
                    new OA\Property(property: "items", type: "array", items: new OA\Items(
                        properties: [
                            new OA\Property(property: "menu_item_id", type: "integer", example: 1),
                            new OA\Property(property: "qty_sold", type: "number", format: "float", example: 50),
                            new OA\Property(property: "qty_produced", type: "number", format: "float", example: 60),
                            new OA\Property(property: "qty_wasted", type: "number", format: "float", example: 10)
                        ]
                    ))
                ]
            )
        ),
        responses: [
            new OA\Response(response: 201, description: "Daily sales recorded successfully"),
            new OA\Response(response: 400, description: "Validation error"),
            new OA\Response(response: 401, description: "Unauthenticated"),
            new OA\Response(response: 404, description: "Business not found")
        ]
    )]
    public function store(Request $request, $businessId)
    {
        $business = $request->user()->businesses()->find($businessId);

        if (!$business) {
            return $this->errorResponse('Business not found or unauthorized', 404);
        }

        $validator = Validator::make($request->all(), [
            'sale_date'          => 'required|date',
            'notes'              => 'nullable|string',
            'items'              => 'required|array|min:1',
            'items.*.menu_item_id'=> 'required|exists:menu_items,id',
            'items.*.qty_sold'   => 'required|numeric|min:0',
            'items.*.qty_produced'=> 'nullable|numeric|min:0',
            'items.*.qty_wasted' => 'nullable|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation Error', 400, $validator->errors());
        }

        try {
            DB::beginTransaction();

            $dailySale = $business->dailySales()->updateOrCreate(
                ['sale_date' => $request->sale_date],
                ['notes' => $request->notes, 'input_method' => 'manual']
            );

            // Get menus to calculate revenue correctly
            $menuIds = collect($request->items)->pluck('menu_item_id');
            $menus = MenuItem::whereIn('id', $menuIds)->where('business_id', $business->id)->get()->keyBy('id');

            foreach ($request->items as $item) {
                // Ensure the menu belongs to the business
                if (!isset($menus[$item['menu_item_id']])) continue;

                $menu = $menus[$item['menu_item_id']];
                $revenue = $item['qty_sold'] * $menu->selling_price;

                $dailySale->items()->updateOrCreate(
                    ['menu_item_id' => $item['menu_item_id']],
                    [
                        'qty_sold'     => $item['qty_sold'],
                        'qty_produced' => $item['qty_produced'] ?? 0,
                        'qty_wasted'   => $item['qty_wasted'] ?? 0,
                        'revenue'      => $revenue,
                    ]
                );
            }

            DB::commit();

            return $this->successResponse($dailySale->load('items.menuItem'), 'Daily sales recorded successfully', 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->errorResponse('Failed to record sales: ' . $e->getMessage(), 500);
        }
    }

    #[OA\Get(
        path: "/api/businesses/{business}/daily-sales/{sale}",
        summary: "Get specific daily sales detail",
        tags: ["Daily Sale"],
        security: [["bearerAuth" => []]],
        parameters: [
            new OA\Parameter(name: "business", in: "path", required: true, schema: new OA\Schema(type: "integer")),
            new OA\Parameter(name: "sale", in: "path", required: true, schema: new OA\Schema(type: "integer"))
        ],
        responses: [
            new OA\Response(response: 200, description: "Daily sales detail"),
            new OA\Response(response: 404, description: "Not found")
        ]
    )]
    public function show(Request $request, $businessId, $saleId)
    {
        $business = $request->user()->businesses()->find($businessId);

        if (!$business) {
            return $this->errorResponse('Business not found or unauthorized', 404);
        }

        $sale = $business->dailySales()->with('items.menuItem')->find($saleId);

        if (!$sale) {
            return $this->errorResponse('Daily sale record not found', 404);
        }

        return $this->successResponse($sale);
    }

    #[OA\Put(
        path: "/api/businesses/{business}/daily-sales/{sale}",
        summary: "Update specific daily sales data",
        tags: ["Daily Sale"],
        security: [["bearerAuth" => []]],
        parameters: [
            new OA\Parameter(name: "business", in: "path", required: true, schema: new OA\Schema(type: "integer")),
            new OA\Parameter(name: "sale", in: "path", required: true, schema: new OA\Schema(type: "integer"))
        ],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                properties: [
                    new OA\Property(property: "notes", type: "string", example: "Updated notes"),
                    new OA\Property(property: "items", type: "array", items: new OA\Items(
                        properties: [
                            new OA\Property(property: "menu_item_id", type: "integer", example: 1),
                            new OA\Property(property: "qty_sold", type: "number", format: "float", example: 45),
                            new OA\Property(property: "qty_produced", type: "number", format: "float", example: 50),
                            new OA\Property(property: "qty_wasted", type: "number", format: "float", example: 5)
                        ]
                    ))
                ]
            )
        ),
        responses: [
            new OA\Response(response: 200, description: "Daily sales updated successfully"),
            new OA\Response(response: 404, description: "Not found")
        ]
    )]
    public function update(Request $request, $businessId, $saleId)
    {
        $business = $request->user()->businesses()->find($businessId);

        if (!$business) {
            return $this->errorResponse('Business not found or unauthorized', 404);
        }

        $sale = $business->dailySales()->find($saleId);

        if (!$sale) {
            return $this->errorResponse('Daily sale record not found', 404);
        }

        $validator = Validator::make($request->all(), [
            'notes'              => 'nullable|string',
            'items'              => 'nullable|array|min:1',
            'items.*.menu_item_id'=> 'required|exists:menu_items,id',
            'items.*.qty_sold'   => 'required|numeric|min:0',
            'items.*.qty_produced'=> 'nullable|numeric|min:0',
            'items.*.qty_wasted' => 'nullable|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation Error', 400, $validator->errors());
        }

        try {
            DB::beginTransaction();

            if ($request->has('notes')) {
                $sale->update(['notes' => $request->notes]);
            }

            if ($request->has('items')) {
                $menuIds = collect($request->items)->pluck('menu_item_id');
                $menus = MenuItem::whereIn('id', $menuIds)->where('business_id', $business->id)->get()->keyBy('id');

                foreach ($request->items as $item) {
                    if (!isset($menus[$item['menu_item_id']])) continue;

                    $menu = $menus[$item['menu_item_id']];
                    $revenue = $item['qty_sold'] * $menu->selling_price;

                    $sale->items()->updateOrCreate(
                        ['menu_item_id' => $item['menu_item_id']],
                        [
                            'qty_sold'     => $item['qty_sold'],
                            'qty_produced' => $item['qty_produced'] ?? 0,
                            'qty_wasted'   => $item['qty_wasted'] ?? 0,
                            'revenue'      => $revenue,
                        ]
                    );
                }
            }

            DB::commit();

            return $this->successResponse($sale->load('items.menuItem'), 'Daily sales updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->errorResponse('Failed to update sales: ' . $e->getMessage(), 500);
        }
    }

    #[OA\Post(
        path: "/api/businesses/{business}/daily-sales/import",
        summary: "Import historical daily sales from Excel or CSV file",
        tags: ["Daily Sale"],
        security: [["bearerAuth" => []]],
        parameters: [
            new OA\Parameter(name: "business", in: "path", required: true, description: "Business ID", schema: new OA\Schema(type: "integer", example: 1))
        ],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\MediaType(
                mediaType: "multipart/form-data",
                schema: new OA\Schema(
                    required: ["file"],
                    properties: [
                        new OA\Property(property: "file", type: "string", format: "binary", description: "Excel or CSV file")
                    ]
                )
            )
        ),
        responses: [
            new OA\Response(response: 200, description: "Sales data imported successfully"),
            new OA\Response(response: 400, description: "Validation error"),
            new OA\Response(response: 401, description: "Unauthenticated"),
            new OA\Response(response: 404, description: "Business not found")
        ]
    )]
    public function import(Request $request, $businessId)
    {
        $business = $request->user()->businesses()->find($businessId);

        if (!$business) {
            return $this->errorResponse('Business not found or unauthorized', 404);
        }

        $validator = Validator::make($request->all(), [
            'file' => 'required|mimes:xlsx,xls,csv|max:10240',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation Error', 400, $validator->errors());
        }

        try {
            Excel::import(new DailySalesImport($business->id), $request->file('file'));
            return $this->successResponse(null, 'Sales data imported successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('Error importing data: ' . $e->getMessage(), 500);
        }
    }
}
