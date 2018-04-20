<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'title',
        'detail',
    ];

    /**
     * Get the categories associated with the given article.
     *
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */

}