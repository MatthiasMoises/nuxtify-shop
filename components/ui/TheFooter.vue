<template>
  <v-footer color="purple-darken-2">
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link"
        class="mx-2"
        color="white"
        rounded="xl"
        variant="text"
      >
        {{ link }}
      </v-btn>
      <v-col class="text-center mt-4" cols="12">
        {{ new Date().getFullYear() }} — <strong>Nuxtify</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script setup lang="ts">
const links = ref(["Home", "About Us", "Team", "Contact Us"]);
</script>
