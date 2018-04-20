<?php
$I = new FunctionalTester($scenario);

$I->am('admin');
$I->wantTo('delete a user');

// create a user in the db that we can then delete it without changing our needed data
$I->haveRecord('users', [
    'id' => '9999',
    'name' => 'testuser',
    'email' => 'test@user.com',
    'password' => 'password',
]);

// Check the user is in teh db and can be seen
$I->seeRecord('users', ['name' => 'testuser', 'id' => '9999']);


// When
$I->amOnPage('/admin/users');

// then

// Check  the user is present buttons.
$I->see('testuser');
$I->seeElement('testuser', 'a.item');

// Then
$I->click('testuser delete');

// Then
$I->seeCurrentUrlEquals('admin/users');

// Check  the user is has been deleted.
$I->dontSee('testuser');
$I->dontSeeElement('testuser', 'a.item');
