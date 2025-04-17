<template>
  <v-card
    :append-avatar="cartItem.image"
    class="mx-auto"
    :subtitle="firstLettersToUppercase(cartItem.category)"
    :title="cartItem.title"
    max-width="750"
  >
    <v-card-text>
      <v-row>
        <v-col>
          {{ cartItem.description }}
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">Quantity: {{ cartItem.quantity }}</v-col>
        <v-col cols="4"> Price: ${{ cartItem.price }} </v-col>
        <v-col cols="4" style="font-size: 18px">
          Total Price: ${{ (cartItem.price * cartItem.quantity).toFixed(2) }}
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="red"
        text="Remove from Cart"
        border
        block
        @click="removeItem"
      />
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import type { CartProduct } from "~/types/cart-product";

const props = defineProps<{
  cartItem: CartProduct;
}>();

const cartStore = useCartStore();
const snackbarStore = useSnackbarStore();

const removeItem = () => {
  cartStore.removeFromCart(props.cartItem.id);
  snackbarStore.showSnackbar({
    message: "Item removed from cart succesfully",
  });
};
</script>
