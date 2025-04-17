<template>
  <v-card class="py-4 px-4" elevation="10" height="450" width="360">
    <div class="d-flex justify-center mt-auto text-h5">Rating overview</div>

    <div class="d-flex align-center flex-column my-auto">
      <div class="text-h2 mt-5">
        {{ roundedRating }}
        <span class="text-h6 ml-n3">/{{ maxRating }}</span>
      </div>

      <v-rating
        :model-value="3.5"
        color="yellow-darken-3"
        half-increments
        readonly
        disabled
      ></v-rating>
      <div class="px-3">{{ productRating.count }} ratings</div>
    </div>

    <v-list
      bg-color="transparent"
      class="d-flex flex-column-reverse"
      density="compact"
    >
      <v-list-item v-for="(rating, i) in maxRating" :key="i">
        <v-progress-linear
          :model-value="rating * 15"
          class="mx-n5"
          color="yellow-darken-3"
          height="20"
          rounded
        ></v-progress-linear>

        <template v-slot:prepend>
          <span>{{ rating }}</span>
          <v-icon class="mx-3" icon="mdi-star"></v-icon>
        </template>

        <template v-slot:append>
          <div class="rating-values">
            <span class="d-flex justify-end"> {{ rating * 224 }} </span>
          </div>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
const props = defineProps<{
  productRating: { rate: number; count: number };
}>();

const maxRating = ref(5);

// Round product rating
const roundedRating = computed(() => {
  return round(props.productRating.rate, 0.5);
});
</script>

<style scoped>
.rating-values {
  width: 25px;
}
</style>
