<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'post_title', 'post_time', 'post_content', 'post_autor', 'visible'
    ];
    public $timestamps = false;

    public function author()
    {
        return $this->belongsTo(User::class, 'post_autor');
    }
}
