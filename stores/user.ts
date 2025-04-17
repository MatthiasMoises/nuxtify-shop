import { defineStore } from "pinia";
import type { User } from "~/types/user";

interface State {
  id: number;
  currentUser: User | null;
  token: string | null;
}

export const useUserStore = defineStore('userStore', {
  state: (): State => ({
    id: 0,
    currentUser: null,
    token: null
  }),
  getters: {
    isAuthenticated: (state) => state.token !== null,
    userToken: (state) => state.token
  },
  actions: {
    async registerUser(newUser: User) {
      const runtimeConfig = useRuntimeConfig()

      try {
        const response = await fetch(`${runtimeConfig.public.apiBase}/users`, {
          method: 'POST',
          body: JSON.stringify(newUser)
        })

        const data = response.json()

        return data
      } catch (error) {
        console.error(error)
        return false
      }
    },
    async updateUser(userData: { id: number, username: string, email: string, password: string }) {
      const runtimeConfig = useRuntimeConfig()

      try {
        const response = await fetch(`${runtimeConfig.public.apiBase}/users/${userData.id}`, {
          method: 'PUT',
          body: JSON.stringify(userData)
        })

        const data = response.json()

        return data
      } catch (error) {
        console.error(error)
        return false
      }
    },
    async deleteUser(userId: number) {
      const runtimeConfig = useRuntimeConfig()

      try {
        const response = await fetch(`${runtimeConfig.public.apiBase}/users/${userId}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          this.logoutUser()
          return true
        }
      } catch (error) {
        console.error(error)
        return false
      }
    },
    async loginUser(username: string, password: string) {
      const runtimeConfig = useRuntimeConfig()

      try {
        const response = await fetch(`${runtimeConfig.public.apiBase}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: username,
            password: password
          })
        })

        const data = await response.json()

        // Fake user data, because of API restrictions
        const user: User = {
          id: 1,
          email: "john@gmail.com",
          username: username,
          password: password,
          name: {
            firstname: "john",
            lastname: "doe",
          },
          address: {
            city: "kilcoole",
            street: "new road",
            number: 7682,
            zipcode: "12926-3874",
            geolocation: {
              lat: "-37.3159",
              long: "81.1496"
            }
          },
          phone: "1-570-236-7033"
        }

        this.currentUser = user
        this.token = data.token
        return true
      } catch (error) {
        console.error(error)
        return false
      }
    },
    logoutUser() {
      this.currentUser = null
      this.token = null
    }
  }
})