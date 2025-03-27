<template>
  <v-btn @click="toggleTheme">
    <v-icon icon="mdi-brightness-4" title="Toggle Theme"></v-icon>
  </v-btn>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify";

const theme = useTheme();

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
};
</script>
