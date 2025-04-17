import type { CartProduct } from "~/types/cart-product";

interface State {
  id: number,
  userId: number,
  products: Array<CartProduct>,
}

export const useCartStore = defineStore('cartStore', {
  state: (): State => ({
    id: 0,
    userId: 0,
    products: []
  }),
  actions: {
    addToCart(product: CartProduct) {
      this.products.push(product)
    },
    removeFromCart(productId: number) {
      this.products = this.products.filter(product => product.id !== productId)
    },
    clearCart() {
      this.products = []
    }
  },
})