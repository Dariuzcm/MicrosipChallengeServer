import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Grant from './Grant'

export default class Users extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public username: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  @hasOne(() => Grant)
  public grants: HasOne<typeof Grant>
  @beforeSave()
  public static async hashPassword(users: Users) {
    if (users.$dirty.password) {
      users.password = await Hash.make(users.password)
    }
  }
}
