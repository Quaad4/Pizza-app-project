<?php

namespace App\Http\Controllers;

use App\Http\Requests\PizzaRequest;
use App\Http\Resources\PizzaResource;
use App\Models\Pizza;

class PizzaController extends Controller
{
    public function index()
    {
        return PizzaResource::collection(Pizza::all());
    }

    public function store(PizzaRequest $request)
    {
        $pizza = Pizza::create($request->validated());
        return response()->json(new PizzaResource($pizza), 201); //Why do we use json()?
    }

    public function update(PizzaRequest $request, Pizza $pizza)
    {
        $pizza->updateOrFail($request->validated());
        return response()->json(new PizzaResource($pizza), 200);
    }

    public function destroy(Pizza $pizza)
    {
        $pizza->delete();
        return response()->noContent();
    }
}
