<?php
$I = new FunctionalTester($scenario);

$I->am('admin');
$I->wantTo('update a category');

// create a category in the db that we can then update
$I->haveRecord('categories', [
    'id' => '9999',
    'title' => 'Randomtest',
    'detail' => 'a test category',
]);

// Check the user is in the db and can be seen
$I->seeRecord('categories', ['title' => 'Randomtest', 'id' => '9999']);


// When
$I->amOnPage('/admin/categories');

// then

// Check  the link is present - this is because there could potentially be many update links/buttons.
// each link can be identified by the users id as name.
$I->seeElement('a', ['name' => '9999']);
// And
$I->click('a', ['name' => '9999']);

// Then
$I->amOnPage('/admin/categories/9999/edit');
// And
$I->see('Edit Category - Randomtest', 'h1');

// Then
$I->fillField('title', 'Updatedtest');
// And
$I->click('Update Category');

// Then
$I->seeCurrentUrlEquals('admin/categories');
$I->seeRecord('categories', ['title' => 'Updatedtest']);
$I->see('Categories', 'h1');
$I->see('Updatedtest');
