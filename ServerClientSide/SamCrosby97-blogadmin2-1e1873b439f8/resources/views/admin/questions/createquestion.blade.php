<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Create Question</title>
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
<h1 style="margin-top:60px;text-align:center;">Create Question</h1>

<!-- Create Question form that is controlled by the store function in the question controller -->
{!! Form::open(array('action' => 'QuestionController@store', 'id' => 'createquestion')) !!}
<div class="row">
    <!-- Attaches the questionnaire_id to the question by having it hidden in the form-->
    {!! Form::hidden('questionnaire_id', $questionnaire, ['class' => 'large-8 columns']) !!}

    <!-- Question title-->
    {!! Form::label('title', 'Question Title:') !!}
    {!! Form::text('title', null, ['class' => 'large-8 columns']) !!}
</div>

<!-- First answer input field -->
<div class="row">
    {!! Form::label('option_one', 'Answer One:') !!}
    {!! Form::text('option_one', null, ['class' => 'large-8 columns']) !!}
</div>

<!-- second answer input field -->
<div class="row">
    {!! Form::label('option_two', 'Answer Two:') !!}
    {!! Form::text('option_two', null, ['class' => 'large-8 columns']) !!}
</div>

<!-- Third answer input field-->
<div class="row">
    {!! Form::label('option_three', 'Answer Three:') !!}
    {!! Form::text('option_three', null, ['class' => 'large-8 columns']) !!}
</div>

<!--Create question button-->
<div class="row">
    {!! Form::submit('Create Question', ['class' => 'button']) !!}
    {!! Form::close() !!}

    <!-- Submit survey button - returns the user back to the surveys page -->
    <form action="http://localhost:8000/admin/surveys">
        <button type="submit">Submit Survey</button>
    </form>
</div>
</body>
</html>

