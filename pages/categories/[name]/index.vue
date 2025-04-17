<template>
  <div class="text-center">
    <h2 class="my-8">Products in category "{{ categoryName }}"</h2>
    <v-row v-if="products">
      <v-col>
        <ProductsSearchBar @input-updated="filterProducts" />
      </v-col>
    </v-row>
    <v-row v-if="filteredProducts">
      <v-col
        cols="12"
        md="4"
        v-for="product in filteredProducts"
        :key="product.id"
      >
        <ProductsItemCard :product="product" />
      </v-col>
    </v-row>
    <v-row v-else-if="error">
      <p>An error occurred...</p>
    </v-row>
    <v-row v-else>
      <p>There are currently no products in this category.</p>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "~/types/product";

const runtimeConfig = useRuntimeConfig();

const route = useRoute();
const categoryName = route.params.name;

const { data: products, error } = await useFetch<Product[]>(
  `${runtimeConfig.public.apiBase}/products`,
  {
    transform: (products) => {
      return products.filter((product) => product.category === categoryName);
    },
  }
);

// Product filter
const searchTerm = ref("");

const filterProducts = (search: string) => {
  searchTerm.value = search;
};

const { filteredProducts } = useProductFilter(searchTerm, products);
</script>
