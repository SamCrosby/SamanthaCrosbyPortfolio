<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Complete Surveys</title>
    <link rel="stylesheet" href="/css/app.css" />
</head>
<header>
    <!-- left side navigation - surveys, survey responses, take a survey -->
    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container-fluid">
            <ul class="nav navbar-nav">
                <li><a class="navbar-brand" href="/admin/surveys/">Surveys</a></li>
                <li><a class="active" href="/admin/responses/">Survey Responses</a></li>
                <li><a class="active" href="/surveys/">Take a Survey</a></li>
            </ul>
            <div class="collapse navbar-collapse" id="app-navbar-collapse">
                <ul class="nav navbar-nav navbar-right">
                    <!-- Authentication Links -->
                    @if (Auth::guest())
                        <li><a href="{{ url('/login') }}">Login</a></li>
                        <li><a href="{{ url('/register') }}">Register</a></li>
                    @else
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                {{ Auth::user()->name }} <span class="caret"></span>
                            </a>

                            <ul class="dropdown-menu" role="menu">
                                <li><a href="{{ url('/logout') }}"><i class="fa fa-btn fa-sign-out"></i>Logout</a></li>
                            </ul>
                        </li>
                    @endif
                </ul>
            </div>
        </div>
    </nav>
</header>
<body>
<!--Complete Survey header along with ethics statement that the user agrees to when they complete the survey-->
<div class="row">
    <h1 class="header" style="margin-top:60px;text-align:center;">Complete Survey</h1>
    <p style="text-align:center;">By completing this questionnaire you agree for your answers to be used in the study and if you feel
        you no longer want to take the survey, you may quit at any time by pressing the quit survey button which will take back to the surveys page.</p>
</div>

<!--Validation that checks the user is submitting an answer-->
@if($errors->any())
    <div>
        <ul class="alert alert-danger">
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

<div class="row">
    <!--Survey Completion form that is controlled by the store function in the survey completion controller-->
    {!! Form::open(array('action' => 'SurveyCompletionController@store', 'id' => 'completequestionnaire')) !!}

    <!-- retrieves the questionnaire title for that specific questionnaire-->
<h3>{{$questionnaires->title}}</h3>

    <!--retrieves the questionnaire description for that specific questionnaire-->
<p>{{$questionnaires->description}}</p>

    <!-- For each loop that retrieves all of the questions for the specific questionnaire,
    along with the corresponding answers and puts them into a checkbox format-->
    @foreach($questionnaires->question as $question)
        <!--retrieves the question title for the specific questionnaire-->
            <h1>{{$question->title}}</h1>
            {!! Form::hidden('question_id', $question->id, ['class' => 'large-8 columns']) !!}
            <input type="checkbox" name="answer" value={{$question->option_one}}>{{$questions->option_one}}<br>
            <input type="checkbox" name="answer" value={{$question->option_two}}>{{$questions->option_two}}<br>
            <input type="checkbox" name="answer" value={{$question->option_three}}>{{$questions->option_three}}<br>
    @endforeach

    <!--Complete survey button that submits the users response-->
<div class="row ">
    {!! Form::submit('Complete Survey', ['class' => 'button']) !!}
    {{ Form::close() }}

    <!--Quit survey button that allows the user to return to the list of surveys without having to complete the survey-->
    <form action="http://localhost:8000/surveys/">
        <button type="submit">Quit Survey</button>
    </form>
</div>
</div>
</body>