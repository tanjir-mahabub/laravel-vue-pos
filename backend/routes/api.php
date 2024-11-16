<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Passport\Http\Controllers\AccessTokenController;
use Laravel\Passport\Http\Controllers\ApproveAuthorizationController;
use Laravel\Passport\Http\Controllers\AuthorizationController;
use Laravel\Passport\Http\Controllers\DenyAuthorizationController;
use Laravel\Passport\Http\Controllers\TransientTokenController;

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

// Issue access tokens
Route::post('oauth/token', [AccessTokenController::class, 'issueToken']);


// Authorize requests
Route::get('/oauth/authorize', [AuthorizationController::class, 'authorize']);
Route::post('/oauth/approve', [ApproveAuthorizationController::class, 'approve']);
Route::delete('/oauth/authorize', [DenyAuthorizationController::class, 'deny']);

// Transient token route
Route::post('/oauth/token/refresh', [TransientTokenController::class, 'refresh']);

// User authentication routes
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:api');

// Protected route
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
