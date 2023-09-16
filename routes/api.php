<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\PostController;
use App\Http\Controllers\LikesController;
use App\Models\User;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// implement posts in api
// json: page_num: ..., num_of_pages:..., pages:...
//Route::get('/posts', [PostController::class, 'all_posts'])->name('posts.all');
//Route::get('/posts/{page}/{num_of_posts}', [PostController::class, 'index'])->name('posts.index')->where(['page' => '[0-9]+', 'num_of_posts' => '[0-9]+']);

Route::post('/create-api-token', function (Request $request) {
    // Validate the request data
    $request->validate([
        'email' => 'required',
        'password' => 'required',
    ]);

    // Find the user by their username
    $user = User::where('email', $request->email)->first();

    // Check if the user exists and the provided password is correct
    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json(['message' => 'Invalid username or password'], 401);
    }

    // Create a new API token for the user
    $token = $user->createToken($user->name, ['create', 'read', 'update', 'delete'])->plainTextToken;

    return response()->json(['token' => $token]);
});

Route::middleware('auth:sanctum')->get('/delete-tokens', function (Request $request) {
    $user = $request->user();
    $user->tokens->each->delete();

    return response()->json(['message' => 'All tokens have been deleted']);
});

Route::middleware('auth:sanctum')->group(function(){
    Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
    Route::get('/posts', [PostController::class, 'all_posts'])->name('posts.all');
    Route::get('/posts/{page}/{num_of_posts}', [PostController::class, 'index'])->name('posts.index')->where(['page' => '[0-9]+', 'num_of_posts' => '[0-9]+']);
    Route::get('/posts/length', [PostController::class, 'num_of_posts']);
    Route::get('/numPosts', [PostController::class, 'getPostCount']);
    Route::delete('/deleteAllPosts', [PostController::class, 'deleteAllPosts']);
    // delete post with id
    // delete all posts
    // like post
    Route::post('/posts/{id}/like', [LikesController::class, 'toggleLike']);
    Route::get('/posts/{id}/check_like', [LikesController::class, 'checkLike']);
    // like num of likes on post

    // comment or reply on post
});
