<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Create Survey</title>
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
<h1 style="margin-top:60px;text-align:center;">Create Survey</h1>

<!--Validation makes sure users actually enter something into create survey form-->
@if($errors->any())
    <div>
        <ul class="alert alert-danger">
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif


<!--Create survey form controlled by the store function in the questionnaire controller-->
{!! Form::open(array('action' => 'QuestionnaireController@store', 'id' => 'createquestionnaire')) !!}

<!--Title input field-->
<div class="row">
    {!! Form::label('title', 'Title:') !!}
    {!! Form::text('title', null, ['class' => 'large-8 columns']) !!}
</div>

<!--Description input field-->
<div class="row">
    {!! Form::label('description', 'Description:') !!}
    {!! Form::textarea('description', null, ['class' => 'large-8 columns']) !!}
</div>

<!--Create Questions button takes users to the create questions page-->
<div class="row">
    {!! Form::submit('Create Questions', ['class' => 'button']) !!}
    {!! Form::close() !!}
</div>

</body>
</html>