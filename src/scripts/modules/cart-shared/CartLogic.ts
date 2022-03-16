import Vue from 'vue';
import Component from 'vue-class-component';
import debounce from 'lodash/debounce';
import { Prop, Watch } from 'vue-property-decorator';
import dataLayerRemove from '@/scripts/lib/dataLayerRemove';
import cart from '@/scripts/lib/cart';
import store from '../../store/cart/index';

const debouncedUpdate = debounce(function (quantity, keyId, vuexStore) {
  vuexStore.dispatch('updateItemQuantity', {
    quantity,
    id: keyId
  });
}, 450);

@Component({
  store
})
export default class CartLogic extends Vue {
  @Prop() readonly cart!: ShopifyCart;

  giftMessage = this.cart.note || '';

  giftMessageDrawerOpen = false;

  discountCode: string|null = null;

  removeItem(cartItem: ShopifyCartItem) {
    this.$store.dispatch('updateItemQuantity', {
      quantity: 0,
      id: cartItem.key,
    });
    dataLayerRemove(cartItem);
  }

  updateItemQuantity(quantity: number, key: ShopifyCartItem['key']) {
    debouncedUpdate(Number(quantity), key, this.$store);
  }

  updateNote() {
    this.giftMessageDrawerOpen = false;
    return cart.saveNotes(this.giftMessage)
  }

  goToCheckout() {
    if (window.Cookies.get('bfx.isInternational') === 'true' && window.APPSTATE.current_store !== 'eu') {
      // document.location.href = '/cart'
      // cart.checkoutRedirect(this.discountCode!)      
    } else {
      cart.checkoutRedirect(this.discountCode!)      
    }
  }

  goToCart() {
    cart.cartRedirect()
  }

  addSingleItem(id: number) {
    return cart.add({items: [{id: id.toString(), quantity: 1}]});
  }
}