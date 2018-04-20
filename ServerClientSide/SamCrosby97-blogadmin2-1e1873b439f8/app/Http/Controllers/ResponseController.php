<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Response;
use App\Questionnaire;
use App\Question;
use App\Question_Response;

class ResponseController extends Controller
{

    /*
     * Secure the set of pages to admin
     */

    public function __construct() {
        $this->middleware('auth');
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        //retrieves all of the questionnaires from the database
        $questionnaires = Questionnaire::all();

        //returns the admin responses view with the questionnaires data.
        return view('/admin/responses', ['questionnaires' => $questionnaires]);
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
        //
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
         * finds both the questionnaire and question or else fails
         */
        $questionnaire = Questionnaire::findOrFail($id);
        $questions = Question::findOrFail($id);
        $questions->Question_Response;

        //returns the responses to the individual survey with the questionnaire and questions data.
        return view('/admin/responses/show', ['questionnaires' => $questionnaire, 'questions' => $questions]);
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
