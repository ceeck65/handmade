'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route');

// Account Public Routes
Route.group(() => {
    Route.post('login', 'UserController.login');
    Route.post('logout', 'UserController.logout');
    Route.post('refreshToken', 'UserController.refreshToken');
    Route.post('register', 'UserController.store');
    Route.post('checkUsername', 'UserController.checkUsername');
    Route.post('checkEmail', 'UserController.checkEmail');
    Route.post('confirm', 'UserController.confirmAccount');
    Route.get('stores', 'StoreController.index');
}).prefix('api');


Route.any('*', 'NuxtController.render');
