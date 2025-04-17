<template>
  <v-toolbar color="blue-grey-darken-4">
    <span class="d-flex d-sm-none">
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </span>

    <NuxtLink to="/" class="px-5">
      <v-img :src="nuxtifyLogo" width="125" height="auto" alt="Nuxtify" />
    </NuxtLink>

    <v-spacer></v-spacer>

    <div class="d-none d-sm-flex align-center">
      <v-btn
        to="/products"
        variant="text"
        prepend-icon="mdi-shopping-outline"
        stacked
        >Products</v-btn
      >

      <v-btn to="/cart" prepend-icon="mdi-cart-outline" stacked>
        <v-badge
          v-if="cartStore.products.length > 0"
          color="error"
          :content="cartStore.products.length"
          offset-y="-25"
        >
          Cart
        </v-badge>
        <span v-else>Cart</span>
      </v-btn>

      <template v-if="!userStore.isAuthenticated">
        <v-btn to="/auth/login" variant="text" prepend-icon="mdi-login" stacked
          >Login</v-btn
        >

        <v-btn
          to="/auth/register"
          variant="text"
          prepend-icon="mdi-account-plus-outline"
          stacked
          >Sign Up</v-btn
        >
      </template>

      <template v-if="userStore.isAuthenticated">
        <v-btn to="/account" prepend-icon="mdi-account" stacked
          >My Account</v-btn
        >

        <v-btn
          variant="text"
          prepend-icon="mdi-logout"
          stacked
          @click="handleLogout"
          >Logout</v-btn
        >
      </template>
    </div>

    <UiThemeToggler />
  </v-toolbar>
  <UiMobileDrawer v-model="drawer" @user-logout="handleLogout" />
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";
import nuxtifyLogo from "~/assets/images/nuxtify_logo_dark_small.png";

const drawer = ref(false);

const router = useRouter();

const userStore = useUserStore();

const cartStore = useCartStore();

const handleLogout = () => {
  userStore.logoutUser();
  cartStore.clearCart();
  router.push("/");
};
</script>
