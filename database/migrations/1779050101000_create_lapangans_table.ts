import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'lapangan'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nama').notNullable()
      table.text('deskripsi').nullable()
      table.string('foto').nullable()
      table.integer('harga_per_jam').notNullable()
      table.enum('status', ['aktif', 'nonaktif']).defaultTo('aktif')
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}