<template>
  <div v-if="product">
    <h1>{{ product.title }}</h1>
  </div>
  <div v-else-if="error">
    <p>An error occurred... :(</p>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "~/types/product";

const runtimeConfig = useRuntimeConfig();
const route = useRoute();

const productId = route.params.id;

const { data: product, error } = await useFetch<Product>(
  `${runtimeConfig.public.apiBase}/products/${productId}`
);
</script>

<style scoped></style>
