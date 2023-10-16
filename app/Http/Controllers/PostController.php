<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        if (request()->has('keyword')) {
            $keyword = request()->get('keyword');
            $posts = Post::with('writer:id,name')->latest()->where('title', 'like', "%$keyword%")->orWhere('content', 'like', "%$keyword%")->get();
        } else {
            $posts = Post::with('writer:id,name')->latest()->get();
        }

        $postsTransform = $posts->transform(function ($post) {
            return [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'name' => $post->writer->name,
                'excerpt' => $post->excerpt,
                'created_at' => $post->created_at,
                'thumbnail' => Storage::url($post->thumbnail),
            ];
        });

        return Inertia::render('Home', [
            'posts' => $postsTransform,
        ]);
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
    public function show($slug)
    {
        $post = Post::with('writer:id,name')->where('slug', $slug)->first();

        $posts = Post::with('writer:id,name')->whereNot('slug', $slug)->latest()->get()->transform(function ($post) {
            return [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'name' => $post->writer->name,
                'excerpt' => $post->excerpt,
                'created_at' => $post->created_at,
                'thumbnail' => Storage::url($post->thumbnail),
            ];
        });


        return Inertia::render('DetailPost', [
            'post' => [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'content' => $post->content,
                'name' => $post->writer->name,
                'excerpt' => $post->excerpt,
                'created_at' => $post->created_at,
                'thumbnail' => Storage::url($post->thumbnail),
            ],
            'posts' => $posts
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function search(Request $request)
    {
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
}
