<template>
  <v-responsive>
    <v-app>
      <UiTheNavbar />
      <v-main>
        <v-container>
          <NuxtLoadingIndicator />
          <slot />
          <UiMessageSnackbar />
        </v-container>
      </v-main>
      <UiTheFooter />
    </v-app>
  </v-responsive>
</template>
