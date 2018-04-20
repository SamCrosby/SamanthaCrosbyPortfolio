<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Questionnaire;
use App\Question;
use Illuminate\Support\Facades\Input;

class QuestionnaireController extends Controller
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
        //get all the questionnaires and questions from the database.
        $questionnaires = Questionnaire::all();
        $questions = Question::all();

        // returns the admin surveys page with the data from the database. 
        return view('/admin/surveys', ['questionnaires' => $questionnaires, 'questions' => $questions]);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // returns the create survey page.
        return view('admin/surveys/createsurvey');
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //validation for the create survey form
        $this->validate($request, [
            'title' => 'required|min:3|max:30',
            'description' => 'required|min:3|max:255',
        ]);

        /*
         * Requests all the input from the user then creates
         * the $questionnaire variable that holds the input that
         * is put in the questionnaires table in the database
         * and is then saved.
         */
        $input = $request->all();

        $questionnaire = Questionnaire::create($input);
        $questionnaire->save();

        //returns the create question view for the specific questionnaire.
        return view('admin/questions/createquestion', ['questionnaire'=>$questionnaire->id]);
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //finds the specific questionnaire or else fails.
        $questionnaire = Questionnaire::findOrFail($id);

        //If the questionnaire does not exist then it redirects the user to the admin surveys page.
        if(!$questionnaire) {
            return redirect('/admin/surveys');
        }

        //returns the edit survey page with the specific questionnaires data.
        return view('admin/surveys/edit')->with('questionnaire', $questionnaire);
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
        //The specific questionnaire is found or else fails.
        $questionnaire = Questionnaire::findOrFail($id);

        //questionnaire is updated.
        $questionnaire->update($request->all());

        // redirects to the admin surveys page.
        return redirect('admin/surveys');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //Specific questionnaire is found or else fails.
        $questionnaire = Questionnaire::find($id);

        //questionnaire is deleted.
        $questionnaire->delete();

        //redirects to the admin surveys page.
        return redirect('/admin/surveys');
    }

}
