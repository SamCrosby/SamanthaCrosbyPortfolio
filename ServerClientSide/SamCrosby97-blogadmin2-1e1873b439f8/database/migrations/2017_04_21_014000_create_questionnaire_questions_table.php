<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateQuestionnaireQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('questionnaire_questions', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('questionnaire_id')->unsigned()->index();
            $table->foreign('questionnaire_id')->references('id')->on('questionnaires')->onDelete('cascade');
            $table->integer('question_id')->unsigned()->index();
            $table->foreign('question_id')->references('id')->on('questions')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('questionnaire_questions');
    }
}
