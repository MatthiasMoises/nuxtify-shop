<template>
  <NuxtLink :to="`/categories/${category}`" class="text-decoration-none">
    <v-card :color="color">
      <template v-slot:title>
        <span class="font-weight-black text-white">{{
          firstLettersToUppercase(category)
        }}</span>
      </template>
    </v-card>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  category: string;
  color: string;
}>();
</script>
