<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateQuestionnaireResponsesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('questionnaire_responses', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->string('title');
            $table->string('description');
            $table->string('status');
            $table->integer('responses');
            $table->integer('questionnaire_id')->unsigned()->index();
            $table->foreign('questionnaire_id')->references('id')->on('questionnaires')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('questionnaire_responses');
    }
}
