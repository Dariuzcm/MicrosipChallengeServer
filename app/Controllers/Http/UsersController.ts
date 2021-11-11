import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Users from 'App/Models/users'

export default class UsersController {
  public async login({ request, auth, response }: HttpContextContract) {
    const { email, username, password } = request.body()
    const user = await Users.query().where('email', email).orWhere('username', username).limit(1)
    if (!user) {
      return response.badRequest({ message: 'Not found' })
    }

    try {
      const token = await auth.use('api').attempt(email || username, password, {
        expiresIn: '30mins',
      })
      return {
        token,
        user: {
          id: user[0].id,
          email,
          name: user[0].username,
        },
      }
    } catch (err) {
      return response.badRequest({ message: 'Invalid credentials' })
    }
  }
  /**
   * createUser
   */
  public async createUser({ request, response }: HttpContextContract) {
    const { email, password, username } = request.body()

    const user = await Users.query().where('email', email).orWhere('username', username).limit(1)
    if (user) return response.badRequest({ message: 'user already exist' })

    const createdUser = new Users()
    createdUser.email = email
    createdUser.password = password
    createdUser.username = username

    await createdUser.fill({ email, password, username }).save()
  }
}
