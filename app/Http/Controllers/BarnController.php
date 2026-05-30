<?php

namespace App\Http\Controllers;

use App\Models\Barn;
use App\Models\Farm;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class BarnController extends Controller
{
    public function index(Request $request): Response
    {
        $userId = $request->user()->id;

        return Inertia::render('Barns/Index', [
            'barns' => Barn::query()
                ->with('farm:id,name')
                ->whereHas('farm', fn ($query) => $query->where('user_id', $userId))
                ->latest()
                ->get(),
            'farms' => Farm::query()
                ->where('user_id', $userId)
                ->orderBy('name')
                ->get(['id', 'name']),
        ]);
    }

    public function store(Request $request)
    {
        $userId = $request->user()->id;

        $validated = $request->validate([
            'farm_id' => [
                'required',
                'integer',
                Rule::exists('farms', 'id')->where(fn ($query) => $query->where('user_id', $userId)),
            ],
            'name' => ['required', 'string', 'max:255'],
            'type' => ['nullable', 'string', 'max:255'],
            'capacity' => ['nullable', 'integer', 'min:0'],
            'notes' => ['nullable', 'string'],
        ]);

        Barn::create($validated);

        return to_route('barns.index');
    }

    public function update(Request $request, Barn $barn)
    {
        abort_unless($barn->farm->user_id === $request->user()->id, 403);

        $userId = $request->user()->id;

        $validated = $request->validate([
            'farm_id' => [
                'required',
                'integer',
                Rule::exists('farms', 'id')->where(fn ($query) => $query->where('user_id', $userId)),
            ],
            'name' => ['required', 'string', 'max:255'],
            'type' => ['nullable', 'string', 'max:255'],
            'capacity' => ['nullable', 'integer', 'min:0'],
            'notes' => ['nullable', 'string'],
        ]);

        $barn->update($validated);

        return to_route('barns.index');
    }

    public function destroy(Request $request, Barn $barn)
    {
        abort_unless($barn->farm->user_id === $request->user()->id, 403);

        $barn->delete();

        return to_route('barns.index');
    }
}
