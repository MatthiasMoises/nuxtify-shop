<template>
  <div v-if="status === 'pending'">Loading ...</div>
  <div v-else-if="error">
    <p>An error occurred... :(</p>
  </div>
  <div v-else>
    <h2>Browse Categories</h2>
    <CategoriesAllItems
      v-if="productsCategories"
      :categories="productsCategories?.categories"
    />
    <div class="text-center">
      <h2 class="my-8">Recommended Products</h2>
      <v-row v-if="productsCategories?.products">
        <v-col
          cols="12"
          md="4"
          v-for="product in productsCategories.products"
          :key="product.id"
        >
          <ProductsItemCard :product="product" />
        </v-col>
      </v-row>
    </div>
  </div>
  <div>
    <v-btn color="primary" @click="refresh()">Refresh Data</v-btn>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "~/types/product";
import type { ProductsCategories } from "~/types/products-categories";

const runtimeConfig = useRuntimeConfig();

const {
  data: productsCategories,
  status,
  refresh,
  error,
} = useAsyncData<ProductsCategories>(
  "productsCategories",
  async (): Promise<ProductsCategories> => {
    const [products, categories] = await Promise.all<
      [Promise<Product[]>, Promise<string[]>]
    >([
      $fetch(`${runtimeConfig.public.apiBase}/products`),
      $fetch(`${runtimeConfig.public.apiBase}/products/categories`),
    ]);

    return {
      products,
      categories,
    };
  },
  {
    lazy: false,
    // Transform while fetching, to prevent hydration mismatch
    transform: (productsCategories) => {
      return {
        categories: productsCategories.categories,
        products: productsCategories.products
          .sort(() => 0.5 - Math.random())
          .slice(0, 5),
      };
    },
  }
);
</script>

<style scoped></style>
