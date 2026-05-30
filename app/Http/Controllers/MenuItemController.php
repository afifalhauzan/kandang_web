<?php

namespace App\Http\Controllers;

use App\Models\Business;
use App\Models\MenuItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\MenuItemsImport;

use OpenApi\Attributes as OA;

class MenuItemController extends Controller
{
    #[OA\Get(
        path: "/api/businesses/{business}/menus",
        summary: "Get all menus for a specific business",
        tags: ["Menu"],
        security: [["bearerAuth" => []]],
        parameters: [
            new OA\Parameter(
                name: "business",
                in: "path",
                required: true,
                description: "Business ID",
                schema: new OA\Schema(type: "integer", example: 1)
            ),
            new OA\Parameter(
                name: "category",
                in: "query",
                required: false,
                description: "Filter by category",
                schema: new OA\Schema(type: "string", example: "Minuman Dingin")
            ),
            new OA\Parameter(
                name: "is_active",
                in: "query",
                required: false,
                description: "Filter by active status",
                schema: new OA\Schema(type: "boolean", example: true)
            )
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "List of menu items",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "status", type: "string", example: "success"),
                        new OA\Property(property: "message", type: "string", example: "Success"),
                        new OA\Property(property: "data", type: "array", items: new OA\Items(
                            properties: [
                                new OA\Property(property: "id", type: "integer", example: 1),
                                new OA\Property(property: "business_id", type: "integer", example: 1),
                                new OA\Property(property: "name", type: "string", example: "Es Teh Manis"),
                                new OA\Property(property: "category", type: "string", example: "Minuman Dingin"),
                                new OA\Property(property: "unit", type: "string", example: "cup"),
                                new OA\Property(property: "selling_price", type: "number", format: "float", example: 5000),
                                new OA\Property(property: "cogs", type: "number", format: "float", example: 2000),
                                new OA\Property(property: "margin_pct", type: "number", format: "float", example: 60),
                                new OA\Property(property: "is_seasonal", type: "boolean", example: false),
                                new OA\Property(property: "is_active", type: "boolean", example: true),
                                new OA\Property(property: "notes", type: "string", example: "Manis banget"),
                                new OA\Property(property: "created_at", type: "string", format: "date-time"),
                                new OA\Property(property: "updated_at", type: "string", format: "date-time")
                            ]
                        ))
                    ]
                )
            ),
            new OA\Response(response: 401, description: "Unauthenticated"),
            new OA\Response(response: 403, description: "Forbidden"),
            new OA\Response(response: 404, description: "Business not found")
        ]
    )]
    public function index(Request $request, $businessId)
    {
        $business = $request->user()->businesses()->find($businessId);

        if (!$business) {
            return $this->errorResponse('Business not found or unauthorized', 404);
        }

        $query = $business->menuItems();

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        if ($request->has('is_active')) {
            $query->where('is_active', filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN));
        }

        $menus = $query->latest()->get();

        return $this->successResponse($menus);
    }

    #[OA\Post(
        path: "/api/businesses/{business}/menus",
        summary: "Create a new menu item",
        tags: ["Menu"],
        security: [["bearerAuth" => []]],
        parameters: [
            new OA\Parameter(
                name: "business",
                in: "path",
                required: true,
                description: "Business ID",
                schema: new OA\Schema(type: "integer", example: 1)
            )
        ],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ["name", "selling_price"],
                properties: [
                    new OA\Property(property: "name", type: "string", maxLength: 200, example: "Es Teh Manis"),
                    new OA\Property(property: "category", type: "string", maxLength: 100, example: "Minuman Dingin"),
                    new OA\Property(property: "unit", type: "string", maxLength: 50, example: "cup"),
                    new OA\Property(property: "selling_price", type: "number", format: "float", example: 5000),
                    new OA\Property(property: "cogs", type: "number", format: "float", example: 2000),
                    new OA\Property(property: "is_seasonal", type: "boolean", example: false),
                    new OA\Property(property: "is_active", type: "boolean", example: true),
                    new OA\Property(property: "notes", type: "string", example: "Teh pilihan")
                ]
            )
        ),
        responses: [
            new OA\Response(
                response: 201,
                description: "Menu item created successfully",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "status", type: "string", example: "success"),
                        new OA\Property(property: "message", type: "string", example: "Menu item created successfully"),
                        new OA\Property(property: "data", type: "object")
                    ]
                )
            ),
            new OA\Response(response: 400, description: "Validation error"),
            new OA\Response(response: 401, description: "Unauthenticated"),
            new OA\Response(response: 403, description: "Forbidden"),
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
            'name'          => 'required|string|max:200',
            'category'      => 'nullable|string|max:100',
            'unit'          => 'nullable|string|max:50',
            'selling_price' => 'required|numeric|min:0',
            'cogs'          => 'nullable|numeric|min:0',
            'is_seasonal'   => 'nullable|boolean',
            'is_active'     => 'nullable|boolean',
            'notes'         => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation Error', 400, $validator->errors());
        }

        $menu = $business->menuItems()->create($validator->validated());

        return $this->successResponse($menu, 'Menu item created successfully', 201);
    }

    #[OA\Get(
        path: "/api/businesses/{business}/menus/{menu}",
        summary: "Get a specific menu item",
        tags: ["Menu"],
        security: [["bearerAuth" => []]],
        parameters: [
            new OA\Parameter(
                name: "business",
                in: "path",
                required: true,
                description: "Business ID",
                schema: new OA\Schema(type: "integer", example: 1)
            ),
            new OA\Parameter(
                name: "menu",
                in: "path",
                required: true,
                description: "Menu Item ID",
                schema: new OA\Schema(type: "integer", example: 1)
            )
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "Menu detail",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "status", type: "string", example: "success"),
                        new OA\Property(property: "data", type: "object")
                    ]
                )
            ),
            new OA\Response(response: 401, description: "Unauthenticated"),
            new OA\Response(response: 404, description: "Menu or Business not found")
        ]
    )]
    public function show(Request $request, $businessId, $menuId)
    {
        $business = $request->user()->businesses()->find($businessId);

        if (!$business) {
            return $this->errorResponse('Business not found or unauthorized', 404);
        }

        $menu = $business->menuItems()->find($menuId);

        if (!$menu) {
            return $this->errorResponse('Menu item not found', 404);
        }

        return $this->successResponse($menu);
    }

    #[OA\Put(
        path: "/api/businesses/{business}/menus/{menu}",
        summary: "Update a menu item",
        tags: ["Menu"],
        security: [["bearerAuth" => []]],
        parameters: [
            new OA\Parameter(
                name: "business",
                in: "path",
                required: true,
                description: "Business ID",
                schema: new OA\Schema(type: "integer", example: 1)
            ),
            new OA\Parameter(
                name: "menu",
                in: "path",
                required: true,
                description: "Menu Item ID",
                schema: new OA\Schema(type: "integer", example: 1)
            )
        ],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                properties: [
                    new OA\Property(property: "name", type: "string", maxLength: 200, example: "Es Teh Manis Jumbo"),
                    new OA\Property(property: "category", type: "string", maxLength: 100, example: "Minuman Dingin"),
                    new OA\Property(property: "unit", type: "string", maxLength: 50, example: "cup besar"),
                    new OA\Property(property: "selling_price", type: "number", format: "float", example: 8000),
                    new OA\Property(property: "cogs", type: "number", format: "float", example: 3500),
                    new OA\Property(property: "is_seasonal", type: "boolean", example: false),
                    new OA\Property(property: "is_active", type: "boolean", example: true),
                    new OA\Property(property: "notes", type: "string", example: "Teh pilihan")
                ]
            )
        ),
        responses: [
            new OA\Response(
                response: 200,
                description: "Menu item updated successfully",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "status", type: "string", example: "success"),
                        new OA\Property(property: "message", type: "string", example: "Menu item updated successfully"),
                        new OA\Property(property: "data", type: "object")
                    ]
                )
            ),
            new OA\Response(response: 400, description: "Validation error"),
            new OA\Response(response: 401, description: "Unauthenticated"),
            new OA\Response(response: 404, description: "Menu or Business not found")
        ]
    )]
    public function update(Request $request, $businessId, $menuId)
    {
        $business = $request->user()->businesses()->find($businessId);

        if (!$business) {
            return $this->errorResponse('Business not found or unauthorized', 404);
        }

        $menu = $business->menuItems()->find($menuId);

        if (!$menu) {
            return $this->errorResponse('Menu item not found', 404);
        }

        $validator = Validator::make($request->all(), [
            'name'          => 'sometimes|string|max:200',
            'category'      => 'nullable|string|max:100',
            'unit'          => 'nullable|string|max:50',
            'selling_price' => 'sometimes|numeric|min:0',
            'cogs'          => 'nullable|numeric|min:0',
            'is_seasonal'   => 'nullable|boolean',
            'is_active'     => 'nullable|boolean',
            'notes'         => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation Error', 400, $validator->errors());
        }

        $menu->update($validator->validated());

        return $this->successResponse($menu->fresh(), 'Menu item updated successfully');
    }

    #[OA\Delete(
        path: "/api/businesses/{business}/menus/{menu}",
        summary: "Delete a menu item",
        tags: ["Menu"],
        security: [["bearerAuth" => []]],
        parameters: [
            new OA\Parameter(
                name: "business",
                in: "path",
                required: true,
                description: "Business ID",
                schema: new OA\Schema(type: "integer", example: 1)
            ),
            new OA\Parameter(
                name: "menu",
                in: "path",
                required: true,
                description: "Menu Item ID",
                schema: new OA\Schema(type: "integer", example: 1)
            )
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "Menu item deleted successfully",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "status", type: "string", example: "success"),
                        new OA\Property(property: "message", type: "string", example: "Menu item deleted successfully")
                    ]
                )
            ),
            new OA\Response(response: 401, description: "Unauthenticated"),
            new OA\Response(response: 404, description: "Menu or Business not found")
        ]
    )]
    public function destroy(Request $request, $businessId, $menuId)
    {
        $business = $request->user()->businesses()->find($businessId);

        if (!$business) {
            return $this->errorResponse('Business not found or unauthorized', 404);
        }

        $menu = $business->menuItems()->find($menuId);

        if (!$menu) {
            return $this->errorResponse('Menu item not found', 404);
        }

        $menu->delete();

        return $this->successResponse(null, 'Menu item deleted successfully');
    }

    #[OA\Patch(
        path: "/api/businesses/{business}/menus/{menu}/toggle-status",
        summary: "Toggle active status of a menu item",
        tags: ["Menu"],
        security: [["bearerAuth" => []]],
        parameters: [
            new OA\Parameter(
                name: "business",
                in: "path",
                required: true,
                description: "Business ID",
                schema: new OA\Schema(type: "integer", example: 1)
            ),
            new OA\Parameter(
                name: "menu",
                in: "path",
                required: true,
                description: "Menu Item ID",
                schema: new OA\Schema(type: "integer", example: 1)
            )
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "Menu status toggled successfully",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "status", type: "string", example: "success"),
                        new OA\Property(property: "message", type: "string", example: "Menu status updated"),
                        new OA\Property(property: "data", type: "object")
                    ]
                )
            ),
            new OA\Response(response: 401, description: "Unauthenticated"),
            new OA\Response(response: 404, description: "Menu or Business not found")
        ]
    )]
    public function toggleStatus(Request $request, $businessId, $menuId)
    {
        $business = $request->user()->businesses()->find($businessId);

        if (!$business) {
            return $this->errorResponse('Business not found or unauthorized', 404);
        }

        $menu = $business->menuItems()->find($menuId);

        if (!$menu) {
            return $this->errorResponse('Menu item not found', 404);
        }

        $menu->is_active = !$menu->is_active;
        $menu->save();

        return $this->successResponse($menu, 'Menu status updated');
    }

    #[OA\Post(
        path: "/api/businesses/{business}/menus/import",
        summary: "Import menus from Excel or CSV file",
        tags: ["Menu"],
        security: [["bearerAuth" => []]],
        parameters: [
            new OA\Parameter(
                name: "business",
                in: "path",
                required: true,
                description: "Business ID",
                schema: new OA\Schema(type: "integer", example: 1)
            )
        ],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\MediaType(
                mediaType: "multipart/form-data",
                schema: new OA\Schema(
                    required: ["file"],
                    properties: [
                        new OA\Property(
                            property: "file",
                            type: "string",
                            format: "binary",
                            description: "Excel or CSV file"
                        )
                    ]
                )
            )
        ),
        responses: [
            new OA\Response(
                response: 200,
                description: "Menus imported successfully",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "status", type: "string", example: "success"),
                        new OA\Property(property: "message", type: "string", example: "Menus imported successfully")
                    ]
                )
            ),
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
            Excel::import(new MenuItemsImport($business->id), $request->file('file'));
            return $this->successResponse(null, 'Menus imported successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('Error importing data: ' . $e->getMessage(), 500);
        }
    }
}
