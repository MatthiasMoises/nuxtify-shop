<template>
  <v-footer color="blue-grey-darken-4">
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="(link, index) in links"
        :key="index"
        :to="link.href"
        class="mx-2"
        color="white"
        rounded="xl"
        variant="text"
      >
        {{ link.name }}
      </v-btn>
      <v-col class="text-center mt-4" cols="12">
        {{ new Date().getFullYear() }} — <strong>Nuxtify</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script setup lang="ts">
const links = ref([
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Team", href: "/team" },
  { name: "Contact Us", href: "/contact" },
]);
</script>
