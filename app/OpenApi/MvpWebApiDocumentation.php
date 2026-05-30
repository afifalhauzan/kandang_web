<?php

namespace App\OpenApi;

use OpenApi\Attributes as OA;

#[OA\Info(
    version: '1.0.0',
    title: 'Ternak MVP API Documentation',
    description: 'Swagger documentation for Ternak MVP web routes and health endpoint.'
)]
#[OA\Server(
    url: 'http://localhost:8000',
    description: 'Local development server'
)]
#[OA\SecurityScheme(
    securityScheme: 'sessionAuth',
    type: 'apiKey',
    in: 'cookie',
    name: 'laravel_session',
    description: 'Laravel session cookie auth'
)]
#[OA\Tag(name: 'Public')]
#[OA\Tag(name: 'Auth')]
#[OA\Tag(name: 'Dashboard')]
#[OA\Tag(name: 'Farms')]
#[OA\Tag(name: 'Barns')]
#[OA\Tag(name: 'Livestock')]
#[OA\Tag(name: 'Health Records')]
#[OA\Tag(name: 'Vaccinations')]
#[OA\Tag(name: 'Disease Detections')]
#[OA\Tag(name: 'Feed Formulas')]
#[OA\Tag(name: 'Additional')]
class MvpWebApiDocumentation
{
    #[OA\Get(path: '/api/health', tags: ['Public'], summary: 'Health check', responses: [new OA\Response(response: 200, description: 'Service is healthy')])]
    public function health(): void {}

    #[OA\Get(path: '/', tags: ['Public'], summary: 'Landing page', responses: [new OA\Response(response: 200, description: 'Landing page')])]
    public function landing(): void {}

    #[OA\Get(path: '/login', tags: ['Auth'], summary: 'Login page', responses: [new OA\Response(response: 200, description: 'Login view')])]
    public function loginPage(): void {}

    #[OA\Post(path: '/login', tags: ['Auth'], summary: 'Submit login', requestBody: new OA\RequestBody(required: true, description: 'Login credentials'), responses: [new OA\Response(response: 302, description: 'Redirect after login'), new OA\Response(response: 422, description: 'Validation failed')])]
    public function loginSubmit(): void {}

    #[OA\Get(path: '/register', tags: ['Auth'], summary: 'Register page', responses: [new OA\Response(response: 200, description: 'Register view')])]
    public function registerPage(): void {}

    #[OA\Post(path: '/register', tags: ['Auth'], summary: 'Submit register', requestBody: new OA\RequestBody(required: true, description: 'Register payload'), responses: [new OA\Response(response: 302, description: 'Redirect after register'), new OA\Response(response: 422, description: 'Validation failed')])]
    public function registerSubmit(): void {}

    #[OA\Post(path: '/logout', tags: ['Auth'], summary: 'Logout', security: [['sessionAuth' => []]], responses: [new OA\Response(response: 302, description: 'Redirect to login')])]
    public function logout(): void {}

    #[OA\Get(path: '/dashboard', tags: ['Dashboard'], summary: 'Dashboard page', security: [['sessionAuth' => []]], responses: [new OA\Response(response: 200, description: 'Dashboard view')])]
    public function dashboard(): void {}

    #[OA\Get(path: '/farms', tags: ['Farms'], summary: 'List farms', security: [['sessionAuth' => []]], responses: [new OA\Response(response: 200, description: 'Farms page')])]
    #[OA\Post(path: '/farms', tags: ['Farms'], summary: 'Create farm', security: [['sessionAuth' => []]], requestBody: new OA\RequestBody(required: true), responses: [new OA\Response(response: 302, description: 'Redirect after create'), new OA\Response(response: 422, description: 'Validation failed')])]
    public function farms(): void {}

    #[OA\Put(path: '/farms/{farm}', tags: ['Farms'], summary: 'Update farm', security: [['sessionAuth' => []]], parameters: [new OA\Parameter(name: 'farm', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))], requestBody: new OA\RequestBody(required: true), responses: [new OA\Response(response: 302, description: 'Redirect after update')])]
    #[OA\Delete(path: '/farms/{farm}', tags: ['Farms'], summary: 'Delete farm', security: [['sessionAuth' => []]], parameters: [new OA\Parameter(name: 'farm', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))], responses: [new OA\Response(response: 302, description: 'Redirect after delete')])]
    public function farmById(): void {}

    #[OA\Get(path: '/barns', tags: ['Barns'], summary: 'List barns', security: [['sessionAuth' => []]], responses: [new OA\Response(response: 200, description: 'Barns page')])]
    #[OA\Post(path: '/barns', tags: ['Barns'], summary: 'Create barn', security: [['sessionAuth' => []]], requestBody: new OA\RequestBody(required: true), responses: [new OA\Response(response: 302, description: 'Redirect after create')])]
    public function barns(): void {}

    #[OA\Put(path: '/barns/{barn}', tags: ['Barns'], summary: 'Update barn', security: [['sessionAuth' => []]], parameters: [new OA\Parameter(name: 'barn', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))], requestBody: new OA\RequestBody(required: true), responses: [new OA\Response(response: 302, description: 'Redirect after update')])]
    #[OA\Delete(path: '/barns/{barn}', tags: ['Barns'], summary: 'Delete barn', security: [['sessionAuth' => []]], parameters: [new OA\Parameter(name: 'barn', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))], responses: [new OA\Response(response: 302, description: 'Redirect after delete')])]
    public function barnById(): void {}

    #[OA\Get(path: '/livestock', tags: ['Livestock'], summary: 'List livestock', security: [['sessionAuth' => []]], responses: [new OA\Response(response: 200, description: 'Livestock page')])]
    #[OA\Post(path: '/livestock', tags: ['Livestock'], summary: 'Create livestock', security: [['sessionAuth' => []]], requestBody: new OA\RequestBody(required: true), responses: [new OA\Response(response: 302, description: 'Redirect after create')])]
    public function livestock(): void {}

    #[OA\Put(path: '/livestock/{livestock}', tags: ['Livestock'], summary: 'Update livestock', security: [['sessionAuth' => []]], parameters: [new OA\Parameter(name: 'livestock', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))], requestBody: new OA\RequestBody(required: true), responses: [new OA\Response(response: 302, description: 'Redirect after update')])]
    #[OA\Delete(path: '/livestock/{livestock}', tags: ['Livestock'], summary: 'Delete livestock', security: [['sessionAuth' => []]], parameters: [new OA\Parameter(name: 'livestock', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))], responses: [new OA\Response(response: 302, description: 'Redirect after delete')])]
    public function livestockById(): void {}

    #[OA\Get(path: '/health-records', tags: ['Health Records'], summary: 'List health records', security: [['sessionAuth' => []]], responses: [new OA\Response(response: 200, description: 'Health records page')])]
    #[OA\Post(path: '/health-records', tags: ['Health Records'], summary: 'Create health record', security: [['sessionAuth' => []]], requestBody: new OA\RequestBody(required: true), responses: [new OA\Response(response: 302, description: 'Redirect after create')])]
    public function healthRecords(): void {}

    #[OA\Put(path: '/health-records/{healthRecord}', tags: ['Health Records'], summary: 'Update health record', security: [['sessionAuth' => []]], parameters: [new OA\Parameter(name: 'healthRecord', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))], requestBody: new OA\RequestBody(required: true), responses: [new OA\Response(response: 302, description: 'Redirect after update')])]
    #[OA\Delete(path: '/health-records/{healthRecord}', tags: ['Health Records'], summary: 'Delete health record', security: [['sessionAuth' => []]], parameters: [new OA\Parameter(name: 'healthRecord', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))], responses: [new OA\Response(response: 302, description: 'Redirect after delete')])]
    public function healthRecordById(): void {}

    #[OA\Get(path: '/vaccinations', tags: ['Vaccinations'], summary: 'List vaccination schedules', security: [['sessionAuth' => []]], responses: [new OA\Response(response: 200, description: 'Vaccination page')])]
    #[OA\Post(path: '/vaccinations', tags: ['Vaccinations'], summary: 'Create vaccination schedule', security: [['sessionAuth' => []]], requestBody: new OA\RequestBody(required: true), responses: [new OA\Response(response: 302, description: 'Redirect after create')])]
    public function vaccinations(): void {}

    #[OA\Put(path: '/vaccinations/{vaccination}', tags: ['Vaccinations'], summary: 'Update vaccination schedule', security: [['sessionAuth' => []]], parameters: [new OA\Parameter(name: 'vaccination', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))], requestBody: new OA\RequestBody(required: true), responses: [new OA\Response(response: 302, description: 'Redirect after update')])]
    #[OA\Delete(path: '/vaccinations/{vaccination}', tags: ['Vaccinations'], summary: 'Delete vaccination schedule', security: [['sessionAuth' => []]], parameters: [new OA\Parameter(name: 'vaccination', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))], responses: [new OA\Response(response: 302, description: 'Redirect after delete')])]
    public function vaccinationById(): void {}

    #[OA\Get(path: '/feed-formulas', tags: ['Feed Formulas'], summary: 'List feed formulas', security: [['sessionAuth' => []]], responses: [new OA\Response(response: 200, description: 'Feed formula page')])]
    #[OA\Post(path: '/feed-formulas', tags: ['Feed Formulas'], summary: 'Create feed formula', security: [['sessionAuth' => []]], requestBody: new OA\RequestBody(required: true), responses: [new OA\Response(response: 302, description: 'Redirect after create')])]
    public function feedFormulas(): void {}

    #[OA\Put(path: '/feed-formulas/{feedFormula}', tags: ['Feed Formulas'], summary: 'Update feed formula', security: [['sessionAuth' => []]], parameters: [new OA\Parameter(name: 'feedFormula', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))], requestBody: new OA\RequestBody(required: true), responses: [new OA\Response(response: 302, description: 'Redirect after update')])]
    #[OA\Delete(path: '/feed-formulas/{feedFormula}', tags: ['Feed Formulas'], summary: 'Delete feed formula', security: [['sessionAuth' => []]], parameters: [new OA\Parameter(name: 'feedFormula', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))], responses: [new OA\Response(response: 302, description: 'Redirect after delete')])]
    public function feedFormulaById(): void {}

    #[OA\Get(path: '/disease-detections', tags: ['Disease Detections'], summary: 'List disease detections', security: [['sessionAuth' => []]], responses: [new OA\Response(response: 200, description: 'Disease detection page')])]
    #[OA\Post(path: '/disease-detections', tags: ['Disease Detections'], summary: 'Create disease detection', security: [['sessionAuth' => []]], requestBody: new OA\RequestBody(required: true), responses: [new OA\Response(response: 302, description: 'Redirect after create')])]
    public function diseaseDetections(): void {}

    #[OA\Put(path: '/disease-detections/{diseaseDetection}', tags: ['Disease Detections'], summary: 'Update disease detection', security: [['sessionAuth' => []]], parameters: [new OA\Parameter(name: 'diseaseDetection', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))], requestBody: new OA\RequestBody(required: true), responses: [new OA\Response(response: 302, description: 'Redirect after update')])]
    #[OA\Delete(path: '/disease-detections/{diseaseDetection}', tags: ['Disease Detections'], summary: 'Delete disease detection', security: [['sessionAuth' => []]], parameters: [new OA\Parameter(name: 'diseaseDetection', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))], responses: [new OA\Response(response: 302, description: 'Redirect after delete')])]
    public function diseaseDetectionById(): void {}

    #[OA\Get(path: '/price-radar', tags: ['Additional'], summary: 'Price radar page', security: [['sessionAuth' => []]], responses: [new OA\Response(response: 200, description: 'Price radar view')])]
    public function priceRadar(): void {}

    #[OA\Get(path: '/weather', tags: ['Additional'], summary: 'Weather page', security: [['sessionAuth' => []]], responses: [new OA\Response(response: 200, description: 'Weather view')])]
    public function weather(): void {}

    #[OA\Get(path: '/assistant', tags: ['Additional'], summary: 'Assistant page', security: [['sessionAuth' => []]], responses: [new OA\Response(response: 200, description: 'Assistant view')])]
    public function assistant(): void {}
}
