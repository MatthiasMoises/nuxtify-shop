import type { Product } from "~/types/product";

export const useProductFilter = (searchTerm: Ref<string>, products: Ref<Product[] | null>) => {
  const filteredProducts = computed(() => {
    if (searchTerm.value.length >= 3 && products.value?.length) {
      return products.value?.filter((product: Product) =>
        product.title.includes(searchTerm.value)
      );
    }
    return products.value;
  });

  const itemCount = computed(() => {
    if (filteredProducts.value) {
      return filteredProducts.value?.length
    }

    return 0
  })

  return {
    itemCount,
    filteredProducts
  }
}