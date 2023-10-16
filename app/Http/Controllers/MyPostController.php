<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;


class MyPostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
       $posts = Post::where('id_writer', auth()->user()->id)->latest()->get()->transform(function ($post){
           return [
               'id' => $post->id,
               'title' => $post->title,
               'created_at' => $post->created_at,
               'updated_at' => $post->updated_at,
               'slug' => $post->slug,
               'thumbnail' => Storage::url($post->thumbnail),
            ];
        });

       return Inertia::render('MyPosts/MyPosts', [
        'posts' => $posts
       ]);
        
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('MyPosts/PostForm');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request):RedirectResponse
    {
        
        $rules = [
            'title' => 'required|max:255',
            'content' => 'required',
          
        ];
  
        if($request['thumbnail']){
            $rules['thumbnail'] = 'image';
        }

        $validated = $request->validate($rules);


        if($request->file('thumbnail')){
            $validated['thumbnail'] = $request->file('thumbnail')->store('public/post-images');
        }
        
        $validated['id_writer'] = $request->user()->id;
        $validated['excerpt'] = Str::limit(strip_tags($request->content), 100, '...');

        Post::create($validated);

        return redirect(route('post.index'));
        
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
    public function edit($slug)
    {
        $post = Post::where('slug',$slug)->first();

        $post['thumbnail'] =  Storage::url($post->thumbnail);
        return Inertia::render('MyPosts/PostForm',[
            'post'=> $post
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        
      
        $this->authorize('update', $post);
        
        $rules = [
            'title' => 'required|max:255',
            'content' => 'required'
        ];

        if(($request['thumbnail'])){
            $rules['thumbnail'] = 'image';
        }

        $validated = $request->validate($rules);

        if($request['oldThumbnail']){
            
            if($request['thumbnail']){

                if($request['oldThumbnail']!=='public/post-images/default.png'){
                    Storage::delete($request['oldThumbnail']);
                }
                   $validated['thumbnail'] = $request->file('thumbnail')->store('public/post-images');
            }else{
                $validated['thumbnail'] = 'public/post-images/default.png';
            }
            
        }

        $validated['excerpt'] = Str::limit(strip_tags($request->content), 100, '...');

        $post->update($validated);

       return redirect(route('post.index'));

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $this->authorize('delete', $post);

        $post->delete();
        
        return redirect(route('post.index'));
    }
}