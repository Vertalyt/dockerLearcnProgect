import { defineStore } from 'pinia'

export const useOrdersStore = defineStore('orders',{
  state: () => ({
    orders: [],
    products:[],
  }),
  getters: {
    isOrders(state) {
      return state.orders
    },
    isProducs(state) {
      return state.products
    },
  },
  actions: {
    deleteProducs({ id, order }) {

      this.orders = this.orders.map(orderStore => {
        if (orderStore.id === order) {
          return {
            ...orderStore,
            products: orderStore.products.filter(item => item.id !== id),
          };
        }
        return orderStore;
      });
    },
    addOrdersProdacsDate( {orders, products} ) {
      let ordersDate = orders
      const productsDate = products.map(product => {
        return {
          ...product,
          price: JSON.parse(product.price)
        }
      })
      this.products = productsDate
      ordersDate = ordersDate.map(order => {
        return {
          ...order,
          products: productsDate.filter(product => product.order_id === order.id)
        }
      })
      this.orders = ordersDate
    }
  },
});
