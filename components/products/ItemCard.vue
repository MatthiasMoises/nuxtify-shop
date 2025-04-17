<template>
  <v-card class="mx-auto my-6 text-center" variant="tonal">
    <div class="bg-white pa-5">
      <NuxtLink :to="{ path: `/products/${product.id}` }">
        <v-img height="250" :src="product.image" />
      </NuxtLink>
    </div>

    <v-card-item>
      <v-card-title class="mb-2">
        <NuxtLink
          :to="{ path: `/products/${product.id}` }"
          class="text-decoration-none"
        >
          {{ product.title }}
        </NuxtLink>
      </v-card-title>

      <v-card-subtitle>
        <NuxtLink :to="`/categories/${product.category}`">
          <v-chip variant="elevated">
            {{ product.category }}
          </v-chip>
        </NuxtLink>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <v-row align-content="center" class="pa-4">
        <div class="mb-5" style="min-height: 80px">
          <p>{{ productDescription }}</p>

          <NuxtLink
            :to="{ path: `/products/${product.id}` }"
            class="text-decoration-none"
          >
            <span class="font-weight-bold">Read More</span>
          </NuxtLink>
        </div>
      </v-row>

      <v-row align-content="center" class="mx-0">
        <v-col align-self="center" class="text-left">
          <ProductsRatingCompact :product-rating="product.rating" />
        </v-col>
        <v-col align-self="center" class="text-right">
          <div>Price</div>
          <div class="text" style="font-size: 1.5rem">
            ${{ product.price.toFixed(2) }}
          </div>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="deep-purple-lighten-2"
        text="Add to Cart"
        border
        block
        @click="addItemToCart(product)"
      />
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import type { CartProduct } from "~/types/cart-product";
import type { Product } from "~/types/product";

const props = defineProps<{
  product: Product;
}>();

// Product description
const productDescription = computed(() => {
  return props.product.description.substring(0, 90) + "...";
});

// Cart

const cartStore = useCartStore();
const snackbarStore = useSnackbarStore();

const addItemToCart = (product: Product) => {
  const cartProduct: CartProduct = {
    ...product,
    quantity: 1,
  };

  cartStore.addToCart(cartProduct);
  snackbarStore.showSnackbar({
    message: "Item added to cart succesfully",
  });
};
</script>
