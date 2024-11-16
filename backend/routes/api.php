<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SalesReportController;
use App\Http\Controllers\OrderController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
});


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/products', [ProductController::class, 'store']);
    Route::get('/products', [ProductController::class, 'index']);
});


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/cart/add', [CartController::class, 'addItem']);
    Route::get('/cart', [CartController::class, 'viewCart']);
    Route::delete('/cart/item/{id}', [CartController::class, 'removeItem']);
    Route::post('/cart/checkout', [CartController::class, 'checkout']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/sales/date-wise', [SalesReportController::class, 'dateWiseReport']);
    Route::post('/sales/product-wise', [SalesReportController::class, 'productWiseReport']);
    Route::get('/sales/stock', [SalesReportController::class, 'stockReport']);
});

Route::middleware('auth:sanctum')->post('/orders', [OrderController::class, 'store']);
