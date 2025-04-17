<template>
  <v-row>
    <v-col>
      <v-btn prepend-icon="mdi-chevron-left" @click="router.back()">
        Go back
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
const router = useRouter();
</script>
