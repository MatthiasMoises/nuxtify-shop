<template>
  <div class="text-center">
    <h1 class="my-8">All Products</h1>
    <v-row v-if="products">
      <v-col cols="12" md="4" v-for="product in products" :key="product.id">
        <ProductsItemCard :product="product" />
      </v-col>
    </v-row>
    <div v-else-if="error">
      <p>An error occurred... :(</p>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "~/types/product";

const runtimeConfig = useRuntimeConfig();

const { data: products, error } = await useFetch<Product[]>(
  `${runtimeConfig.public.apiBase}/products`
);
</script>
