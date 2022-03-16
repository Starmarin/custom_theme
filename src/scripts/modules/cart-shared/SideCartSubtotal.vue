<template>
  <div class="bfx-minicart-container">
    <dl class="flex items-center justify-between">
      <dt 
        class="text-body-md font-primary font-bold tracking-wider uppercase bfx-price-container" 
        v-html="`{{ 'cart.general.subtotal' | t }}`"></dt>
      <dd class="text-body-md font-primary font-bold tracking-wider bfx-minicart-total bfx-price" >{{ subtotal / 100 | formatCurrency(2) }}</dd>
    </dl>
    <div v-if="state.current_store == 'usa'" class="mb-e8 bfx-remove-element">
      <span class="klarna-sidecart">
        <klarna-placement
          data-key="credit-promotion-auto-size"
          :data-purchase-amount="subtotal"
          data-locale="en-US"
        ></klarna-placement>
      </span>
    </div>
    <BtnPrimary 
      class="mb-e16 w-full"
      @click="onCheckout"
      v-html="`{{ 'cart.general.checkout' | t }}`"></BtnPrimary>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
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

    mounted (){
      window.KlarnaOnsiteService = window.KlarnaOnsiteService || [];
      window.KlarnaOnsiteService.push({ eventName: 'refresh-placements' });
    }

  }
</script>

<style>

</style>