<?php
$I = new FunctionalTester($scenario);

$I->am('admin');
$I->wantTo('update a user');

// create a user in the db that we can then update
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

    // Check  the link is present - this is because there could potentially be many update links/buttons.
    // each link can be identified by the users id as name.
$I->seeElement('a', ['name' => '9999']);
// And
$I->click('a', ['name' => '9999']);

// Then
$I->amOnPage('/admin/users/9999/edit');
// And
$I->see('Edit User - testuser', 'h1');

// And
$I->amGoingTo('Clear the name field in order to try and submit an invalid entry');

// When
$I->fillField('name', null);
// And
$I->click('Update User');

// the above could and should be expanded to run a separate test on each form field!

// Then
$I->expectTo('See the form again with errors identified');
$I->seeCurrentUrlEquals('/admin/users/9999/edit');
$I->see('the name filed is required');
// Then
$I->fillField('name', 'updateduser');
// And
$I->click('Update User');

// Then
$I->seeCurrentUrlEquals('admin/users');
$I->seeRecord('users', ['name' => 'updateduser']);
$I->see('Users', 'h1');
$I->see('updateduser');
