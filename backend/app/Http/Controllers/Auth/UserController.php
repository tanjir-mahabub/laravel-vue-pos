<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    // Register new user
    public function register(Request $request)
    {
        // Custom validation messages for each field
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ], [
            'name.required' => 'Name is required.',
            'name.string' => 'Name must be a string.',
            'name.max' => 'Name cannot be longer than 255 characters.',

            'email.required' => 'Email address is required.',
            'email.string' => 'Email must be a valid string.',
            'email.email' => 'Please provide a valid email address.',
            'email.max' => 'Email address cannot be longer than 255 characters.',
            'email.unique' => 'This email address is already registered.',

            'password.required' => 'Password is required.',
            'password.string' => 'Password must be a valid string.',
            'password.min' => 'Password must be at least 8 characters long.',
            'password.confirmed' => 'Password confirmation does not match.',
        ]);

        // If validation fails, return the errors
        if ($validator->fails()) {
            $errors = $validator->errors();

            $response = [
                'error' => 'Validation failed',
                'details' => $errors->toArray(),
            ];

            return response()->json($response, 422);
        }

        try {
            // Create a new user
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'customer', // Default role is customer
                'status' => 'active', // Default status is active
            ]);

            // Create authentication token
            $token = $user->createToken('YourAppName')->plainTextToken;

            return response()->json([
                'message' => 'User successfully registered',
                'token' => $token,
                'user' => $user,
            ], 201);
        } catch (\Illuminate\Database\QueryException $e) {
            // Log the error for debugging purposes
            Log::error("Database Error: " . $e->getMessage());

            return response()->json([
                'error' => 'Database error occurred during user registration.',
            ], 500);
        }
    }


    // Login user
    public function login(Request $request)
    {
        // Custom validation messages for each field
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8',
        ], [
            'email.required' => 'Email address is required.',
            'email.string' => 'Email must be a valid string.',
            'email.email' => 'Please provide a valid email address.',
            'email.max' => 'Email address cannot be longer than 255 characters.',

            'password.required' => 'Password is required.',
            'password.string' => 'Password must be a valid string.',
            'password.min' => 'Password must be at least 8 characters long.',
        ]);

        // If validation fails, return the errors
        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors(),
            ], 422);
        }

        try {
            // Check if the user exists
            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'error' => 'Unauthorized: Incorrect email or password.',
                ], 401);
            }

            // Check if user is active
            if ($user->status === 'inactive') {
                return response()->json([
                    'error' => 'Account is inactive.',
                ], 403);
            }

            // Create authentication token
            $token = $user->createToken('YourAppName')->plainTextToken;

            return response()->json([
                'message' => 'User successfully logged in',
                'token' => $token,
                'user' => $user,
            ], 200);
        } catch (\Exception $e) {
            // Log the error for debugging purposes
            Log::error("Login Error: " . $e->getMessage());

            return response()->json([
                'error' => 'Login failed due to an internal error.',
            ], 500);
        }
    }


    // Logout user
    public function logout(Request $request)
    {
        try {
            $request->user()->tokens->delete();
            return response()->json([
                'message' => 'User successfully logged out.',
            ], 200);
        } catch (\Exception $e) {
            // Log the error for debugging purposes
            Log::error("Logout Error: " . $e->getMessage());

            return response()->json([
                'error' => 'Logout failed due to an internal error.',
            ], 500);
        }
    }

}
