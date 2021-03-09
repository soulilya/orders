'use strict'

/**
 * Валидатор формы товара
 */
class Product {
  get rules () {
    return {
        product_name:'required'
    }
  }

  get messages(){
    return{
      'product_name.required':'Поле обязательно для заполнения!'
    }
  }
}

module.exports = Product
