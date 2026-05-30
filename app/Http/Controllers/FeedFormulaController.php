<?php

namespace App\Http\Controllers;

use App\Models\FeedFormula;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FeedFormulaController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('FeedCalculator/Index', [
            'formulas' => FeedFormula::query()
                ->where('user_id', $request->user()->id)
                ->latest()
                ->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'target_protein' => ['nullable', 'numeric', 'min:0'],
            'total_cost' => ['nullable', 'numeric', 'min:0'],
            'result_json' => ['nullable', 'array'],
        ]);

        $request->user()->feedFormulas()->create($validated);

        return to_route('feed-formulas.index');
    }

    public function update(Request $request, FeedFormula $feedFormula)
    {
        abort_unless($feedFormula->user_id === $request->user()->id, 403);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'target_protein' => ['nullable', 'numeric', 'min:0'],
            'total_cost' => ['nullable', 'numeric', 'min:0'],
            'result_json' => ['nullable', 'array'],
        ]);

        $feedFormula->update($validated);

        return to_route('feed-formulas.index');
    }

    public function destroy(Request $request, FeedFormula $feedFormula)
    {
        abort_unless($feedFormula->user_id === $request->user()->id, 403);

        $feedFormula->delete();

        return to_route('feed-formulas.index');
    }
}
