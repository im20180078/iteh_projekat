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
        Schema::table('likes', function (Blueprint $table) {
            $table->unsignedBigInteger('liked_post');
            $table->foreign('liked_post')->references('id')->on('posts');
        });

        Schema::table('likes', function (Blueprint $table) {
            $table->unsignedBigInteger('liked_by');
            $table->foreign('liked_by')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('likes', function (Blueprint $table) {
            $table->dropForeign('likes_liked_post_foreign');
            $table->dropForeign('likes_liked_by_foreign');
            $table->dropColumn('liked_post');
            $table->dropColumn('liked_by');
        });
    }
};