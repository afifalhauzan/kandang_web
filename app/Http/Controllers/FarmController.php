<?php

namespace App\Http\Controllers;

use App\Models\Farm;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FarmController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Farms/Index', [
            'farms' => Farm::query()
                ->where('user_id', $request->user()->id)
                ->latest()
                ->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
        ]);

        $request->user()->farms()->create($validated);

        return to_route('farms.index');
    }

    public function update(Request $request, Farm $farm)
    {
        abort_unless($farm->user_id === $request->user()->id, 403);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
        ]);

        $farm->update($validated);

        return to_route('farms.index');
    }

    public function destroy(Request $request, Farm $farm)
    {
        abort_unless($farm->user_id === $request->user()->id, 403);

        $farm->delete();

        return to_route('farms.index');
    }
}
