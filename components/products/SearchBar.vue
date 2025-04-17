<template>
  <div class="px-5 mt-10 mb-5">
    <v-text-field
      v-model="searchTerm"
      clearable
      label="Filter Products..."
      prepend-icon="mdi-magnify"
      persistent-clear
      variant="outlined"
      @keyup="$emit('inputUpdated', searchTerm)"
      @click:clear="$emit('inputUpdated', '')"
    />
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: "inputUpdated", value: string): void;
}>();

const searchTerm = ref("");
</script>
