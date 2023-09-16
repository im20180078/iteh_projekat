<?php

namespace App\Http\Controllers;

use App\Models\Likes;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikesController extends Controller
{
    public function toggleLike($id)
    {
        $userId = Auth::id();

        $like = Likes::where('liked_by', $userId)
                    ->where('liked_post', $id)
                    ->first();

        if ($like) {
            $like->delete();
            $liked = false;
        } else {
            Likes::create([
                'liked_by' => $userId,
                'liked_post' => $id,
            ]);
            $liked = true;
        }
        
        $num_likes = Likes::all()->where('liked_post', $id)->count();

        return response()->json(['liked' => $liked, 'num_likes' => $num_likes]);
    }

    public function checkLike($id)
    {
        $user = Auth::user();

        $liked = Likes::where('liked_by', $user->id)
                    ->where('liked_post', $id)
                    ->exists();

        return response()->json(['liked' => $liked]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Likes $likes)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Likes $likes)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Likes $likes)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Likes $likes)
    {
        //
    }
}
