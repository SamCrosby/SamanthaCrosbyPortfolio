<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question_Response extends Model
{
    protected $fillable = [
        'answer',
        'question_id'
    ];

    //relationship question response has with question
    public function Question()
    {
        return $this->belongsTo('App\Question');
    }

}
