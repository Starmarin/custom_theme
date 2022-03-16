<template>
  <section class="px-0" v-if="product.metafields.pdp.cross_products.cross_product_1">

    <div class="flex items-center mt-6 md:mt-4">
      <h3 v-if="product.metafields.pdp.cross_section_title" class="font-primary font-bold uppercase text-left text-megamenu_sub w-full text-black tracking-wider">{{ product.metafields.pdp.cross_section_title }}</h3>
      <a v-if="product.metafields.pdp.cross_shop_all_text && product.metafields.pdp.cross_shop_all_collection" class="font-primary font-bold uppercase text-xs text-primary-500 w-full text-right underline hover:no-underline tracking-wider" :href="'/collections/' + product.metafields.pdp.cross_shop_all_collection">{{ product.metafields.pdp.cross_shop_all_text }}</a>
    </div>

    <div class="flex w-full justify-between mt-4">
      <template v-for="(csProduct, csName, crossIndex) in product.metafields.pdp.cross_products">
        <div class="flex flex-col w-cs" v-if="crossIndex < 3" :key="csProduct.title">
          <img class="w-full object-contain" :src="csProduct.featured_image" />
          <p class="font-secondary font-bold text-xs text-black mt-2">{{ csProduct.title }}</p>
          <button 
            :class="activeCrossSell(csProduct.variants[0].id)" 
            tabindex="0"
            :aria-current="!!activeCrossSell(csProduct.variants[0].id)" 
            @click="selectCrossSell(csProduct.variants[0].id, csProduct.variants[0].price)" 
            class="w-full mt-4 border border-black rounded-e2 p-2 cursor-pointer overflow-hidden focus:border-util-focus"
          >
            <div class="flex justify-between w-full cs-standard">
              <span class="font-primary font-bold uppercase text-xs tracking-wider">+ {{ state.language.add }}</span>
              <span class="font-body font-bold text-xs bfx-price">{{ csProduct.variants[0].price | moneyWithoutTrailingZeros }}</span>
            </div>
            <div class="hidden justify-center items-center w-full cs-added">
              <Icon name="checkmark" size="15px" class="text-white mr-1"></Icon>
              <span class="font-primary font-bold uppercase text-xs text-white tracking-wider">{{ state.language.added }}</span>
            </div>
          </button>
        </div>
      </template>
    </div>

    <BtnPrimary id="a2c_btn" @click="crossProductA2C()" class="w-full mt-4 md:mt-6">{{ addToCartStates.preorder ? state.language.preorder : addToCartStates.backorder ? state.language.backorder : state.language.add_to_cart }}</BtnPrimary>        
    <BtnSecondary v-if="product.metafields.pdp.enable_buy_it_now" @click="crossProductBuyNow()" class="w-full h-e50">{{ state.language.buy_now }}</BtnSecondary>        

  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import AffirmPromo from '../../components/AffirmPromo.vue';
import Icon from '../../components/Icon.vue';
import BtnPrimary from '../../components/BtnPrimary';
import BtnSecondary from '../../components/BtnSecondary';
import Dropdown from '../../components/Dropdown.vue';
import { moneyWithoutTrailingZeros } from '../../lib/util';
import { ProductProvider } from './ProductProvider';
import BaseProduct from '../../lib/BaseProduct/BaseProduct';
import cart from '../../lib/cart';

@Component({
  components: { AffirmPromo, ProductProvider, BtnPrimary, BtnSecondary, Dropdown, Icon },
  filters: {
    moneyWithoutTrailingZeros,
  },
})
export default class ProductCrossSells extends Vue {
  @Prop() readonly title!: string;

  @Prop() readonly subTitle!: string;

  @Prop() readonly selectedVariant!: ShopifyVariant;

  @Prop() readonly addToCartStates!: Record<'normal' | 'outOfStock' | 'unavailable' | 'preorder' | 'backorder', boolean>;

  @Prop() readonly product!: ShopifyProduct;

  @Prop() readonly quantity!: number;

  @Prop() readonly setCrossProductPrice!: Function;

  @Prop() readonly crossProductPrice!: number;

  @Prop({ default: () => () => {} }) readonly onProductChange!: Function;

  state = window.APPSTATE;

  pdpState = window.pdp;

  selectedCrossSell = 0;

  crossProductA2C() {
    if(!this.selectedVariant) return;
    if(this.selectedCrossSell !== 0){
      let cartData = 
      { 
        items: [
          {
            id: this.selectedVariant.id,
            quantity: this.quantity
          },
          {
            id: this.selectedCrossSell,
            quantity: 1
          }
        ]
      };
      cart.add(cartData)
        .then(() => { 
          if (window.Cookies.get('bfx.isInternational') === 'false') {
            window.APPSTATE.cart_modal = true;
          }
        }
      );
    }else{
      cart.add({ id: this.selectedVariant.id, quantity: this.quantity })
        .then(() => { 
          if (window.Cookies.get('bfx.isInternational') === 'false') {
            window.APPSTATE.cart_modal = true;
          }
        }
      );
    }
  }

  crossProductBuyNow() {
    if(!this.selectedVariant) return;
    if(this.selectedCrossSell !== 0){
      let cartData = 
      {
        'items': [
          {
            'id': this.selectedVariant.id,
            'quantity': this.quantity
          },
          {
            'id': this.selectedCrossSell,
            'quantity': 1
          }
        ]
      };
      cart.add(cartData);
      cart.checkoutRedirect();
    }else{
      cart.add({ id: this.selectedVariant.id, quantity: this.quantity });
      cart.checkoutRedirect();
    }
  }

  selectCrossSell(variant_id: number, variant_price: number){
    if(this.selectedCrossSell === variant_id){
      this.selectedCrossSell = 0;
      // this.setCrossProductPrice(0);
    }else {
      this.selectedCrossSell = variant_id;
      // this.setCrossProductPrice(variant_price);
    }
  }

  activeCrossSell(variant_id: number){
    if(variant_id === this.selectedCrossSell){
      return 'cs-active';
    }
    return '';
  }

}
</script>

<style>
  .badge-holder div:nth-child(n + 4){
    display: none;
  }
</style>