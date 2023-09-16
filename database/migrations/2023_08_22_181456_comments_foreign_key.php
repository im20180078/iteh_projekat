<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {

        Schema::table('comments', function (Blueprint $table) {
            $table->unsignedBigInteger('comment_autor');
            $table->foreign('comment_autor')->references('id')->on('users');
        });
        
        Schema::table('comments', function (Blueprint $table) {
            $table->unsignedBigInteger('comment_post');
            $table->foreign('comment_post')->references('id')->on('posts');
        });

        Schema::table('comments', function (Blueprint $table) {
            $table->unsignedBigInteger('comment_reply');
            $table->foreign('comment_reply')->references('id')->on('comments');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('comments', function (Blueprint $table) {
            $table->dropForeign('comments_comment_autor_foreign');
            $table->dropForeign('comments_comment_post_foreign');
            $table->dropForeign('comments_comment_reply_foreign');
            $table->dropColumn('comment_autor');
            $table->dropColumn('comment_post');
            $table->dropColumn('comment_reply');
        });
    }
};
