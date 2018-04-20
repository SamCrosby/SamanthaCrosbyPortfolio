<?php 
$I = new AcceptanceTester($scenario);
$I->wantTo('ensure that Laravel works');
$I->amOnPage('/');
$I->see('Laravel 5');
