interface State {
  visible: boolean;
  message: string;
  color: string;
}

export const useSnackbarStore = defineStore('snackbarStore', {
  state: (): State => ({
    visible: false,
    message: '',
    color: 'green-darken-1',
  }),
  getters: {
    getMessage: (state) => state.message,
    getColor: (state) => state.color
  },
  actions: {
    showSnackbar(config: { message: string, color?: string }) {
      this.visible = true
      this.message = config.message

      if (!config.color) {
        this.color = 'green-darken-1'
      }

      setTimeout(() => {
        this.visible = false
        this.message = ''
      }, 5000);
    },
    hideSnackbar() {
      this.visible = false
      this.message = ''
      this.color = 'green-darken-1'
    },
  },
})