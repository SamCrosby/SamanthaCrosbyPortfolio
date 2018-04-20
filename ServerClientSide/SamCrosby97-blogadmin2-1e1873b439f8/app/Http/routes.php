<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::group(['prefix' => 'api/v1'], function(){
    Route::resource('articles', 'OpenArticleController');
    Route::resource('categories', 'OpenCategoryController');
});


//secured routes

Route::group(['middle' => ['web']], function () {
    Route::auth();

    Route::get('/home', 'HomeController@index');

    Route::resource('/admin/surveys', 'QuestionnaireController');

    Route::resource('/admin/responses', 'ResponseController');

    Route::resource('/admin/categories', 'CategoriesController');

    Route::resource('/admin/articles', 'ArticleController' );

    Route::resource('/admin/questions', 'QuestionController');

    Route::resource('/admin/users', 'UserController');

    Route::resource('/surveys', 'SurveyCompletionController');
});



