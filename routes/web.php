<?php

use App\Http\Controllers\AuthenticatedSessionController;
use App\Http\Controllers\MyPostController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\RegisterController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Home');
// });

Route::get('/', [PostController::class, 'index']);

Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::delete('/logout', [AuthenticatedSessionController::class, 'destroy']);


Route::get('/register', [RegisterController::class, 'create']);
Route::post('/register', [RegisterController::class, 'store']);

Route::middleware('auth')->group(function () {

    // Route::get('/post/my', [MyPostController::class, 'index']);
    Route::get('/post/my/{slug}', [MyPostController::class, 'edit']);
    Route::resource('post', MyPostController::class)
        ->only('index', 'store', 'update', 'create', 'destroy');
    // Route::patch('/my-post', [MyPostController::class,'update'])->name('post.update');
    // Route::get('/post', [MyPostController::class, 'create']);
    // Route::post('/post', [MyPostController::class, 'store']);
});


Route::get('/posts/{slug}', [PostController::class, 'show']);
Route::get('/search', [PostController::class, 'index'])->name('posts.search');
