<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class RegisterController extends Controller
{
  
     /**
     * Display the registration view.
     */
    public function create()
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) :RedirectResponse
    {
      
        $validated = $request->validate([
            'name' => 'required|max:255|string',
            'email' => 'required|email:dns|unique:users',
            'password' => 'required|min:3',
        ]);

      $validated['password'] = Hash::make($validated['password']);
       
      $user = User::create($validated);

        Auth::login($user);
        return redirect('/');
    }

    
}