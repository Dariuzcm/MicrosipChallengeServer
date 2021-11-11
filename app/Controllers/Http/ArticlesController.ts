import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Article from 'App/Models/Article'

export default class ArticlesController {
  public async getAll() {
    const articles = await Article.all()

    return articles
  }
  public async create({ response, request }: HttpContextContract) {
    const { name } = request.body()
    const finded = await Article.find({ name })
    if (finded) return response.badRequest({ message: 'Article already exist' })

    const article = new Article()
    await article
      .fill({
        ...request.body(),
      })
      .save()
    return article.toJSON()
  }

  public async findOne({ response, params }: HttpContextContract) {
    const { id } = params
    const finded = await Article.find(id)
    if (!finded) return response.badRequest({ message: 'Article not exist' })
    return finded
  }

  public async edit({ response, request, params }: HttpContextContract) {
    const { id } = params
    const finded = await Article.findOrFail(id)
    if (!finded) return response.badRequest({ message: 'Article not exist' })

    finded
      .merge({
        ...request.body(),
      })
      .save()

    return finded
  }

  public async destroy({ response, params }: HttpContextContract) {
    const { id } = params
    const finded = await Article.find(id)
    if (!finded) return response.badRequest({ message: 'Article not exist' })
    await finded.delete()

    return { message: 'done' }
  }
}
