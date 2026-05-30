<?php

namespace Database\Seeders;

use App\Models\Barn;
use App\Models\ChatMessage;
use App\Models\ChatSession;
use App\Models\DiseaseDetection;
use App\Models\Farm;
use App\Models\FeedFormula;
use App\Models\FeedIngredient;
use App\Models\HealthRecord;
use App\Models\Livestock;
use App\Models\PriceRecord;
use App\Models\User;
use App\Models\VaccinationSchedule;
use App\Models\WeatherLog;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::query()->create([
            'name' => 'Ternak Owner',
            'email' => 'owner@ternak.local',
            'password' => Hash::make('password'),
        ]);

        $farm = Farm::query()->create([
            'user_id' => $user->id,
            'name' => 'Farm Demo',
            'location' => 'Malang',
            'description' => 'Data awal untuk MVP scaffolding.',
        ]);

        $barn = Barn::query()->create([
            'farm_id' => $farm->id,
            'name' => 'Kandang A',
            'type' => 'Sapi',
            'capacity' => 50,
            'notes' => 'Kandang utama.',
        ]);

        $livestock = Livestock::query()->create([
            'barn_id' => $barn->id,
            'animal_type' => 'Sapi',
            'breed' => 'Limousin',
            'gender' => 'Jantan',
            'birth_date' => now()->subMonths(16)->toDateString(),
            'quantity' => 12,
            'status' => 'Active',
            'notes' => 'Batch awal.',
        ]);

        HealthRecord::query()->create([
            'livestock_id' => $livestock->id,
            'record_date' => now()->toDateString(),
            'condition' => 'Sehat',
            'treatment' => 'Vitamin rutin',
            'notes' => 'Kontrol mingguan.',
        ]);

        VaccinationSchedule::query()->create([
            'livestock_id' => $livestock->id,
            'title' => 'Vaksin PMK',
            'scheduled_date' => now()->addDays(7)->toDateString(),
            'status' => 'Pending',
            'notes' => 'Sesuai jadwal dinas peternakan.',
        ]);

        DiseaseDetection::query()->create([
            'user_id' => $user->id,
            'image_path' => 'uploads/sample-cow-1.jpg',
            'prediction' => 'Healthy',
            'confidence' => 91.25,
            'recommendation' => 'Lanjutkan monitoring rutin.',
        ]);

        FeedIngredient::query()->insert([
            [
                'name' => 'Jagung',
                'protein' => 8.5,
                'energy' => 3300,
                'price_per_kg' => 6500,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Dedak',
                'protein' => 12.0,
                'energy' => 2800,
                'price_per_kg' => 4800,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Bungkil Kedelai',
                'protein' => 44.0,
                'energy' => 3100,
                'price_per_kg' => 9800,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        FeedFormula::query()->create([
            'user_id' => $user->id,
            'name' => 'Formula Sapi Grower',
            'target_protein' => 16.0,
            'total_cost' => 7250,
            'result_json' => [
                ['ingredient' => 'Jagung', 'percentage' => 45],
                ['ingredient' => 'Dedak', 'percentage' => 30],
                ['ingredient' => 'Bungkil Kedelai', 'percentage' => 25],
            ],
        ]);

        PriceRecord::query()->insert([
            [
                'commodity_name' => 'Sapi Potong',
                'category' => 'Livestock',
                'price' => 62000000,
                'record_date' => now()->toDateString(),
                'source' => 'Pasar Hewan Lokal',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'commodity_name' => 'Pakan Konsentrat',
                'category' => 'Feed',
                'price' => 7800,
                'record_date' => now()->toDateString(),
                'source' => 'Distributor Pakan',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        WeatherLog::query()->create([
            'location' => 'Malang',
            'temperature' => 26.8,
            'humidity' => 74.2,
            'condition' => 'Cloudy',
            'recorded_at' => now(),
        ]);

        $session = ChatSession::query()->create([
            'user_id' => $user->id,
            'title' => 'Konsultasi Harian',
        ]);

        ChatMessage::query()->insert([
            [
                'chat_session_id' => $session->id,
                'role' => 'user',
                'content' => 'Apa yang harus dicek dulu pagi ini?',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'chat_session_id' => $session->id,
                'role' => 'assistant',
                'content' => 'Cek suhu kandang, konsumsi pakan, dan aktivitas ternak.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
