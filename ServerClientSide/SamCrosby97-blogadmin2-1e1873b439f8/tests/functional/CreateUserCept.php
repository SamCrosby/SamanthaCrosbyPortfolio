<?php 
$I = new FunctionalTester($scenario);

$I->am('admin');
$I->wantTo('create a new user');

// When
$I->amOnPage('/admin/users');
$I->see('Users', 'h1');
$I->dontSee('Dave Walsh');
// And
$I->click('Add User');

// Then
$I->amOnPage('/admin/users/create');
// And
$I->see('Add User', 'h1');
$I->submitForm('#createuser', [
    'name' => 'Dave Walsh',
    'email' => 'walshd@edgehill.ac.uk',
    'password' => 'password'
]);
// Then
$I->seeCurrentUrlEquals('/admin/users');
$I->see('Users', 'h1');
$I->see('New user added!');
$I->see('Dave Walsh');



// Check for duplicates

// When
$I->amOnPage('/admin/users');
$I->see('Users', 'h1');
$I->see('Dave Walsh');
// And
$I->click('Add User');

// Then
$I->amOnPage('/admin/users/create');
// And
$I->see('Add User', 'h1');
$I->submitForm('#createuser', [
    'name' => 'Dave Walsh',
    'email' => 'walshd@edgehill.ac.uk',
    'password' => 'password'
]);
// Then
$I->seeCurrentUrlEquals('/admin/users');
$I->see('Users', 'h1');
$I->see('Error user already exists!');
