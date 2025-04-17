<template>
  <div class="d-flex flex-column justify-center align-center text-center mb-10">
    <h2 class="my-5">Your Shopping Cart</h2>
    <template v-if="cartStore.products.length">
      <v-row v-for="cartItem in cartStore.products" :key="cartItem.id">
        <v-col>
          <CartProductItem :cart-item="cartItem" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card>
            <v-card-text>
              <p style="font-size: 28px">
                <span class="text-blue">Sum of all items</span>: ${{
                  priceTotal.toFixed(2)
                }}
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn color="primary" block @click="handleCheckout"
            >Proceed to Checkout</v-btn
          >
        </v-col>
      </v-row>
    </template>
    <template v-else>
      <v-row class="mb-8">
        <v-col>
          <p>You currently have no items in your cart... Go shop some!</p>
        </v-col>
      </v-row>

      <v-img
        :src="emptyCart"
        class="w-25 mx-auto opacity-50"
        alt="Cart"
        rounded
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import emptyCart from "~/assets/images/empty_cart.jpeg";

const cartStore = useCartStore();

const priceTotal = computed(() => {
  return cartStore.products.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.price * currentValue.quantity,
    0
  );
});

// Checkout

const router = useRouter();

const userStore = useUserStore();

const handleCheckout = () => {
  if (userStore.isAuthenticated) {
    router.push("/checkout");
  } else {
    router.push("/auth/login?process=checkout");
  }
};
</script>
