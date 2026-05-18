import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'bookings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nama_pemesan').notNullable()
      table.string('no_telepon').notNullable()
      table.integer('lapangan_id').unsigned().references('id').inTable('lapangan').onDelete('CASCADE')
      table.date('tanggal').notNullable()
      table.string('jam_mulai').notNullable()
      table.string('jam_selesai').notNullable()
      table.integer('total_harga').notNullable()
      table.enum('status', ['pending', 'confirmed', 'cancelled']).defaultTo('pending')
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}