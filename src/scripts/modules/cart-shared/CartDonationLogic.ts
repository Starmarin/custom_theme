import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import cart from '../../lib/cart';

@Component({
})
export default class CartDonationLogic extends Vue {
  @Prop() readonly cart!: ShopifyCart;

  donationDrawerOpen = false;

  donationProduct: null|ShopifyProduct = null;

  donationError: null|Error = null;

  readonly settings = __BVA__.sidecart_settings;
  
  get donationComplete () {
    return this.cart.items.some((item) => item.handle === __BVA__.sidecart_settings.cart_donation_product);
  }
  
  mounted() {
    if(this.settings.cart_donation_product) {
      fetch(`/products/${this.settings.cart_donation_product}.json`)
        .then(res => res.json())
        .then((product) => {
          this.donationProduct = product?.product
        })
        .catch((e) => {
          this.donationError = e
        })
    }
  }

  addItem(variant: ShopifyVariant) {
    return cart.add(variant);
  }
}