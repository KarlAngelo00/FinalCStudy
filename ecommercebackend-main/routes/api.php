<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [\App\Http\Controllers\api\UserController::class, 'login']);
Route::post('/signup', [\App\Http\Controllers\api\UserController::class, 'signup']);
Route::delete('/carts/{id?}', [\App\Http\Controllers\api\CartController::class, 'destroy']);

Route::apiResource('products', \App\Http\Controllers\api\ProductController::class);
Route::apiResource('carts', \App\Http\Controllers\api\CartController::class);
