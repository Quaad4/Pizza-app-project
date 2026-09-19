<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\PizzaController;
use Illuminate\Support\Facades\Route;

Route::controller(PizzaController::class)->prefix('pizzas')->group(function () {
    Route::get('', 'index');
    Route::post('', 'store');
    Route::put('/{pizza}', 'update');
    Route::delete('/{pizza}', 'destroy');
});


Route::controller(OrderController::class)->prefix('orders')->group(function () {
    Route::get('', 'index');
    Route::post('', 'store');
});
