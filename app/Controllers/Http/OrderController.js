'use strict'

const Order = use('App/Models/Order')
const Product = use('App/Models/Product')
const { validate } = use('Validator')
const OrderValidator = use('App/Validators/Order')

/**
 * Контроллер для заказов
 */
class OrderController {

  /**
   * Метод для отображения листинга заказов 
   * @param view - шаблон
   * @returns object
   */
  async orderList ({ view }) {
    const orders = await Order.all()
    return view.render('orders.orders', {
      orders: orders.toJSON()
    })
  }

  /**
   * Метод для отображения формы создания заказа
   * @param view - шаблон
   * @returns object
   */
  async create ({ view }) {
    const products = await Product.all()
    return view.render('orders.create-order', {
      products: products.toJSON()
    })
  }


  /**
   * Метод для обработки формы создания заказа
   * @param request - параметры запроса
   * @param response - параметры ответа
   * @param session - параметры сессии
   * @returns redirect
   */
  async store ({ request, response, session }) {
    const order = await Order.create({
      client_no: request.input('client_no'),
      first_name: request.input('first_name'),
      last_name: request.input('last_name'),
      post_code: request.input('post_code'),
    })

    const products = request.input('products')
    const quantity = request.input('quantity')

    for(let i=0;i<products.length;i++)
    {
      await order.products().attach(order.id, (model) => {
        model.product_id = products[i]
        model.quantity = quantity[i]
      })
    }

    session.flash({ 'successmessage': 'Заказ создан'})
    return response.redirect('/')
  }

  /**
   * Метод для отображения формы изменения заказа
   * @param view - шаблон
   * @param params - параметры запроса
   * @returns object
   */
  async edit ({ params, view }) {
    const order = await Order.find(params.id)
    const orderProducts = await order.products().fetch()

    const products = await Product.all()
    return view.render('orders.edit-order', {
      order: order.toJSON(),
      order_products: orderProducts.toJSON(),
      products: products.toJSON(),
    })
  }

  /**
   * Метод для обработки формы обновления заказа
   * @param request - параметры запроса
   * @param response - параметры ответа
   * @param session - параметры сессии
   * @param params - параметры запроса
   * @returns redirect
   */
  async update ({ params, request, response, session }) {
    const order = await Order.find(params.id)
    order.client_no = request.input('client_no')
    order.first_name = request.input('first_name')
    order.last_name = request.input('last_name')
    order.post_code = request.input('post_code')
    await order.save()

    const products = request.input('products')
    const quantity = request.input('quantity')

    await order.products().detach(products)

    for(let i=0;i<products.length;i++)
    {
      await order.products().attach(order.id, (model) => {
        model.product_id = products[i]
        model.quantity = quantity[i]
      })
    }

    session.flash({'successmessage': 'Заказ обновлен'})
    return response.redirect('/')
  }

  /**
   * Метод для обработки удаления заказа
   * @param request - параметры запроса
   * @param response - параметры ответа
   * @param session - параметры сессии
   * @returns redirect
   */
  async destroy ({ params, response, session }) {
    const order = await Order.find(params.id)
    await order.delete()
    session.flash({'successmessage': 'Заказ удален'})
    return response.redirect('/')
  }
}

module.exports = OrderController
