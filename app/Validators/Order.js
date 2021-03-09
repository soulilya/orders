'use strict'

/**
 * Валидатор формы заказа
 */
class Order {
  get rules () {
    return {
        first_name:'required',
        last_name:'required',
        products: 'required',
        client_no: 'clientNumbertExists|orderExists'
    }
  }

  get messages(){
    return{
      'first_name.required':'Поле обязательно для заполнения!',
      'last_name.required':'Поле обязательно для заполнения!',
      'products.required':'Добавьте товары в заказ!',
      'client_no.clientNumbertExists': 'Клиент с данным номером уже существует!',
      'client_no.orderExists': 'Такой заказ уже создавался за последние 7 дней!'
    }
  }
}

module.exports = Order
