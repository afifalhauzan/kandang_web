<?php

namespace App\Http\Controllers;

use App\Models\DiseaseDetection;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DiseaseDetectionController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('DiseaseDetection/Index', [
            'detections' => DiseaseDetection::query()
                ->where('user_id', $request->user()->id)
                ->latest()
                ->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'image_path' => ['required', 'string', 'max:255'],
            'prediction' => ['nullable', 'string', 'max:255'],
            'confidence' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'recommendation' => ['nullable', 'string'],
        ]);

        $request->user()->diseaseDetections()->create($validated);

        return to_route('disease-detections.index');
    }

    public function update(Request $request, DiseaseDetection $diseaseDetection)
    {
        abort_unless($diseaseDetection->user_id === $request->user()->id, 403);

        $validated = $request->validate([
            'image_path' => ['required', 'string', 'max:255'],
            'prediction' => ['nullable', 'string', 'max:255'],
            'confidence' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'recommendation' => ['nullable', 'string'],
        ]);

        $diseaseDetection->update($validated);

        return to_route('disease-detections.index');
    }

    public function destroy(Request $request, DiseaseDetection $diseaseDetection)
    {
        abort_unless($diseaseDetection->user_id === $request->user()->id, 403);

        $diseaseDetection->delete();

        return to_route('disease-detections.index');
    }
}
