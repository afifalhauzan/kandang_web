<?php

namespace App\Http\Controllers;

use App\Models\Business;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use OpenApi\Attributes as OA;

class BusinessController extends Controller
{
    #[OA\Get(
        path: "/api/businesses",
        summary: "Get all businesses owned by the authenticated user",
        tags: ["Business"],
        security: [["bearerAuth" => []]],
        parameters: [
            new OA\Parameter(
                name: "category",
                in: "query",
                required: false,
                description: "Filter by category",
                schema: new OA\Schema(type: "string", example: "F&B")
            ),
            new OA\Parameter(
                name: "city",
                in: "query",
                required: false,
                description: "Filter by city",
                schema: new OA\Schema(type: "string", example: "Malang")
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
                description: "List of businesses",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "status", type: "string", example: "success"),
                        new OA\Property(property: "message", type: "string", example: "Success"),
                        new OA\Property(property: "data", type: "array", items: new OA\Items(
                            properties: [
                                new OA\Property(property: "id", type: "integer", example: 1),
                                new OA\Property(property: "user_id", type: "integer", example: 1),
                                new OA\Property(property: "name", type: "string", example: "Kedai Es Teh Manis"),
                                new OA\Property(property: "category", type: "string", example: "F&B"),
                                new OA\Property(property: "city", type: "string", example: "Malang"),
                                new OA\Property(property: "address", type: "string", example: "Jl. Soekarno Hatta No. 12"),
                                new OA\Property(property: "latitude", type: "number", format: "float", example: -7.9666),
                                new OA\Property(property: "longitude", type: "number", format: "float", example: 112.6326),
                                new OA\Property(property: "is_active", type: "boolean", example: true),
                                new OA\Property(property: "created_at", type: "string", format: "date-time"),
                                new OA\Property(property: "updated_at", type: "string", format: "date-time")
                            ]
                        ))
                    ]
                )
            ),
            new OA\Response(response: 401, description: "Unauthenticated")
        ]
    )]
    public function index(Request $request)
    {
        $query = $request->user()->businesses();

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        if ($request->filled('city')) {
            $query->where('city', 'like', '%' . $request->city . '%');
        }

        if ($request->has('is_active')) {
            $query->where('is_active', filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN));
        }

        $businesses = $query->latest()->get();

        return $this->successResponse($businesses);
    }

    #[OA\Post(
        path: "/api/businesses",
        summary: "Create a new business",
        tags: ["Business"],
        security: [["bearerAuth" => []]],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ["name", "city"],
                properties: [
                    new OA\Property(property: "name", type: "string", maxLength: 200, example: "Kedai Es Teh Manis"),
                    new OA\Property(property: "category", type: "string", maxLength: 100, example: "F&B"),
                    new OA\Property(property: "city", type: "string", maxLength: 100, example: "Malang"),
                    new OA\Property(property: "address", type: "string", example: "Jl. Soekarno Hatta No. 12"),
                    new OA\Property(property: "latitude", type: "number", format: "float", example: -7.9666),
                    new OA\Property(property: "longitude", type: "number", format: "float", example: 112.6326),
                    new OA\Property(property: "is_active", type: "boolean", example: true)
                ]
            )
        ),
        responses: [
            new OA\Response(
                response: 201,
                description: "Business created successfully",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "status", type: "string", example: "success"),
                        new OA\Property(property: "message", type: "string", example: "Business created successfully"),
                        new OA\Property(property: "data", type: "object")
                    ]
                )
            ),
            new OA\Response(response: 400, description: "Validation error"),
            new OA\Response(response: 401, description: "Unauthenticated")
        ]
    )]
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'      => 'required|string|max:200',
            'category'  => 'sometimes|string|max:100',
            'city'      => 'required|string|max:100',
            'address'   => 'nullable|string',
            'latitude'  => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'is_active' => 'sometimes|boolean',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation Error', 400, $validator->errors());
        }

        $business = $request->user()->businesses()->create($validator->validated());

        return $this->successResponse($business, 'Business created successfully', 201);
    }

    #[OA\Get(
        path: "/api/businesses/{id}",
        summary: "Get a specific business by ID",
        tags: ["Business"],
        security: [["bearerAuth" => []]],
        parameters: [
            new OA\Parameter(
                name: "id",
                in: "path",
                required: true,
                description: "Business ID",
                schema: new OA\Schema(type: "integer", example: 1)
            )
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "Business detail",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "status", type: "string", example: "success"),
                        new OA\Property(property: "data", type: "object")
                    ]
                )
            ),
            new OA\Response(response: 401, description: "Unauthenticated"),
            new OA\Response(response: 404, description: "Business not found")
        ]
    )]
    public function show(Request $request, int $id)
    {
        $business = $request->user()->businesses()->find($id);

        if (!$business) {
            return $this->errorResponse('Business not found', 404);
        }

        return $this->successResponse($business);
    }

    #[OA\Put(
        path: "/api/businesses/{id}",
        summary: "Update a specific business",
        tags: ["Business"],
        security: [["bearerAuth" => []]],
        parameters: [
            new OA\Parameter(
                name: "id",
                in: "path",
                required: true,
                description: "Business ID",
                schema: new OA\Schema(type: "integer", example: 1)
            )
        ],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                properties: [
                    new OA\Property(property: "name", type: "string", maxLength: 200, example: "Kedai Es Teh Manis Updated"),
                    new OA\Property(property: "category", type: "string", maxLength: 100, example: "F&B"),
                    new OA\Property(property: "city", type: "string", maxLength: 100, example: "Surabaya"),
                    new OA\Property(property: "address", type: "string", example: "Jl. Basuki Rahmat No. 10"),
                    new OA\Property(property: "latitude", type: "number", format: "float", example: -7.2575),
                    new OA\Property(property: "longitude", type: "number", format: "float", example: 112.7521),
                    new OA\Property(property: "is_active", type: "boolean", example: true)
                ]
            )
        ),
        responses: [
            new OA\Response(
                response: 200,
                description: "Business updated successfully",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "status", type: "string", example: "success"),
                        new OA\Property(property: "message", type: "string", example: "Business updated successfully"),
                        new OA\Property(property: "data", type: "object")
                    ]
                )
            ),
            new OA\Response(response: 400, description: "Validation error"),
            new OA\Response(response: 401, description: "Unauthenticated"),
            new OA\Response(response: 404, description: "Business not found")
        ]
    )]
    public function update(Request $request, int $id)
    {
        $business = $request->user()->businesses()->find($id);

        if (!$business) {
            return $this->errorResponse('Business not found', 404);
        }

        $validator = Validator::make($request->all(), [
            'name'      => 'sometimes|string|max:200',
            'category'  => 'sometimes|string|max:100',
            'city'      => 'sometimes|string|max:100',
            'address'   => 'nullable|string',
            'latitude'  => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'is_active' => 'sometimes|boolean',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation Error', 400, $validator->errors());
        }

        $business->update($validator->validated());

        return $this->successResponse($business->fresh(), 'Business updated successfully');
    }

    #[OA\Delete(
        path: "/api/businesses/{id}",
        summary: "Delete a specific business",
        tags: ["Business"],
        security: [["bearerAuth" => []]],
        parameters: [
            new OA\Parameter(
                name: "id",
                in: "path",
                required: true,
                description: "Business ID",
                schema: new OA\Schema(type: "integer", example: 1)
            )
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "Business deleted successfully",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "status", type: "string", example: "success"),
                        new OA\Property(property: "message", type: "string", example: "Business deleted successfully")
                    ]
                )
            ),
            new OA\Response(response: 401, description: "Unauthenticated"),
            new OA\Response(response: 404, description: "Business not found")
        ]
    )]
    public function destroy(Request $request, int $id)
    {
        $business = $request->user()->businesses()->find($id);

        if (!$business) {
            return $this->errorResponse('Business not found', 404);
        }

        $business->delete();

        return $this->successResponse(null, 'Business deleted successfully');
    }
}
