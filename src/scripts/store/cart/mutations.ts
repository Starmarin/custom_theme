export default {
  setLoading (state: any, isLoading: boolean) {
    state.loading = isLoading
  },
  refreshCart (state: any, data: any) {
    state.loading = false

    if (data.errors) {
      state.app.cart.errors = data.errors
    } else {
      state.app.cart = data
    }
  },
}
