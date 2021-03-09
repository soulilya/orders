'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/**
 * Модель заказа
 */
class Order extends Model {
    products () {
        return this.belongsToMany('App/Models/Product').withPivot(['quantity'])
    }
}

module.exports = Order
