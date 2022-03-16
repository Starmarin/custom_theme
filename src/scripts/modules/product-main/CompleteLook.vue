<template>
  <div class="flex flex-wrap justify-between md:flex-no-wrap mb-4 mx-4 md:mx-0 md:border md:border-gray-breadcrumbs">
    <a :href="lookProduct.url" :aria-label="lookProduct.title" class="relative mt-p10 md:mt-0" style="left: calc(100% - 40px)">
      <Icon name="look-arrow" size="40px" class="bg-transparent md:bg-gray-700 text-black md:text-white p-2"></Icon>
    </a>
    <a :href="lookProduct.url" class="flex cursor-pointer w-p30 md:w-1/4 -ml-10">
      <img :alt="lookProduct.title" class="w-full object-contain" :src="lookProduct.featured_image" />
    </a>
    <div class="w-p70 md:w-3/4 px-7 py-5 md:py-10 bg-gray-breadcrumbs"> 
      <a :href="lookProduct.url" class="cursor-pointer">
        <p class="font-secondary font-bold text-md text-black w-3/4 md:w-full">{{ lookProduct.title }}</p>
      </a>
      <p class="inline-block">
        <span class="font-body font-bold text-sm bfx-price" :class="priceClass">{{ selectedLookVariant.price | moneyWithoutTrailingZeros }}</span>
        <s class="ml-2 inline-block text-gray-300 font-body font-bold text-sm bfx-price bfx-original-price" v-show="selectedLookVariant.price < selectedLookVariant.compare_at_price">{{ selectedLookVariant.compare_at_price | moneyWithoutTrailingZeros }}</s>
      </p>
      <div class="hidden md:flex flex-wrap justify-start md:flex-no-wrap w-full mt-4">
        <Dropdown 
          v-if="lookProduct.variants.length > 1"
          class="accent-dark  max-w-1/2 min-w-1/2" 
          :aria-label="state.language.select_option"
          :options="lookDropdownOptions" 
          :selected="selectedValue"
          placeholder="Select size"
          @select="(value) => selectedValue = value" 
        />
        <BtnPrimary :aria-label="state.language.add_to_cart" @click="completeLookA2C(selectedValue)" :class="[lookProduct.variants.length > 1 ? 'max-w-1/2 min-w-1/2' : 'w-full']">{{ state.language.add }}</BtnPrimary>
      </div>
    </div>
    <div class="w-full flex md:hidden">
      <Dropdown 
        v-if="lookProduct.variants.length > 1"
        class="accent-dark w-full min-w-1/2" 
        :aria-label="state.language.select_option"
        :options="lookDropdownOptions" 
        :selected="selectedValue"
        @select="(value) => selectedValue = value" 
      />
      <BtnPrimary :aria-label="state.language.add_to_cart" @click="completeLookA2C(selectedValue)" class="w-full min-w-1/2">{{ state.language.add }}</BtnPrimary>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';
  import { moneyWithoutTrailingZeros } from '../../lib/util';
  import Icon from '../../components/Icon.vue';
  import BtnPrimary from '../../components/BtnPrimary';
  import Dropdown from '../../components/Dropdown.vue';
  import cart from '../../lib/cart';

  @Component({
    components: { Dropdown, Icon, BtnPrimary },
    filters: {
      moneyWithoutTrailingZeros,
    },
    props: {
      lookProduct: Object,
    }
  })

  export default class CompleteLook extends Vue {
    @Prop() lookProduct!: Record<string, any>;

    selectedValue = this.lookProduct.variants[0].id;

    state = window.APPSTATE;

    get lookDropdownOptions(){
      let dropdownOptions = [];
      let variants = this.lookProduct.variants;
      for(let i = 0; i < variants.length; i++){
        let dropdownValue = {
          "label": variants[i].title,
          "value": variants[i].id
        }
        dropdownOptions.push(dropdownValue);
      }
      return dropdownOptions;
    }

    get selectedLookVariant(){
      for(let i = 0; i < this.lookProduct.variants.length; i++){
        if(this.lookProduct.variants[i].id === this.selectedValue){
          return this.lookProduct.variants[i];
        }
      }
      return this.lookProduct.variants[0];
    }

    priceClass(){
      if(this.selectedLookVariant.price < this.selectedLookVariant.compare_at_price){
        return 'text-util-sale';
      }
      return '';
    }

    completeLookA2C(variant: number) {
      cart.add({ id: variant, quantity: 1 })
        .then(() => { 
          if (window.Cookies.get('bfx.isInternational') === 'false') {
            window.APPSTATE.cart_modal = true;
          }
        }
      );
    }

    mounted(){
    }
  }
</script>

<style></style>
