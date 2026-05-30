<?php

namespace App\Http\Controllers;

use App\Models\HealthRecord;
use App\Models\Livestock;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class HealthRecordController extends Controller
{
    public function index(Request $request): Response
    {
        $userId = $request->user()->id;

        return Inertia::render('Health/Index', [
            'records' => HealthRecord::query()
                ->with('livestock:id,animal_type')
                ->whereHas('livestock.barn.farm', fn ($query) => $query->where('user_id', $userId))
                ->latest('record_date')
                ->get(),
            'livestockOptions' => Livestock::query()
                ->whereHas('barn.farm', fn ($query) => $query->where('user_id', $userId))
                ->orderBy('animal_type')
                ->get(['id', 'animal_type']),
        ]);
    }

    public function store(Request $request)
    {
        $userId = $request->user()->id;

        $validated = $request->validate([
            'livestock_id' => [
                'required',
                'integer',
                Rule::exists('livestocks', 'id')->where(function ($query) use ($userId) {
                    $query->whereIn('barn_id', function ($barnQuery) use ($userId) {
                        $barnQuery->select('id')
                            ->from('barns')
                            ->whereIn('farm_id', function ($farmQuery) use ($userId) {
                                $farmQuery->select('id')->from('farms')->where('user_id', $userId);
                            });
                    });
                }),
            ],
            'record_date' => ['required', 'date'],
            'condition' => ['required', 'string', 'max:255'],
            'treatment' => ['nullable', 'string', 'max:255'],
            'notes' => ['nullable', 'string'],
        ]);

        HealthRecord::create($validated);

        return to_route('health-records.index');
    }

    public function update(Request $request, HealthRecord $healthRecord)
    {
        abort_unless($healthRecord->livestock->barn->farm->user_id === $request->user()->id, 403);

        $userId = $request->user()->id;

        $validated = $request->validate([
            'livestock_id' => [
                'required',
                'integer',
                Rule::exists('livestocks', 'id')->where(function ($query) use ($userId) {
                    $query->whereIn('barn_id', function ($barnQuery) use ($userId) {
                        $barnQuery->select('id')
                            ->from('barns')
                            ->whereIn('farm_id', function ($farmQuery) use ($userId) {
                                $farmQuery->select('id')->from('farms')->where('user_id', $userId);
                            });
                    });
                }),
            ],
            'record_date' => ['required', 'date'],
            'condition' => ['required', 'string', 'max:255'],
            'treatment' => ['nullable', 'string', 'max:255'],
            'notes' => ['nullable', 'string'],
        ]);

        $healthRecord->update($validated);

        return to_route('health-records.index');
    }

    public function destroy(Request $request, HealthRecord $healthRecord)
    {
        abort_unless($healthRecord->livestock->barn->farm->user_id === $request->user()->id, 403);

        $healthRecord->delete();

        return to_route('health-records.index');
    }
}
