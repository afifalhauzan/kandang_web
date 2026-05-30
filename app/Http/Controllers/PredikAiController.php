<?php

namespace App\Http\Controllers;

use App\Models\Business;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;
use OpenApi\Attributes as OA;

class PredikAiController extends Controller
{
    #[OA\Get(
        path: "/api/businesses/{business}/predik-ai/external-factors",
        summary: "Melihat Daftar Faktor Eksternal (Predik AI)",
        description: "Melihat prakiraan cuaca 14 hari ke depan, kalender libur nasional bulan ini, event lokal di sekitar bisnis, dan estimasi dampaknya ke penjualan dengan menggunakan Gemini AI.",
        tags: ["Predik AI"],
        security: [["bearerAuth" => []]],
        parameters: [
            new OA\Parameter(name: "business", in: "path", required: true, description: "ID Bisnis", schema: new OA\Schema(type: "integer"))
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "Berhasil mendapatkan prediksi faktor eksternal",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "status", type: "string", example: "success"),
                        new OA\Property(property: "message", type: "string", example: "Prediksi faktor eksternal berhasil didapatkan"),
                        new OA\Property(property: "data", type: "array", items: new OA\Items(
                            properties: [
                                new OA\Property(property: "date", type: "string", example: "2023-11-01"),
                                new OA\Property(property: "weather", type: "string", example: "Cerah"),
                                new OA\Property(property: "is_national_holiday", type: "boolean", example: false),
                                new OA\Property(property: "holiday_name", type: "string", nullable: true),
                                new OA\Property(property: "has_local_event", type: "boolean", example: false),
                                new OA\Property(property: "local_event_name", type: "string", nullable: true),
                                new OA\Property(property: "impact_on_sales", type: "string", example: "Cuaca cerah berpotensi meningkatkan kunjungan."),
                                new OA\Property(property: "impact_score", type: "integer", example: 10)
                            ]
                        ))
                    ]
                )
            ),
            new OA\Response(response: 403, description: "Unauthorized / Bukan pemilik bisnis"),
            new OA\Response(response: 404, description: "Business not found"),
            new OA\Response(response: 500, description: "Failed to connect to Gemini API")
        ]
    )]
    public function externalFactors(Request $request, string $businessId)
    {
        $user = Auth::user();
        
        $business = Business::find($businessId);
        if (!$business) {
            return $this->errorResponse('Business not found', 404);
        }

        // Check if the user owns this business or is assigned to it as kasir
        if ($user->role === 'owner') {
            $ownsBusiness = $user->businesses()->where('id', $business->id)->exists();
            if (!$ownsBusiness) {
                return $this->errorResponse('Unauthorized', 403);
            }
        } else if ($user->role === 'kasir') {
            if ($user->business_id !== $business->id) {
                return $this->errorResponse('Unauthorized', 403);
            }
        }

        $apiKey = env('GEMINI_API_KEY');
        $model = env('GEMINI_MODEL', 'gemini-1.5-pro'); // Default to pro if not set

        if (!$apiKey) {
            return $this->errorResponse('Gemini API key is not configured', 500);
        }

        $city = $business->city ?? 'Jakarta';
        $today = now()->format('Y-m-d');
        $end_date = now()->addDays(13)->format('Y-m-d');

        $prompt = "Anda adalah asisten AI bisnis bernama 'Predik AI'. "
            . "Tolong buatkan prediksi faktor eksternal harian selama 14 hari ke depan (mulai $today sampai $end_date) "
            . "untuk lokasi bisnis UMKM di kota $city. "
            . "Sertakan juga hari libur nasional di bulan ini, event lokal yang relevan, "
            . "dan estimasi dampaknya terhadap penjualan F&B/Retail UMKM. "
            . "Format respons HANYA berupa JSON Array valid dengan setiap objek memiliki atribut persis seperti ini: "
            . "date (YYYY-MM-DD), weather (string: Cerah/Berawan/Hujan/Hujan Lebat/dsb), "
            . "is_national_holiday (boolean), holiday_name (string atau null), "
            . "has_local_event (boolean), local_event_name (string atau null), "
            . "impact_on_sales (string deskripsi singkat misal 'Orang malas keluar karena hujan lebat'), "
            . "impact_score (integer antara -100 sampai 100, positif berarti berdampak baik). "
            . "Tanpa markdown, tanpa penjelasan tambahan, hanya array JSON mentah.";

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post("https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent?key={$apiKey}", [
            'contents' => [
                [
                    'parts' => [
                        ['text' => $prompt]
                    ]
                ]
            ],
            'generationConfig' => [
                'temperature' => 0.4,
                'response_mime_type' => 'application/json'
            ]
        ]);

        if ($response->successful()) {
            $data = $response->json();
            if (isset($data['candidates'][0]['content']['parts'][0]['text'])) {
                $jsonText = $data['candidates'][0]['content']['parts'][0]['text'];
                $decoded = json_decode($jsonText, true);

                if ($decoded !== null) {
                    return $this->successResponse($decoded, 'Prediksi faktor eksternal berhasil didapatkan');
                }
            }
            return $this->errorResponse('Failed to parse response from Gemini AI', 500);
        }

        return $this->errorResponse('Failed to fetch data from Gemini AI', $response->status(), $response->json());
    }
}
