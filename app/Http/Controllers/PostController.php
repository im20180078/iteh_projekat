<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function all_posts()
    {
        $posts = Post::all();
        return response()->json($posts, 200);
    }

    /**
     * Display a listing of the resource.
     */
    public function num_of_posts()
    {
        $posts = Post::all();
        return $posts->count();
    }

    public function post_id($id)
    {
        $posts = Post::all()->where('id', $id);
        return $posts;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, $page, $num_of_posts)
    {
        $perPage = $num_of_posts; // Number of posts per page
        $offset = ($page) * $perPage;

        $posts = Post::orderBy('post_time', 'desc')
        ->offset($offset)
        ->limit($perPage)
        ->get();

        $responseFormat = $request->header('Accept');

        if ($responseFormat === 'application/json') {
            // Vrati JSON
            return response()->json($posts, 200);
        }elseif ($responseFormat === 'application/xml') {
            // Vrati XML
            $array = $posts->toArray();
            $xmlData = new \SimpleXMLElement('<root/>');
            $this->arrayToXml($array, $xmlData);

            return response($xmlData->asXML(), 200)
            ->header('Content-Type', 'application/xml');
        } else {
            // Vrati JSON za sve ostale
            return response()->json($posts, 200);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     *   Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'post_title' => 'required|string|max:255',
            'post_content' => 'required|string',
        ]);

        // Get the authenticated user's ID
        $user = Auth::user();

        // Add the user's ID to the data array
        $data['post_autor'] = Auth::id();
        $data['post_time'] = now();

        // Create the post with the added user ID
        $post = Post::create($data);

        return response()->json(['message' => 'Post created successfully', 'post' => $data], 201);
    }

    public function getPostCount(){
        $userId = \Auth::id();
        $postCount = Post::where('post_autor', $userId)->count();
        return response()->json(['numPosts' => $postCount]);
    }

    public function deleteAllPosts(){
        $userId = Auth::id();
        Post::where('post_autor', $userId)->delete();
        return response()->json(['success' => 'All posts deleted successfully.'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }

    function arrayToXml($array, &$xml){
        foreach ($array as $key => $value) {
            if(is_int($key)){
                $key = "e";
            }
            if(is_array($value)){
                $label = $xml->addChild($key);
                $this->arrayToXml($value, $label);
            }
            else {
                $xml->addChild($key, $value);
            }
        }
    }
}
