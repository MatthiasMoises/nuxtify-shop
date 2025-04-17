<template>
  <v-row
    align-content="center"
    class="d-flex justify-center align-center mb-10"
  >
    <v-col cols="12" xs="12" sm="6">
      <v-card class="mx-auto my-8 flex-1-1-100" elevation="16">
        <v-card-item>
          <v-card-title> Register </v-card-title>

          <v-card-subtitle>
            Please fill in your details to register an account
          </v-card-subtitle>
        </v-card-item>

        <v-card-text>
          <v-form @submit.prevent v-model="valid">
            <v-text-field
              type="text"
              label="Username"
              v-model="credentials.username"
              variant="outlined"
              prepend-inner-icon="mdi-account"
              :rules="rules"
            />
            <v-text-field
              type="text"
              label="Email"
              v-model="credentials.email"
              variant="outlined"
              prepend-inner-icon="mdi-email"
              :rules="rules"
              required
            />
            <v-text-field
              type="password"
              label="Password"
              v-model="credentials.password"
              variant="outlined"
              autocomplete="on"
              prepend-inner-icon="mdi-lock"
              :rules="rules"
              required
            />
            <v-text-field
              type="password"
              label="Repeat Password"
              v-model="credentials.confirmationPassword"
              variant="outlined"
              autocomplete="on"
              prepend-inner-icon="mdi-lock-alert"
              :rules="rules"
              required
            />

            <v-checkbox
              v-model="checkbox"
              :rules="[(v) => !!v || 'You must agree to continue!']"
              label="Do you agree?"
              required
            ></v-checkbox>

            <v-btn
              color="primary"
              block
              @click="handleRegister"
              :disabled="!valid"
            >
              Register
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { User } from "~/types/user";

const valid = ref(false);

const rules = reactive([
  (value: string | number) => {
    if (value) return true;

    return "You must enter a value";
  },
]);

const checkbox = ref(false);

const credentials = reactive({
  username: "",
  email: "",
  password: "",
  confirmationPassword: "",
});

const router = useRouter();

const userStore = useUserStore();

const snackbarStore = useSnackbarStore();

const handleRegister = async () => {
  if (
    !credentials.username ||
    !credentials.email ||
    !credentials.password ||
    !credentials.confirmationPassword
  )
    return;

  if (credentials.password === credentials.confirmationPassword) {
    const newUser: User = {
      id: 0,
      email: credentials.email,
      username: credentials.username,
      password: credentials.password,
    };

    const registerResult = await userStore.registerUser(newUser);

    if (registerResult) {
      router.push("/auth/login");
    }
  } else {
    snackbarStore.showSnackbar({
      message: "Passwords do not match",
      color: "red",
    });
  }
};
</script>
