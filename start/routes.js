'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

/*Роуты заказов*/
Route.get('/','OrderController.orderList').as('orders')
Route.get('/create-order','OrderController.create').as('create.order')
Route.post('/store-order','OrderController.store').as('store.order').validator('Order')
Route.get('/edit-order/:id','OrderController.edit').as('edit.order')
Route.post('/update-order/:id','OrderController.update').as('update.order')
Route.get('/delete-order/:id','OrderController.destroy').as('delete.order')

/*Роуты товаров*/
Route.get('/products','ProductController.productList').as('products')
Route.get('/create-product','ProductController.create').as('create.product')
Route.post('/store-product','ProductController.store').as('store.product').validator('Product')
Route.get('/edit-product/:id','ProductController.edit').as('edit.product')
Route.post('/update-product/:id','ProductController.update').as('update.product')
Route.get('/delete-product/:id','ProductController.destroy').as('delete.product')
