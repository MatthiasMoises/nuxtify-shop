<template>
  <v-row
    align-content="center"
    class="d-flex justify-center align-center mb-10"
  >
    <v-col cols="12" xs="12" sm="6">
      <v-card class="mx-auto my-8 flex-1-1-100" elevation="16">
        <v-card-item>
          <v-card-title> My Account </v-card-title>

          <v-card-subtitle> Update your user data here </v-card-subtitle>
        </v-card-item>

        <v-card-text>
          <v-form @submit.prevent v-model="valid">
            <v-text-field
              type="text"
              label="Username"
              v-model="credentials.username"
              variant="outlined"
              :rules="rules"
            />
            <v-text-field
              type="text"
              label="Email"
              v-model="credentials.email"
              variant="outlined"
              :rules="rules"
            />
            <v-text-field
              type="password"
              label="Password"
              v-model="credentials.password"
              variant="outlined"
              autocomplete="on"
              :rules="rules"
            />

            <v-btn
              class="mb-5"
              color="primary"
              block
              @click="handleUpdate"
              :disabled="!valid"
            >
              Update
            </v-btn>

            <v-btn color="red" block @click="deleteDialog = true">
              Delete Account
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
    <UiConfirmationDialog
      :show-dialog="deleteDialog"
      @dialog-cancelled="deleteDialog = false"
      @dialog-confirmed="handleDelete"
    >
      <template #dialogTitle>Caution!</template>
      <template #dialogText
        >Do you really want to continue? This action cannot be undone!</template
      >
    </UiConfirmationDialog>
  </v-row>
</template>

<script setup lang="ts">
const valid = ref(false);

const rules = reactive([
  (value: string | number) => {
    if (value) return true;

    return "You must enter a value";
  },
]);

const credentials = reactive({
  id: 0,
  username: "",
  email: "",
  password: "",
});

const router = useRouter();

const userStore = useUserStore();

onMounted(() => {
  credentials.id = userStore.currentUser?.id ?? 0;
  credentials.username = userStore.currentUser?.username ?? "";
  credentials.email = userStore.currentUser?.email ?? "";
  credentials.password = userStore.currentUser?.password ?? "";
});

const snackbarStore = useSnackbarStore();

const handleUpdate = async () => {
  const updateResult = await userStore.updateUser(credentials);

  if (updateResult) {
    snackbarStore.showSnackbar({ message: "User updated successfully" });
  }
};

// Handle user deletion
const deleteDialog = ref(false);

const handleDelete = async () => {
  const deleteResult = await userStore.deleteUser(credentials.id);

  if (deleteResult) {
    snackbarStore.showSnackbar({ message: "User deleted successfully" });
    router.push("/");
  } else {
    snackbarStore.showSnackbar({
      message: "Error deleting user",
      color: "red",
    });
  }
};
</script>
