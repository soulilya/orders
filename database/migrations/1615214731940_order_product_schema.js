'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

/**
 * Миграция для связующей таблицы товаров и заказов
 */
class OrderProductSchema extends Schema {
  up () {
    this.create('order_product', (table) => {
      table.integer('order_id').unsigned().index('order_id')
      table.integer('product_id').unsigned().index('product_id')
      table.integer('quantity').unsigned()
      table.foreign('product_id').references('products.id').onDelete('cascade')
      table.foreign('order_id').references('orders.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('order_product')
  }
}

module.exports = OrderProductSchema
