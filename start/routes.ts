/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/login', 'UsersController.login')
  Route.post('/', 'UsersController.createUser')
  Route.post('/logout', async ({ auth }) => {
    await auth.use('api').revoke()
    return {
      revoked: true,
    }
  }).middleware('auth')
}).prefix('/api/users')

Route.group(() => {
  Route.get('/', 'ArticlesController.getAll').middleware('auth')
  Route.post('/', 'ArticlesController.create').middleware('auth')
  Route.put('/:id', 'ArticlesController.edit').middleware('auth')
  Route.delete('/:id', 'ArticlesController.destroy').middleware('auth')
}).prefix('/api/articles')
