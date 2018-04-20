<?php
$I = new FunctionalTester($scenario);

$I->am('admin');
$I->wantTo('delete an article');


// Add db test data

// add a test user
$I->haveRecord('users', [
    'id' => '9999',
    'name' => 'testuser1',
    'email' => 'test1@user.com',
    'password' => 'password',
]);

// Add test category
$I->haveRecord('categories', [
    'id' => '9900',
    'title' => 'category1',
    'detail' => 'category1 detail',
]);



// add a test article to delete
$I->haveRecord('articles', [
    'id' => '9000',
    'title' => 'Article 1',
    'content' => 'article 1 content',
    'slug' => 'article1',
    'author_id' => '9999',
]);


// add link data for article and category for the test entry
$I->haveRecord('article_category', [
    'article_id' => '9000',
    'category_id' => '9900',
]);


// Check the user is in the db and can be seen
$I->seeRecord('articles', ['title' => 'Article1', 'id' => '9000']);


// When
$I->amOnPage('/admin/articles');

// then

// Check  the link is present - this is because there could potentially be many update links/buttons.
// each link can be identified by the users id as name.
$I->seeElement('a', ['name' => '9000']);
// And
$I->click('Delete Article1');

// Then
$I->amOnPage('/admin/articles');
// And
$I->dontSeeElement('a', ['name' => '9000']);
