<template>
  <div class="text-center">
    <template v-if="status === 'pending'">
      <v-row>
        <v-col>
          <p>Loading ...</p>
        </v-col>
      </v-row>
    </template>
    <template v-else-if="error">
      <v-row>
        <v-col>
          <p>An error occurred... Please try again later.</p>
        </v-col>
      </v-row>
    </template>
    <template v-else>
      <h2 class="my-5">Browse Categories</h2>
      <CategoriesAllItems
        v-if="productsCategories"
        :categories="productsCategories?.categories"
      />

      <div class="text-center">
        <h2 class="my-5">Recommended Products</h2>
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
    </template>
    <v-row class="text-center mb-5">
      <v-col>
        <v-btn color="primary" @click="refresh()"
          >Refresh Recommendations</v-btn
        >
      </v-col>
    </v-row>
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
} = await useAsyncData<ProductsCategories>(
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
          .slice(0, 6),
      };
    },
  }
);
</script>
