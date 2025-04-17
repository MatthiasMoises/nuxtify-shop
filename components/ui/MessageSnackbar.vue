<template>
  <v-snackbar
    v-model="snackbarStore.visible"
    class="text-white"
    :location="$vuetify.display.mobile ? 'bottom' : 'top right'"
    :color="snackbarStore.getColor"
  >
    {{ snackbarStore.getMessage }}
    <template v-slot:actions>
      <v-btn color="orange" variant="text" @click="snackbarStore.hideSnackbar">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
const snackbarStore = useSnackbarStore();
</script>
