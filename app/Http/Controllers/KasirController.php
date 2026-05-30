<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Business;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use OpenApi\Attributes as OA;

class KasirController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    #[OA\Get(
        path: "/api/kasir",
        summary: "Get all kasir for the authenticated owner",
        tags: ["Kasir"],
        security: [["bearerAuth" => []]],
        responses: [
            new OA\Response(
                response: 200,
                description: "List of kasir retrieved successfully"
            )
        ]
    )]
    public function index()
    {
        $owner = Auth::user();
        if ($owner->role !== 'owner') {
            return $this->errorResponse('Unauthorized', 403);
        }

        $businessIds = $owner->businesses()->pluck('id');
        $kasir = User::where('role', 'kasir')->whereIn('business_id', $businessIds)->get();

        return $this->successResponse($kasir, 'Kasir retrieved successfully');
    }

    /**
     * Store a newly created resource in storage.
     */
    #[OA\Post(
        path: "/api/kasir",
        summary: "Create a new kasir",
        tags: ["Kasir"],
        security: [["bearerAuth" => []]],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ["name", "email", "password", "business_id"],
                properties: [
                    new OA\Property(property: "name", type: "string"),
                    new OA\Property(property: "email", type: "string", format: "email"),
                    new OA\Property(property: "password", type: "string", format: "password"),
                    new OA\Property(property: "business_id", type: "integer")
                ]
            )
        ),
        responses: [
            new OA\Response(response: 201, description: "Kasir created successfully"),
            new OA\Response(response: 400, description: "Validation error")
        ]
    )]
    public function store(Request $request)
    {
        $owner = Auth::user();
        if ($owner->role !== 'owner') {
            return $this->errorResponse('Unauthorized', 403);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:6',
            'business_id' => 'required|exists:businesses,id',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation Error', 400, $validator->errors());
        }

        // Check if the owner owns the business
        $ownsBusiness = $owner->businesses()->where('id', $request->business_id)->exists();
        if (!$ownsBusiness) {
            return $this->errorResponse('You do not have permission to add a kasir to this business', 403);
        }

        $kasir = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'kasir',
            'business_id' => $request->business_id,
        ]);

        return $this->successResponse($kasir, 'Kasir successfully created', 201);
    }

    /**
     * Display the specified resource.
     */
    #[OA\Get(
        path: "/api/kasir/{id}",
        summary: "Get a specific kasir details",
        tags: ["Kasir"],
        security: [["bearerAuth" => []]],
        parameters: [
            new OA\Parameter(name: "id", in: "path", required: true, schema: new OA\Schema(type: "integer"))
        ],
        responses: [
            new OA\Response(response: 200, description: "Kasir details retrieved"),
            new OA\Response(response: 404, description: "Kasir not found")
        ]
    )]
    public function show(string $id)
    {
        $owner = Auth::user();
        if ($owner->role !== 'owner') {
            return $this->errorResponse('Unauthorized', 403);
        }

        $kasir = User::where('role', 'kasir')->find($id);
        if (!$kasir) {
            return $this->errorResponse('Kasir not found', 404);
        }

        $ownsBusiness = $owner->businesses()->where('id', $kasir->business_id)->exists();
        if (!$ownsBusiness) {
            return $this->errorResponse('Unauthorized', 403);
        }

        return $this->successResponse($kasir, 'Kasir retrieved successfully');
    }

    /**
     * Update the specified resource in storage.
     */
    #[OA\Put(
        path: "/api/kasir/{id}",
        summary: "Update an existing kasir",
        tags: ["Kasir"],
        security: [["bearerAuth" => []]],
        parameters: [
            new OA\Parameter(name: "id", in: "path", required: true, schema: new OA\Schema(type: "integer"))
        ],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                properties: [
                    new OA\Property(property: "name", type: "string"),
                    new OA\Property(property: "email", type: "string", format: "email"),
                    new OA\Property(property: "password", type: "string", format: "password"),
                    new OA\Property(property: "business_id", type: "integer")
                ]
            )
        ),
        responses: [
            new OA\Response(response: 200, description: "Kasir updated successfully")
        ]
    )]
    public function update(Request $request, string $id)
    {
        $owner = Auth::user();
        if ($owner->role !== 'owner') {
            return $this->errorResponse('Unauthorized', 403);
        }

        $kasir = User::where('role', 'kasir')->find($id);
        if (!$kasir) {
            return $this->errorResponse('Kasir not found', 404);
        }

        $ownsBusiness = $owner->businesses()->where('id', $kasir->business_id)->exists();
        if (!$ownsBusiness) {
            return $this->errorResponse('Unauthorized', 403);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|between:2,100',
            'email' => 'sometimes|required|string|email|max:100|unique:users,email,' . $kasir->id,
            'password' => 'sometimes|nullable|string|min:6',
            'business_id' => 'sometimes|required|exists:businesses,id',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation Error', 400, $validator->errors());
        }

        if ($request->has('business_id')) {
            $ownsNewBusiness = $owner->businesses()->where('id', $request->business_id)->exists();
            if (!$ownsNewBusiness) {
                return $this->errorResponse('You do not have permission to assign to this business', 403);
            }
            $kasir->business_id = $request->business_id;
        }

        if ($request->has('name')) $kasir->name = $request->name;
        if ($request->has('email')) $kasir->email = $request->email;
        if ($request->filled('password')) $kasir->password = Hash::make($request->password);

        $kasir->save();

        return $this->successResponse($kasir, 'Kasir updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    #[OA\Delete(
        path: "/api/kasir/{id}",
        summary: "Delete a kasir",
        tags: ["Kasir"],
        security: [["bearerAuth" => []]],
        parameters: [
            new OA\Parameter(name: "id", in: "path", required: true, schema: new OA\Schema(type: "integer"))
        ],
        responses: [
            new OA\Response(response: 200, description: "Kasir deleted successfully")
        ]
    )]
    public function destroy(string $id)
    {
        $owner = Auth::user();
        if ($owner->role !== 'owner') {
            return $this->errorResponse('Unauthorized', 403);
        }

        $kasir = User::where('role', 'kasir')->find($id);
        if (!$kasir) {
            return $this->errorResponse('Kasir not found', 404);
        }

        $ownsBusiness = $owner->businesses()->where('id', $kasir->business_id)->exists();
        if (!$ownsBusiness) {
            return $this->errorResponse('Unauthorized', 403);
        }

        $kasir->delete();

        return $this->successResponse(null, 'Kasir deleted successfully');
    }
}
