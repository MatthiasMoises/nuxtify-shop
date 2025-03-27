<template>
  <v-responsive>
    <v-app>
      <UiTheNavbar />
      <v-main>
        <v-container>
          <NuxtLoadingIndicator />
          <slot />
        </v-container>
      </v-main>
      <UiTheFooter />
    </v-app>
  </v-responsive>
</template>
