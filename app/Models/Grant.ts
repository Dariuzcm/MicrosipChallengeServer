import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Grant extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public read: boolean

  @column()
  public create: boolean

  @column()
  public edit: boolean

  @column()
  public destroy: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
