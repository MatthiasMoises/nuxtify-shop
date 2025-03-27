<template>
  <div v-for="category in categories" :key="category">{{ category }}</div>
</template>

<script setup lang="ts">
defineProps<{
  categories: string[];
}>();
</script>
