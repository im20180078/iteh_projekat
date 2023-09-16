<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\UserTypeController;
use App\Models\UserType;
use App\Models\Post;
use App\Models\Likes;

use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Forum/Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'logoName' => "img/logo.png",
    ]);
});

Route::get('/login', function(){
    return Inertia::render('Forum/Login');
})->name('login');

Route::get('/register', function(){
    return Inertia::render('Forum/Register', [
        'user_types' => UserType::all(),
    ]);
})->name('register');

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/posts', function () {
        return Inertia::render('Forum/Posts');
    })->name('posts');

    Route::get('/post/{id}', function ($id) {
        return Inertia::render('Forum/Post', [
            'post' => Post::with('author')->find($id),
            'liked' => Likes::where('liked_by', \Auth::id())
            ->where('liked_post', $id)
            ->exists(),
            'num_likes' => Likes::all()->where('liked_post', $id)->count(),
        ]);
    })->name('post');

    Route::get('/new_post', function () {
        return Inertia::render('Forum/NewPost');
    })->name('new_post');
});
