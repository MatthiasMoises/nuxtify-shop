<template>
  <div class="text-center">
    <h2 class="my-5">All Products</h2>
    <template v-if="filteredProducts">
      <template v-if="filteredProducts.length > 0">
        <v-row>
          <v-col>
            <ProductsSearchBar @input-updated="filterProducts" />
          </v-col>
        </v-row>
        <v-row class="text-right" style="font-size: 18px">
          <v-col> Results: {{ itemCount }} </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="4"
            v-for="product in filteredProducts"
            :key="product.id"
          >
            <ProductsItemCard :product="product" />
          </v-col>
        </v-row>
      </template>
      <template v-else>
        <v-row>
          <v-col>
            <p>
              There are no products available at the moment. Please try again
              later.
            </p>
          </v-col>
        </v-row>
      </template>
    </template>
    <div v-else-if="error">
      <v-row>
        <v-col>
          <p>An error occurred... :(</p>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <v-row>
        <v-col>
          <p>Loading...</p>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "~/types/product";

const runtimeConfig = useRuntimeConfig();

const { data: products, error } = await useFetch<Product[]>(
  `${runtimeConfig.public.apiBase}/products`
);

// Product filter
const searchTerm = ref("");

const filterProducts = (search: string) => {
  searchTerm.value = search;
};

const { filteredProducts, itemCount } = useProductFilter(searchTerm, products);
</script>
