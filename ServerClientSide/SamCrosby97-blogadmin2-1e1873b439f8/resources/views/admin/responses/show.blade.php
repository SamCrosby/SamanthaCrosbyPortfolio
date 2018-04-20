<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="/css/app.css" />
    <title>Surveys</title>
</head>
<header>
    <!-- left side navigation - surveys, survey responses, take a survey -->
    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container-fluid">
            <ul class="nav navbar-nav">
                <li><a class="navbar-brand" href="/admin/surveys">Surveys</a></li>
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
<section class="content">
    <h1 style="margin-top:60px;text-align:center;">Survey Responses</h1>
<div class="row">
    <!-- was a table to show total counts for each answer but did not finish-->
    {{--@foreach($questionnaires->question as $question)--}}
        {{--@if (isset ($questionnaires, $questions))--}}
            {{--<table class="table table-striped table-bordered table-hover">--}}
                {{--<thead>--}}
                {{--<h3>{{ $questionnaires->title }}</h3>--}}
                {{--<tr>--}}
                    {{--<td>{{$questions->option_one}}</td>--}}
                    {{--<td>{{$questions->option_two}}</td>--}}
                    {{--<td>{{$questions->option_three}}</td>--}}
                    {{--<td>Total Responses</td>--}}
                {{--</tr>--}}
                {{--</thead>--}}
                {{--<tbody>--}}
                {{--@foreach ($questionnaires as $questionnaire)--}}
                    {{--<tr>--}}
                        {{--<td></td>--}}
                        {{--<td></td>--}}
                        {{--<td></td>--}}
                        {{--<td></td>--}}
                    {{--</tr>--}}
                {{--@endforeach--}}
                {{--</tbody>--}}
            {{--</table>--}}
        {{--@else--}}
            {{--<p> No responses yet</p>--}}
        {{--@endif--}}
    {{--@endforeach--}}



        <h3>Question Responses:</h3>
    <!-- For each loop, retrieves the question responses and puts them in a list format. -->
        @foreach($questions->question_response as $question)
                <li>{{$question->answer}}</li>
        @endforeach
</div>
<div class="row" style="margin-top:50px;">

    <!--Back button allows admin to get back to the main responses page -->
    <form action="http://localhost:8000/admin/responses/">
        <button type="submit">Back</button>
    </form>
</div>
</section>
</body>
</html>