import cart from '../../lib/cart'

export default {
  getCart({ commit, state }: any, payload: any) {
    commit('setLoading', true)

    return cart
      .get()
      .then(data => {
        commit('refreshCart', data)
      })
  },

  updateItemQuantity({ commit, state }: any, { quantity, id }: any) {
    if (!id) {
      return null;
    }

    commit('setLoading', true);

    return cart
      .update({ quantity, id })
      .then(data => {
        if(data?.errors) {
          throw new Error(...data.errors);
        }
        commit('refreshCart', data)
      })
      .catch(err => {
        console.log(err)
      });
  },

  addToCart({ dispatch, state }: any, { id, quantity }: any) {
    const { items } = state.app.cart;

    // Adds the requested `quantity` to the current item.quantity
    const item = items.find((i: ShopifyCartItem) => i.variant_id === id);
    const totalQuantity = item ? item.quantity + quantity : quantity;

    return dispatch('updateItemQuantity', { id, quantity: totalQuantity });
  },

  async saveCartNotes ({ commit, dispatch }: any, notes = null) {
    await commit('setLoading', true);
    await cart.saveNotes(notes);
    await dispatch('getCart');
  }
}
