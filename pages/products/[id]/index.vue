<template>
  <div class="pa-8">
    <div v-if="product">
      <UiBackButton />
      <v-row>
        <v-col cols="12" sm="12" md="8">
          <v-row>
            <v-col>
              <h1>{{ product.title }}</h1>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <small>
                In category:
                <NuxtLink
                  :to="`/categories/${product.category}`"
                  class="text-decoration-none"
                  >{{ firstLettersToUppercase(product.category) }}</NuxtLink
                >
              </small>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" xs="12" sm="4">
          <div class="bg-white text-center">
            <NuxtImg class="w-50" :src="product.image" />
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          {{ product.description }}
        </v-col>
        <v-col class="d-flex justify-end">
          <ProductsRatingDetailed :product-rating="product.rating" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div>Price:</div>
          <div style="font-size: 2rem">${{ product.price.toFixed(2) }}</div>
        </v-col>
        <v-col>
          <div>
            <v-select
              label="Quantity"
              type="number"
              :items="[1, 2, 3, 4, 5]"
              v-model="selectedQuantity"
              persistent-hint
            ></v-select>
          </div>
          <div>
            <v-btn
              color="deep-purple-lighten-2"
              text="Add to Cart"
              border
              block
              @click="addItemToCart(product)"
            />
          </div>
        </v-col>
      </v-row>
    </div>
    <div v-else-if="error">
      <v-row>
        <v-col> An error occurred... :( </v-col>
      </v-row>
    </div>
    <div v-else>
      <v-row>
        <v-col> Loading... </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CartProduct } from "~/types/cart-product";
import type { Product } from "~/types/product";

const runtimeConfig = useRuntimeConfig();
const route = useRoute();

const productId = route.params.id;

const { data: product, error } = await useFetch<Product>(
  `${runtimeConfig.public.apiBase}/products/${productId}`
);

// Quantity

const selectedQuantity = ref(1);

// Cart

const cartStore = useCartStore();

const addItemToCart = (product: Product) => {
  const cartProduct: CartProduct = {
    ...product,
    quantity: selectedQuantity.value,
  };
  cartStore.addToCart(cartProduct);
  snackbarStore.showSnackbar({
    message: "Item added to cart succesfully",
  });
};

// Snackbar
const snackbarStore = useSnackbarStore();
</script>
