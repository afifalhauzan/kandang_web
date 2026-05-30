<?php

use App\Http\Controllers\BarnController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DiseaseDetectionController;
use App\Http\Controllers\FarmController;
use App\Http\Controllers\FeedFormulaController;
use App\Http\Controllers\HealthRecordController;
use App\Http\Controllers\LivestockController;
use App\Http\Controllers\VaccinationScheduleController;
use App\Models\ChatSession;
use App\Models\DiseaseDetection;
use App\Models\PriceRecord;
use App\Models\VaccinationSchedule;
use App\Models\WeatherLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('LandingPage');
})->name('landing');

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('login.store');

    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register'])->name('register.store');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function (Request $request) {
        $userId = $request->user()->id;

        return Inertia::render('Dashboard', [
            'stats' => [
                'barn_count' => \App\Models\Barn::query()
                    ->whereHas('farm', fn ($query) => $query->where('user_id', $userId))
                    ->count(),
                'livestock_count' => \App\Models\Livestock::query()
                    ->whereHas('barn.farm', fn ($query) => $query->where('user_id', $userId))
                    ->sum('quantity'),
            ],
            'upcomingVaccinations' => VaccinationSchedule::query()
                ->with('livestock:id,animal_type')
                ->whereDate('scheduled_date', '>=', now()->toDateString())
                ->whereHas('livestock.barn.farm', fn ($query) => $query->where('user_id', $userId))
                ->orderBy('scheduled_date')
                ->limit(5)
                ->get(),
            'latestDetections' => DiseaseDetection::query()
                ->where('user_id', $userId)
                ->latest()
                ->limit(5)
                ->get(),
        ]);
    })->name('dashboard');

    Route::resource('farms', FarmController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::resource('barns', BarnController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::resource('livestock', LivestockController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::resource('health-records', HealthRecordController::class)
        ->parameters(['health-records' => 'healthRecord'])
        ->only(['index', 'store', 'update', 'destroy']);
    Route::resource('vaccinations', VaccinationScheduleController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::resource('feed-formulas', FeedFormulaController::class)
        ->parameters(['feed-formulas' => 'feedFormula'])
        ->only(['index', 'store', 'update', 'destroy']);
    Route::resource('disease-detections', DiseaseDetectionController::class)
        ->parameters(['disease-detections' => 'diseaseDetection'])
        ->only(['index', 'store', 'update', 'destroy']);

    Route::get('/price-radar', function () {
        return Inertia::render('PriceRadar/Index', [
            'prices' => PriceRecord::query()
                ->latest('record_date')
                ->limit(30)
                ->get(),
        ]);
    })->name('price-radar.index');

    Route::get('/weather', function () {
        return Inertia::render('Weather/Index', [
            'weatherLogs' => WeatherLog::query()
                ->latest('recorded_at')
                ->limit(20)
                ->get(),
        ]);
    })->name('weather.index');

    Route::get('/assistant', function (Request $request) {
        return Inertia::render('Assistant/Index', [
            'sessions' => ChatSession::query()
                ->with('messages')
                ->where('user_id', $request->user()->id)
                ->latest()
                ->limit(10)
                ->get(),
        ]);
    })->name('assistant.index');

    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});
