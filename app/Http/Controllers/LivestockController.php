<?php

namespace App\Http\Controllers;

use App\Models\Barn;
use App\Models\Livestock;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class LivestockController extends Controller
{
    public function index(Request $request): Response
    {
        $userId = $request->user()->id;

        return Inertia::render('Livestock/Index', [
            'livestock' => Livestock::query()
                ->with('barn:id,name')
                ->whereHas('barn.farm', fn ($query) => $query->where('user_id', $userId))
                ->latest()
                ->get(),
            'barns' => Barn::query()
                ->whereHas('farm', fn ($query) => $query->where('user_id', $userId))
                ->orderBy('name')
                ->get(['id', 'name']),
        ]);
    }

    public function store(Request $request)
    {
        $userId = $request->user()->id;

        $validated = $request->validate([
            'barn_id' => [
                'required',
                'integer',
                Rule::exists('barns', 'id')->where(function ($query) use ($userId) {
                    $query->whereIn('farm_id', function ($farmQuery) use ($userId) {
                        $farmQuery->select('id')->from('farms')->where('user_id', $userId);
                    });
                }),
            ],
            'animal_type' => ['required', 'string', 'max:255'],
            'breed' => ['nullable', 'string', 'max:255'],
            'gender' => ['nullable', 'string', 'max:50'],
            'birth_date' => ['nullable', 'date'],
            'quantity' => ['required', 'integer', 'min:0'],
            'status' => ['required', 'string', 'max:50'],
            'notes' => ['nullable', 'string'],
        ]);

        Livestock::create($validated);

        return to_route('livestock.index');
    }

    public function update(Request $request, Livestock $livestock)
    {
        abort_unless($livestock->barn->farm->user_id === $request->user()->id, 403);

        $userId = $request->user()->id;

        $validated = $request->validate([
            'barn_id' => [
                'required',
                'integer',
                Rule::exists('barns', 'id')->where(function ($query) use ($userId) {
                    $query->whereIn('farm_id', function ($farmQuery) use ($userId) {
                        $farmQuery->select('id')->from('farms')->where('user_id', $userId);
                    });
                }),
            ],
            'animal_type' => ['required', 'string', 'max:255'],
            'breed' => ['nullable', 'string', 'max:255'],
            'gender' => ['nullable', 'string', 'max:50'],
            'birth_date' => ['nullable', 'date'],
            'quantity' => ['required', 'integer', 'min:0'],
            'status' => ['required', 'string', 'max:50'],
            'notes' => ['nullable', 'string'],
        ]);

        $livestock->update($validated);

        return to_route('livestock.index');
    }

    public function destroy(Request $request, Livestock $livestock)
    {
        abort_unless($livestock->barn->farm->user_id === $request->user()->id, 403);

        $livestock->delete();

        return to_route('livestock.index');
    }
}
