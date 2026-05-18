import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Lapangan from './lapangan.js'

export default class Booking extends BaseModel {

  static table = 'bookings'
  
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare namaPemesan: string

  @column()
  declare noTelepon: string

  @column()
  declare lapanganId: number

  @column()
  declare tanggal: string

  @column()
  declare jamMulai: string

  @column()
  declare jamSelesai: string

  @column()
  declare totalHarga: number

  @column()
  declare status: 'pending' | 'confirmed' | 'cancelled'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Lapangan)
  declare lapangan: BelongsTo<typeof Lapangan>
}