<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Questionnaire_Response extends Model
{
    protected $fillable = [
        'title',
        'description',
    ];
}
