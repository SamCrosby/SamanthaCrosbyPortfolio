<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Questionnaire;
use App\Question;
use App\Question_Response;

class SurveyCompletionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        /*
         * Retrieves the questionnaires and questions
         * from the database.
         */
        $questionnaires = Questionnaire::all();
        $questions = Question::all();

        //returns the front end surveys view with the questionnaire and questions data.
        return view('/surveys', ['questionnaires' => $questionnaires, 'questions' => $questions]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // validation for the survey completion form
        $this->validate($request, [
            'answer' => 'required',
        ]);

        /*
         * Requests all the input that the user has entered which is added to
         *  the question response table in the database and is then saved.
         */
        $input = $request->all();
        $answer = Question_Response::create($input);
        $answer->save();

        //redirects the user back to the front end surveys page.
        return redirect('/surveys');

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        /*
         * Finds the specific questionnaire and questions or else fails.
         */
        $questionnaire = Questionnaire::findOrFail($id);
        $questions = Question::findOrFail($id);
        $questionnaire->Question;

        // returns the user to the survey completion page with the questionnaire and questions data.
        return view('/surveys/show', ['questionnaires' => $questionnaire, 'questions' => $questions]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

}
