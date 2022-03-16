<template>
  <div 
    class="gwp-offer relative border-2 border-transparent hover:border-primary-500">
    <transition name="fade" mode="out-in">
      <slot>
        <div @click="_onClick" class="bfx-price-container">
          <label 
            :for="`offer-${uid}`" 
            class="gwp-offer__headline mb-e8 font-secondary font-bold text-e14 flex items-center justify-center bfx-price"
            v-html="gwpCurrencyReplace(title)">
          </label>
          <img 
            class="mx-auto"
            :src="image" 
            :alt="imageAlt">
          <input 
            class="gwp__checkbox"
            type="checkbox" 
            @change="freeShipToggle"
            :checked="selected"
            @input.prevent="() => {}"
            :id="`offer-${uid}`">
        </div>
      </slot>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class GiftWithPurchaseOffer extends Vue {
  @Prop() readonly image!: string;
  
  @Prop() readonly title!: string;

  @Prop() readonly imageAlt!: string;
  
  @Prop() readonly selected!: boolean;

  @Prop() readonly onClick!: () => Promise<any>;

  @Prop() readonly uid!: string;

  @Prop() readonly type!: string;

  loading = false;

  gwpCurrencyReplace(text: string) {
    let currency = window.APPSTATE.current_currency;
    if (currency === 'GBP') {
      return text.replaceAll('$','£' )
    } 
    if (currency === 'EUR') {
      return text.replaceAll('$','€' )
    } 
    return text;
  }	

  _onClick() {
    this.loading = true;
    this.onClick()
      .finally(() => {
        this.loading = false;
      })
  }

  freeShipToggle(){
    if(this.type === 'free_ship'){
      window.APPSTATE.free_shipping_visible = !window.APPSTATE.free_shipping_visible;
    }
  }
}
</script>

<style scoped lang="scss">
  input[type="checkbox"].gwp__checkbox {
    margin: 0;
    position: absolute; 
    bottom: 20px;
    right: 20px;
    width: 16px;
    height: 16px;
    
    @apply absolute m-0 border-gray-200;

    &:checked {
      @apply bg-red-500;
    }
  }

  .gwp-offer:hover input[type="checkbox"].gwp__checkbox {
    @apply bg-red-500;
  }

  .gwp-offer__headline {
    min-height: 38px;
  }
</style>