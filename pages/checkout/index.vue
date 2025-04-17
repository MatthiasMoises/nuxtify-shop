<template>
  <div class="d-flex flex-column justify-center align-center text-center mb-10">
    <v-card>
      <v-card-title> Checkout </v-card-title>
      <v-card-text>
        <p>Send Items to:</p>
        <p>
          {{ userStore.currentUser?.name?.firstname }}
          {{ userStore.currentUser?.name?.lastname }}
        </p>
        <p>
          {{ userStore.currentUser?.address?.street }}
        </p>
        <p>
          {{ userStore.currentUser?.address?.zipcode }}
          {{ userStore.currentUser?.address?.city }}
        </p>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" variant="text" block @click="handleOrder"
          >Place Order</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore();
const cartStore = useCartStore();

const router = useRouter();

const handleOrder = () => {
  cartStore.clearCart();
  router.push("/checkout/success");
};
</script>
