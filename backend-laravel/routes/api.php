<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BeritaAcaraController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/berita-acara', [BeritaAcaraController::class, 'index']);
Route::post('/berita-acara', [BeritaAcaraController::class, 'store']);
