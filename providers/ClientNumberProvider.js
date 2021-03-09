'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class ClientNumberProvider extends ServiceProvider {
  /**
  * Провайдер для валидатора номера клиента
  * @usage clientExists
  */
  async clientNumberExists(data, field, message, args, get) {
    const Order = use('App/Models/Order')
    const personId = get(data, field);

    if(personId)
    {
      const first_name = get(data, 'first_name');
      const last_name = get(data, 'last_name');
      const row = await Order.query().where('client_no', personId).first();

      if(row && row.first_name != first_name || row.last_name != last_name)
      {
        throw 'Имя и фамилия не совпадают с существующим номером клиента'
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
    Validator.extend('clientNumbertExists', this.clientNumberExists, 'Номер клиента существует');
  }
}

module.exports = ClientNumberProvider
