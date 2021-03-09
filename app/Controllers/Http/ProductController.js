'use strict'

const Product = use('App/Models/Product')

/**
 * Контроллер для товаров
 */
class ProductController {

  /**
   * Метод для отображения листинга товаров 
   * @param view - шаблон
   * @returns object
   */
  async productList ({ view }) {
    const products = await Product.all()
    return view.render('products.products', {
      products: products.toJSON()
    })
  }

  /**
   * Метод для отображения формы создания товара
   * @param view - шаблон
   * @returns object
   */
  async create ({ view }) {
    return view.render('products.create-product')
  }

  /**
   * Метод для обработки формы создания товара
   * @param request - параметры запроса
   * @param response - параметры ответа
   * @param session - параметры сессии
   * @returns redirect
   */  
  async store ({ request, response, session }) {
    const product = await Product.create({
      product_name: request.input('product_name')
    })
    session.flash({ 'successmessage': 'Товар создан'})
    return response.redirect('/products')
  }

  /**
   * Метод для отображения формы изменения товара
   * @param view - шаблон
   * @param params - параметры запроса
   * @returns object
   */
  async edit ({ params, view }) {
    const product = await Product.find(params.id)
    return view.render('products.edit-product', {
      product: product.toJSON()
    })
  }

  /**
   * Метод для обработки формы обновления товара
   * @param request - параметры запроса
   * @param response - параметры ответа
   * @param session - параметры сессии
   * @param params - параметры запроса
   * @returns redirect
   */
  async update ({ params, request, response, session }) {
    const product = await Product.find(params.id)
    product.product_name = request.input('product_name')
    await product.save()
    session.flash({'successmessage': 'Товар обновлен'})
    return response.redirect('/products')
  }

  /**
   * Метод для обработки удаления товара
   * @param request - параметры запроса
   * @param response - параметры ответа
   * @param session - параметры сессии
   * @returns redirect
   */
  async destroy ({ params, response, session }) {
    const product = await Product.find(params.id)
    await product.delete()
    session.flash({'successmessage': 'Товар удален'})
    return response.redirect('/products')
  }
}

module.exports = ProductController
