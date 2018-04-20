<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Articles</title>
</head>
<body>
<h1>Articles</h1>

<section>
    @if (isset ($articles))

        <ul>
            @foreach ($articles as $article)
                <li>{{ $article->title }}</li>
            @endforeach
        </ul>
    @else
        <p> no articles added yet </p>
    @endif
</section>

{{ Form::open(array('action' => 'ArticleController@create', 'method' => 'get')) }}
<div class="row">
    {!! Form::submit('Add Article', ['class' => 'button']) !!}
</div>
{{ Form::close() }}

</body>
</html>