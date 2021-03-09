'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

/**
 * Миграция для таблицы заказов
 */
class OrderSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      table.integer('client_no')
      table.string('first_name', 80).notNullable()
      table.string('last_name', 80).notNullable()
      table.integer('post_code').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrderSchema
