<template>
  <div class="">
    <dl class="flex items-center justify-between">
      <dt
        class="text-body-md font-primary font-bold tracking-wider uppercase" 
        v-html="`{{ 'cart.general.subtotal' | t }}`"></dt>
      <dd class="text-body-md font-primary font-bold tracking-wider bfx-price bfx-total-subtotal" >{{ subtotal / 100 | formatCurrency(2) }}</dd>
    </dl>
    <div v-if="state.current_store == 'usa'" class="mb-e8 bfx-remove-element">
      <span class="klarna-pdp">
        <klarna-placement
          data-key="credit-promotion-auto-size"
          :data-purchase-amount="subtotal"
          data-locale="en-US"
        ></klarna-placement>
      </span>
    </div>
    <a
      v-if="borderfreeCheck"
      class="mb-e16 flex justify-center text-md items-center w-full bfx-checkout bg-btn-primary_main text-white uppercase tracking-wider border-2 border-transparent hover:bg-btn-primary_hover focus:bg-btn-primary_focus focus:text-gray-300 focus:border-util-focus py-3 rounded-e2"
      href="/checkout"
      v-html="`{{ 'cart.general.checkout' | t }}`">
    </a>
    <a
      v-else
      class="mb-e16 flex justify-center text-md items-center w-full bg-btn-primary_main text-white uppercase tracking-wider border-2 border-transparent hover:bg-btn-primary_hover focus:bg-btn-primary_focus focus:text-gray-300 focus:border-util-focus py-3 rounded-e2 cursor-pointer"
      @click="onCheckout"
      v-html="`{{ 'cart.general.checkout' | t }}`">
    </a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import cart from '@/scripts/lib/cart';
import { Component, Prop, Watch } from 'vue-property-decorator';
import BtnPrimary from '../../components/BtnPrimary';

@Component({
  components: {
    BtnPrimary,
  }
})
export default class CartSubtotal extends Vue {
  @Prop() readonly subtotal!: number;

  @Prop() readonly onCheckout!: () => void;

  state = window.APPSTATE;

  @Watch('subtotal')
  subtotalKlarna(){
    window.KlarnaOnsiteService = window.KlarnaOnsiteService || [];
    window.KlarnaOnsiteService.push({ eventName: 'refresh-placements' });
  }

  get borderfreeCheck(){
    if(window.Cookies.get('bfx.isInternational') === 'true' && this.state.current_store !== 'eu'){
      return true;
    }
    return false;
  }

  mounted (){
    window.KlarnaOnsiteService = window.KlarnaOnsiteService || [];
    window.KlarnaOnsiteService.push({ eventName: 'refresh-placements' });
  }
}
</script>

<style>

</style>
