<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Questionnaire extends Model
{
    protected $fillable = [
        'title',
        'description',
    ];

    //relationship questionnaire has with question
    public function Question()
    {
        return $this->hasMany('App\Question');
    }

}
