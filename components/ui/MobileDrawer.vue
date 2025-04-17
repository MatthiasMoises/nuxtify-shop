<template>
  <ClientOnly>
    <div class="d-flex d-sm-none">
      <v-navigation-drawer
        v-model="model"
        :location="$vuetify.display.mobile ? 'bottom' : undefined"
        temporary
      >
        <v-list>
          <v-list-item>
            <v-list-item-title>
              <v-btn to="/" variant="text" prepend-icon="mdi-home-outline"
                >Home</v-btn
              >
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <v-btn
                to="/products"
                variant="text"
                prepend-icon="mdi-shopping-outline"
                >Products</v-btn
              >
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <v-btn to="/cart" variant="text" prepend-icon="mdi-cart-outline"
                >Cart</v-btn
              >
            </v-list-item-title>
          </v-list-item>
          <v-list-item v-if="userStore.isAuthenticated">
            <v-list-item-title>
              <v-btn to="/account" prepend-icon="mdi-account">My Account</v-btn>
            </v-list-item-title>
          </v-list-item>
          <v-list-item v-if="!userStore.isAuthenticated">
            <v-list-item-title>
              <v-btn to="/auth/login" variant="text" prepend-icon="mdi-login"
                >Login</v-btn
              >
            </v-list-item-title>
          </v-list-item>
          <v-list-item v-if="!userStore.isAuthenticated">
            <v-list-item-title>
              <v-btn
                to="/auth/register"
                variant="text"
                prepend-icon="mdi-account-plus-outline"
                >Sign Up</v-btn
              >
            </v-list-item-title>
          </v-list-item>
          <v-list-item v-if="userStore.isAuthenticated">
            <v-list-item-title>
              <v-btn
                variant="text"
                prepend-icon="mdi-logout"
                @click="$emit('userLogout')"
                >Logout</v-btn
              >
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
const model = defineModel({ type: Boolean, required: true });

const userStore = useUserStore();

const emit = defineEmits(["userLogout"]);
</script>
