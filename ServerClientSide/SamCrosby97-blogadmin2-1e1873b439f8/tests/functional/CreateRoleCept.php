<?php 
$I = new FunctionalTester($scenario);
$I->wantTo('create a new role');

// When
$I->amOnPage('/admin/roles');
$I->see('Roles', 'h1');
$I->dontSee('Randomtest');
// And
$I->click('Add Role');

// Then
$I->amOnPage('/admin/roles/create');
// And
$I->see('Add Role', 'h1');
$I->submitForm('createrole', [
    'title' => 'Randomtest',
]);
// Then
$I->seeCurrentUrlEquals('/admin/roles');
$I->see('Roles', 'h1');
$I->see('New role added!');
$I->see('Randomtest');
