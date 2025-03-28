import { defineStore } from "pinia";

export const useUserStore = defineStore('userStore', {
  state: () => ({
    username: '',
    authenticated: false
  }),
  getters: {
    isAuthenticated: (state) => state.authenticated
  },
  actions: {

  }
})