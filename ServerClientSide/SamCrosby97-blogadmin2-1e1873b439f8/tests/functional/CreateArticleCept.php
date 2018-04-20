<?php
$I = new FunctionalTester($scenario);

$I->am('admin');
$I->wantTo('create a new article');

// Add db test data

// add a test user
$I->haveRecord('users', [
    'id' => '9999',
    'name' => 'testuser1',
    'email' => 'test1@user.com',
    'password' => 'password',
]);

// Add test categories
$I->haveRecord('categories', [
    'id' => '9900',
    'title' => 'category1',
    'detail' => 'category1 detail',
]);
$I->haveRecord('categories', [
    'id' => '9901',
    'title' => 'category2',
    'detail' => 'category2 detail',
]);


// add a test article to check that content can be seen in list at start

$I->haveRecord('articles', [
    'id' => '9000',
    'title' => 'Article 1',
    'content' => 'article 1 content',
    'slug' => 'article1',
    'author_id' => 9999
]);


// add link data for article and category for the test entry
$I->haveRecord('article_category', [
    'article_id' => '9000',
    'category_id' => '9900',
]);




// tests /////////////////////////////////////////////

// create an article linked to one category
// When
$I->amOnPage('/admin/articles');
$I->see('Articles', 'h1');
$I->see('article 1');
$I->dontSee('article 2');
// And
$I->click('Add Article');

// Then
$I->amOnPage('/admin/articles/create');
// And
$I->see('Add Article', 'h1');

$I->submitForm('#createarticle', [
    'title' => 'Article 2',
    'content' => 'article 2 content',
    'slug' => 'article2',
    'category' => '9900',
]);

// how to handle the link table checking.

// check that the article has been written to the db then grab the new id ready to use as input to the link table.
// We don't have to search for the category id as we set that above and so we already know what it should have been set to.
$article = $I->grabRecord('articles', ['title' => 'Article 2']);
$I->seeRecord('article_category', ['article_id' => $article->id, 'category_id' => '9900']);

// Then
$I->seeCurrentUrlEquals('/admin/articles');
$I->see('Articles', 'h1');
$I->see('Article 1');
$I->see('Article 2');

$I->click('Article 2'); // the title is a link to the detail page


// Check that the url has a similar path to this.. the last part is a regular expression to allow for a digit or more to be returned as an id.
//$I->seeCurrentUrlMatches('~/admin/articles/(\d+)~');
$I->see('Article 2', 'h1');
$I->see('article 2 content');
$I->see('creator: testuser1'); // Got to here in Passing first BBd test 4 errors on line 24
$I->see('categories:');
$I->see('category 1');



// create an article linked to two categories
// When
$I->amOnPage('/admin/articles');
$I->see('Articles', 'h1');
$I->see('Article 1');
$I->dontSee('Article 3');
// And
$I->click('Add Article');

// Then
$I->amOnPage('/admin/articles/create');
// And
$I->see('Add Article', 'h1');
$I->submitForm('.createarticle', [
    'title' => 'Article 3',
    'content' => 'article 3 content',
    'slug' => 'article3',
    'user' => 'testuser1',
    'category' => '[category1, category2]', // multi select drop down
]);

// how to handle the link table checking.

        /* On your controller

$categories = Category::lists('name', 'id');

        On customer create view you can use.

        {{ Form::label('categories', 'Categories') }}
        {{ Form::select('categories[]', $categories, null, ['id' => 'categories', 'multiple' => 'multiple']) }}

        Third parameter accepts a list of array as well. If you define a relationship on your model you can do this:

        {!! Form::label('categories', 'Categories') !!}
        {!! Form::select('categories[]', $categories, $article->categories->lists('id')->all(), ['id' => 'categories', 'multiple' => 'multiple']) !!}

        */

// check that the article has been written to the db then grab the new id ready to use as input to the link table.
// We don't have to search for the category id as we set that above and so we already know what it should have been set to.
$article = $I->grabRecord('articles', ['title' => 'Article 2']);
$I->seeRecord('article_category', ['article_id' => $article->id, 'category_id' => '9900']);
$I->seeRecord('article_category', ['article_id' => $article->id, 'category_id' => '9901']);

// Then
$I->seeCurrentUrlEquals('/admin/articles');
$I->see('Articles', 'h1');
$I->see('Article 1');
$I->see('Article 2');
$I->see('Article 3');

$I->click('Article 3'); // the title is a link to the detail page


// Check that the url has a similar path to this.. the last part is a regular expression to allow for a digit or more to be returned as an id.
//$I->seeCurrentUrlMatches('~$/admin/articles/(\d+)~');
$I->see('Article 2', 'h1');
$I->see('article 2 content');
$I->see('creator: testuser1');
$I->see('categories:');
$I->see('category 1');
$I->see('category 2');