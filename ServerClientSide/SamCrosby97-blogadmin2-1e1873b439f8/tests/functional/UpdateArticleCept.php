<?php
$I = new FunctionalTester($scenario);

$I->am('admin');
$I->wantTo('update an article');

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
    'author_id' => 'testuser1',
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


// Then

// Check  the link is present - this is because there could potentially be many update links/buttons.
// each link can be identified by the users id as name.
$I->seeElement('a', ['name' => '9000']);
// And
$I->click('a', ['name' => '9000']);

// Then
$I->amOnPage('/admin/articles/9000/edit');
// And
$I->see('Edit Article - Article1', 'h1');

// Then
$I->fillField('title', 'Updatedtitle');
// And
$I->click('Update Article');

// Then
$I->seeCurrentUrlEquals('admin/articles');
$I->seeRecord('articles', ['title' => 'Updatedtitle']);
$I->see('Articles', 'h1');
$I->see('Updatedtitle');
