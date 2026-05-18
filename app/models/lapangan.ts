import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Booking from './booking.js'

export default class Lapangan extends BaseModel {

  static table = 'lapangan'
  
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nama: string

  @column()
  declare deskripsi: string | null

  @column()
  declare foto: string | null

  @column()
  declare hargaPerJam: number

  @column()
  declare status: 'aktif' | 'nonaktif'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Booking)
  declare bookings: HasMany<typeof Booking>
}