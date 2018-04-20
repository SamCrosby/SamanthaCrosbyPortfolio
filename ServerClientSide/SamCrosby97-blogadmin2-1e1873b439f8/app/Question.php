<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = [
        'title',
        'option_one',
        'option_two',
        'option_three',
        'questionnaire_id',
    ];

    //relationship that question has with questionnaire
    public function Questionnaire()
    {
        return $this->belongsTo('App\Questionnaire');
    }

    //relationship question response has with question
    public function Question_Response()
    {
        return $this->hasMany('App\Question_Response');
    }

}
