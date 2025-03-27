import type { Product } from "~/types/product"

export const useCart = () => {
  const cart = useState('cart', () => [{
    id: 1,
    title: 'Pudding',
    price: '9.99',
    category: 'Food',
    description: 'Yummy Pudding',
    image: '...'
  }])

  const addToCart = (product: Product): void => {
    cart.value.push(product)
  }

  const removeFromCart = (productId: number): void => {
    const productIndex = cart.value.findIndex((item) => item.id === productId)
    cart.value.splice(productIndex, 1)
  }

  return {
    cart,
    addToCart,
    removeFromCart
  }
}