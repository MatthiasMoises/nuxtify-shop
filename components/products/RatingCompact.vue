<template>
  <!-- ClientOnly rendering because of hydration mismatch with vuetify rating hidden inputs -->
  <ClientOnly fallback-tag="span" fallback="Loading ratings...">
    <v-row class="mx-0">
      <v-rating
        :model-value="roundedRating"
        color="amber"
        density="compact"
        size="small"
        half-increments
        readonly
        disabled
      ></v-rating>

      <div class="text-grey ms-4">
        {{ productRating.rate }} ({{ productRating.count }})
      </div>
    </v-row>
  </ClientOnly>
</template>

<script setup lang="ts">
const props = defineProps<{
  productRating: { rate: number; count: number };
}>();

// Round product rating
const roundedRating = computed(() => {
  return round(props.productRating.rate, 0.5);
});
</script>
