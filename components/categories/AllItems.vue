<template>
  <v-row no-gutters>
    <v-col
      cols="12"
      md="6"
      sm="12"
      v-for="(category, index) in categories"
      :key="category"
      class="pa-6"
    >
      <CategoriesSingleItem :category="category" :color="colors[index]" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
defineProps<{
  categories: string[];
}>();

const colors = [
  "indigo",
  "teal",
  "lime",
  "orange",
  "blue-grey",
  "pink",
  "blue",
  "cyan",
];
</script>
