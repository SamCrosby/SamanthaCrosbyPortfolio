<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Edit Survey</title>
    <link rel="stylesheet" href="/css/app.css" />
</head>
<header>
    <!-- left side navigation - surveys, survey responses, take a survey -->
    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container-fluid">
            <ul class="nav navbar-nav">
                <li><a class="navbar-brand" href="/admin/surveys/">Surveys</a></li>
                <li><a class="active" href="#">Edit Survey</a></li>
            </ul>
        </div>
    </nav>
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
</header>
<body>
<!-- Edit Survey form-->
<h1 style="margin-top:60px;text-align:center;">Edit Survey</h1>

{!! Form::model($questionnaire, ['method' => 'PATCH', 'url' => '/admin/surveys/' . $questionnaire->id]) !!}

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

<!--Edit survey button submits the form and takes the user back to the surveys page-->
<div class="row">
    {!! Form::submit('Edit Survey', ['class' => 'button']) !!}
    {!! Form::close() !!}
</div>
</body>
</html>