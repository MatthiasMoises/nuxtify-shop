<template>
  <v-toolbar color="purple-darken-2">
    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <v-toolbar-title>
      <v-btn to="/"> Nuxtify Shop </v-btn>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn to="/products">Products</v-btn>

    <v-btn to="/account">My Account</v-btn>

    <v-btn to="/cart">Cart</v-btn>

    <UiThemeToggler />
  </v-toolbar>
</template>
