<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthenticatedSessionController extends Controller
{
  

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {  
        return Inertia::render('Auth/Login');

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'email' => 'required|email:dns',
            'password' => 'required|min:3',
        ]);

        if(Auth::attempt($validated)){
            $request->session()->regenerate();
            
            return redirect()->intended('/');
            
        }

        return back()->with('message', 'Login failed, invalid credentials!');
    }

   
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request):RedirectResponse
    {
        Auth::logout();

        $request->session()->invalidate();
        
        $request->session()->regenerateToken();

        return redirect('/');
    }
}