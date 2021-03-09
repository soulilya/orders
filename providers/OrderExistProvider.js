'use strict'

const { ServiceProvider } = require('@adonisjs/fold')
const moment = require('moment');

class OrderExistProvider extends ServiceProvider {
  /**
  * Провайдер для валидатора одинаковых заказов по номеру клиента
  * @usage orderExists
  */
    async orderExists(data, field, message, args, get) {
      const Order = use('App/Models/Order')
      const personId = get(data, field);

      if(personId)
      {
        const products = get(data, 'products');

        const end_date = moment().format('YYYY-MM-DD') + ' 00:00:00'
        const start_date = moment().subtract(7,'d').format('YYYY-MM-DD') + ' 00:00:00'

        const orders = await Order.query().with('products').whereBetween('created_at', [start_date, end_date]).fetch()

        const ordersObj = orders.toJSON()

        let counter = 0

      for(let order of ordersObj)
      {
        for(let product of order.products)
        {
          if(products.includes(product.id))
          {
            counter++
          }
        }
      }
      
      if(counter == products.length)
      {
        throw "Данный заказа уже создан за последние 7 дней!"
      }
    }
  }
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register () {
    //
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot () {
    const Validator = use('Validator');
    Validator.extend('orderExists', this.orderExists, 'Номер клиента существует');
  }
}

module.exports = OrderExistProvider
