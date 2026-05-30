<?php

namespace App\Http\Controllers;

use App\Models\Livestock;
use App\Models\VaccinationSchedule;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class VaccinationScheduleController extends Controller
{
    public function index(Request $request): Response
    {
        $userId = $request->user()->id;

        return Inertia::render('Vaccinations/Index', [
            'schedules' => VaccinationSchedule::query()
                ->with('livestock:id,animal_type')
                ->whereHas('livestock.barn.farm', fn ($query) => $query->where('user_id', $userId))
                ->orderBy('scheduled_date')
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
            'title' => ['required', 'string', 'max:255'],
            'scheduled_date' => ['required', 'date'],
            'status' => ['required', 'string', 'max:50'],
            'notes' => ['nullable', 'string'],
        ]);

        VaccinationSchedule::create($validated);

        return to_route('vaccinations.index');
    }

    public function update(Request $request, VaccinationSchedule $vaccination)
    {
        abort_unless($vaccination->livestock->barn->farm->user_id === $request->user()->id, 403);

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
            'title' => ['required', 'string', 'max:255'],
            'scheduled_date' => ['required', 'date'],
            'status' => ['required', 'string', 'max:50'],
            'notes' => ['nullable', 'string'],
        ]);

        $vaccination->update($validated);

        return to_route('vaccinations.index');
    }

    public function destroy(Request $request, VaccinationSchedule $vaccination)
    {
        abort_unless($vaccination->livestock->barn->farm->user_id === $request->user()->id, 403);

        $vaccination->delete();

        return to_route('vaccinations.index');
    }
}
