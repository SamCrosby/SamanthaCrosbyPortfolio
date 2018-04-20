<?php
$I = new FunctionalTester($scenario);

$I->am('admin');
$I->wantTo('create a new category');

// When
$I->amOnPage('/admin/categories');
$I->see('Categories', 'h1');
$I->dontSee('Randomtest');
// And
$I->click('Add Category');

// Then
$I->amOnPage('/admin/categories/create');
// And
$I->see('Add Category', 'h1');
$I->submitForm('.createcategory', [
    'name' => 'Randomtest',
]);
// Then
$I->seeCurrentUrlEquals('/admin/categories');
$I->see('Categories', 'h1');
$I->see('New category added!');
$I->see('Randomtest');