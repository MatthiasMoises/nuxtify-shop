<template>
  <v-row
    align-content="center"
    class="d-flex justify-center align-center mb-10"
  >
    <v-col cols="12" xs="12" sm="6">
      <v-card class="mx-auto my-8 flex-1-1-100" elevation="16">
        <v-card-item>
          <v-card-title> Login </v-card-title>

          <v-card-subtitle>
            Please log in using your credentials
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

            <v-btn
              color="primary"
              block
              @click="handleLogin"
              :disabled="!valid"
            >
              Login
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
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
  username: "",
  password: "",
});

const router = useRouter();

const userStore = useUserStore();

// Check if regular login or to place an order

const route = useRoute();

const queryParams = route.query.process;

console.log(queryParams);

const handleLogin = async () => {
  if (!credentials.username || !credentials.password) return;

  const loginValid = await userStore.loginUser(
    credentials.username,
    credentials.password
  );
  if (loginValid) {
    if (queryParams && queryParams === "checkout") {
      router.push(`/${queryParams}`);
    } else {
      router.push("/");
    }
  }
};
</script>
