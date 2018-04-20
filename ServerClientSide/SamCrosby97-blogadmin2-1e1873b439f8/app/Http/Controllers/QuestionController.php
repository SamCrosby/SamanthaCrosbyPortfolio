<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Question;
use App\Questionnaire;

class QuestionController extends Controller
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
        //retrieves all the questions from the database.
        $questions = Question::all();

        //returns the create questions page with the questions data.
        return view('/admin/questions', ['questions' => $questions]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //returns the create question view.
        return view('admin/questions/createquestion');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        /*
         * Requests the input from the user which is added
         * to the questions table and is saved.
         */

        $input = $request->all();

        $question = Question::create($input);
        $question->save();

        //questionnaire id is stored in the questionnaire variable
        $questionnaire = $question->getAttribute('questionnaire_id');

        //returns the create question view
        return view('admin/questions/createquestion', ['questions'=>$question, 'questionnaire'=>$questionnaire]);
    }

    /**
     * Display the specified resource.
     *i
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
        //
    }

    public function add($id)
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
