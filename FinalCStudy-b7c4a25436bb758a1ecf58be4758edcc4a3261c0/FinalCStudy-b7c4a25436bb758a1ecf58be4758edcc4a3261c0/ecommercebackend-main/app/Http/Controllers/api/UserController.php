<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    //
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Login successful.',
                'name' => $user->name,
                'token' => $token,
                'role' => $user->role,
            ], 200);
        }

        return response()->json([
            'message' => 'These credentials do not match our records.',
        ], 401);
    }

    public function signup(Request $request){
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string',
            'password' => 'required|string',
            'contact_number' => 'required|string'
        ]);

        $email = $request->email;
        $userExists = User::where('email', $email)->exists();
        if ($userExists) {
            return response()->json(['error' => 'Email already exists'], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $email,
            'password' => Hash::make($request->password),
            'contact_number' => $request->contact_number,
            'role' => 'user'
        ]);

        return response()->json(['message' => 'User created successfully'], 201);
    }
}
