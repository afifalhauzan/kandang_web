<?php

namespace App\Http\Controllers;

use App\Traits\ApiResponse;

use OpenApi\Attributes as OA;

#[OA\Info(title: "UMKM Website API", version: "1.0.0", description: "API Documentation for UMKM Website")]
#[OA\Server(url: L5_SWAGGER_CONST_HOST, description: "Demo API Server")]
#[OA\SecurityScheme(securityScheme: "bearerAuth", type: "http", scheme: "bearer", bearerFormat: "JWT")]
abstract class Controller
{
    use ApiResponse;
}
