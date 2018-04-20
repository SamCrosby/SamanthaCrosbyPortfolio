<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = [
        'title',
        'content',
        'slug'
    ];

    /**
     * Get the categories associated with the given article.
     *
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function categories()
    {
        return $this->belongsToMany('App\Category');
    }

    /**
     * Get the user associated with the given article
     *
     * @return mixed
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
