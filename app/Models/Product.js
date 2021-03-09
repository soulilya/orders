'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/**
 * Модель товара
 */
class Product extends Model {
    order () {
        return this.belongsToOne('App/Models/Order').pivotTable('order_product')
    }
}

module.exports = Product
