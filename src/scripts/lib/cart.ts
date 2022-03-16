import Vue from 'vue';
import dataLayerAdd from './dataLayerAdd';

class Cart {
  async get () {
    const data = await fetch(`/cart?view=json&cache=${Date.now()}`)
    const cart = await data.json();
    await this.updateCart(cart);
    return cart;
  }

  async updateCart(cart: ShopifyCart) {
    Vue.set(window.APPSTATE, 'cart', cart);
    return window.APPSTATE.cart
  }

  async saveNotes(notes: string|null = null) {
    const response = await fetch('/cart/update.js', {
      method: 'POST',
      body: JSON.stringify({ note: notes }),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const cart = await response.json()
    if (cart.status) {
      window.APPSTATE.cart_errors = cart;
      this.onError(cart);
    }
    return this.get();
  }

  onError(error: BVAGlobalState['cart_errors']) {
    console.log(error?.description);
  }

  async update(data: any) {
    try {
      const response = await fetch('/cart/change.js', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      let cart: any = await response.json()
      if (cart.status) {
        window.APPSTATE.cart_errors = cart;
        this.onError(cart);
      }
      return this.get();
    } catch (error) {
      console.log(error)
      return this.get()
    }
  }


  async checkoutRedirect(discountCode?: string) {
    let finalUrl = '/checkout';
    try {
      let state = window.APPSTATE;
      let languageText = '';
      if (state.current_language !== state.primary_language) {
        languageText = '/' + state.current_language
      }
      finalUrl = languageText + '/checkout';
    } catch (error) {
      finalUrl = '/checkout';
      console.log(error);
    }

    if(discountCode) {
      finalUrl += `?discount=${discountCode}`;
    }

    let panel = document.querySelector(".panel") as HTMLElement;

    window.location.href = finalUrl;
  }

  async cartRedirect() {
    let finalUrl = '/cart';
    try {
      let state = window.APPSTATE;
      let languageText = '';
      if (state.current_language !== state.primary_language) {
        languageText = '/' + state.current_language
      }
      finalUrl = languageText + '/cart';
    } catch (error) {
      finalUrl = '/cart';
      console.log(error);
    }

    window.location.href = finalUrl;
  }

  /**
   * Adds one or multiple variants to the cart
   *
   * @param {Array} variants [{id: <id>, quantity: <Number>}]
   * @returns {Promise} Resolves with the line items object
   */
  async add (data: any) {
    const response = await fetch('/cart/add.js', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const latestItem = await response.json();
    if (latestItem.status) {
      window.APPSTATE.cart_errors = latestItem;
      this.onError(latestItem);
    }
    await this.get();
    if (!document.location.href.includes('/cart')) {
      if (window.Cookies.get('bfx.isInternational') === 'false') {
        window.APPSTATE.cart_modal = true;
      }
    }
    dataLayerAdd(latestItem, data);
    return window.APPSTATE.cart;
  }
}

export default new Cart()
