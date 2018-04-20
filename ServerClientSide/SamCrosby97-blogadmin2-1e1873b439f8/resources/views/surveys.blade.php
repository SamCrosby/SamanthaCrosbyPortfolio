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
                <li><a class="active" href="#">Take a Survey</a></li>
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
    <h2 style="margin-top:60px;text-align:center;">Current Surveys</h2>
    <section>
        <div class="row">
            <!--Survey completion table - contains the surveys title, creation date,
             description and a complete button that will take the user to the complete
              survey form for that particular survey-->
        @if (isset ($questionnaires))
            <table class="table table-striped table-bordered table-hover">
                <thead>
                <tr>
                    <td>Title</td>
                    <td>Creation Date</td>
                    <td>Description</td>
                    <td>Complete</td>
                </tr>
                </thead>
                <tbody>
                @foreach ($questionnaires as $questionnaire)
                    <tr>
                        <td>{{ $questionnaire->title }}</td>
                        <td>{{ $questionnaire->created_at }}</td>
                        <td>{{ $questionnaire->description }}</td>
                        <td> <a href="/surveys/{{$questionnaire->id}}" class="button">Complete</a></td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        @else
            <p> No questionnaires added yet</p>
        @endif
        </div>
    </section>
</section>
</body>
</html>