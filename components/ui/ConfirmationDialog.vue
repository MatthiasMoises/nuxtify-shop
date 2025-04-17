<template>
  <div class="text-center pa-4">
    <v-dialog v-model="props.showDialog" width="auto">
      <v-card>
        <v-card-title>
          <slot name="dialogTitle" />
        </v-card-title>

        <v-card-text>
          <slot name="dialogText" />
        </v-card-text>

        <v-card-actions>
          <v-btn class="ms-auto" text="Cancel" @click="handleCancel" />
          <v-btn class="ms-auto" text="Ok" @click="handleConfirm" />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  showDialog: boolean;
}>();

const emit = defineEmits(["dialogConfirmed", "dialogCancelled"]);

const handleConfirm = () => {
  emit("dialogConfirmed");
};

const handleCancel = () => {
  emit("dialogCancelled");
};
</script>
