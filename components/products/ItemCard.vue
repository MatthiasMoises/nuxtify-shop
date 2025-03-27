<template>
  <v-card class="product-card">
    <NuxtImg
      sizes="100vw sm:50vw md:400px"
      height="200px"
      :src="product.image"
    />

    <v-card-title> {{ product.title }} </v-card-title>

    <v-card-subtitle> {{ product.category }} </v-card-subtitle>

    <v-card-text>
      <v-row class="mx-0 mt-4">
        <v-rating
          :model-value="productRating"
          color="amber"
          density="compact"
          size="small"
          half-increments
          readonly
        ></v-rating>

        <div class="text-grey ms-4">
          {{ productRating }} ({{ ratingCount }})
        </div>
      </v-row>
      <v-row class="my-8 mx-5">
        <p>{{ productDescription }}</p>
        <span
          class="link-toggle"
          v-if="showFullDescription"
          @click="toggleDescription"
          >Less</span
        >
        <span class="link-toggle" v-else @click="toggleDescription">More</span>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-btn
        :to="{ path: `/products/${product.id}/details` }"
        color="orange"
        text="View Details"
      ></v-btn>

      <v-btn
        color="orange"
        text="Add to cart"
        @click="addItem(product)"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import type { Product } from "~/types/product";
const { cart, addToCart } = useCart();

const props = defineProps<{
  product: Product;
}>();

// Product rating
const { productRating, ratingCount } = useProductRating();

// Product description
const showFullDescription = ref(false);

const toggleDescription = () => {
  showFullDescription.value = !showFullDescription.value;
};

const productDescription = computed(() => {
  if (showFullDescription.value === false) {
    return props.product.description.substring(0, 90) + "...";
  }
  return props.product.description;
});

// Cart
const addItem = (product: Product) => {
  addToCart(product);

  console.log(cart.value);
};
</script>

<style scoped>
.product-card {
  min-height: 520px;
}

.link-toggle {
  color: aquamarine;
  cursor: pointer;
  font-style: italic;
}
</style>
