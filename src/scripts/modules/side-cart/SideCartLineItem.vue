<template>
  <div
    class="p-e14 leading-4 transition-opacity duration-300 bfx-product"
    :class="{'opacity-50': loading}">
    <slot name="badge"></slot>
    <div class="flex flex-no-wrap">
      <a :href="lineItem.url"
        class="block min-w-e120 min-h-e120 max-w-e120 max-h-e120 mr-e16">
        <img
          class="object-cover min-w-e120 min-h-e120 max-w-e120 max-h-e120"
          v-if="lineItem.image"
          :src="lineItem.image"
          :alt="lineItem.product.title"
          :aria-labelledby="`sidecart-${lineItem.id}-line-item`">
      </a>
      <div class="w-full flex flex-col justify-between items-start">
        <a
          :href="lineItem.url"
          class="leading-8 text-e12 font-secondary bfx-product-name notranslate"
          v-html="lineItem.product.title"
          :id="`sidecart-${lineItem.id}-line-item`">
        </a>
        <ul class="flex space-x-e8">
          <li
            class="text-e11 font-body bfx-price notranslate"
            v-for="obj in lineItem.options_with_values"
            v-show="obj.value !== 'Default Title'"
            :key="`${lineItem.id}-${obj.value}-side`">
            {{ obj.value }}
          </li>
        </ul>
         <span v-if="lineItem.selling_plan" class="text-e11 font-body block bfx-price notranslate">
      <Icon 
      name="subscription" 
      size="12px"
      class="inline-block mr-2 origin-center"/>{{state.language.subscription}}</span> 
        <span v-if="isCustomized" class="text-e10 my-2 font-body block">
          <Icon 
            :style="{color: state.settings.customizable_bg_color}"
            name="checkmark" 
            size="14px"
            class="inline-block origin-center"/>
          {{state.language.personalized}}
        </span>
        <div v-if="lineItem.product.metafields.pdp.preorder_text">
          <p class="mt-e7 mb-2 font-body font-normal text-black text-e12 leading-4"><span class="text-primary-500 font-bold font-body">Notice: </span>{{ lineItem.product.metafields.pdp.preorder_text }}</p>
        </div>
        <div :class="qtySelectorStyles">
          <label
            class="font-bold uppercase font-primary text-e12"
            :for="`sidecart-quantity-${lineItem.id}`">
            <template v-pre>
              {{ 'cart.label.quantity' | t }}:
            </template>
          </label>
          <input
            :class="inputStyles"
            type="number"
            name="quantity"
            @change="debouncedUpdateItem($event.target.value)"
            :id="`sidecart-quantity-${lineItem.id}`"
            :disabled="giftCheck"
            :value="lineItem.quantity"
            :max="maxQuantity">
        </div>
        <p class="text-red-700 font-body text-e10">{{ promoText }}</p>
        <p v-if="lineItem.message" class="text-red-700 font-bold font-body text-e14 text-center">{{ lineItem.message }}</p>
        <p class="text-e12 space-x-e8">
          <strong class="font-body bfx-price bfx-list-price">{{ lineItem.final_price / 100 | formatCurrency(2) }}</strong>
          <s
            class="font-body bfx-price bfx-original-price bfx-old-price"
            v-if="lineItem.final_price < lineItem.original_price">
            {{ lineItem.original_price / 100 | formatCurrency(2) }}
          </s>
        </p>
      </div>
      <div class="leading-0">
        <button
          class="py-e4 px-e8 md:px-e4 md:py-e4 transition--red"
          @click="onItemRemove(lineItem)"
          :aria-label="`{{ 'general.accessibility.remove_item' | t }} ${lineItem.product.title}`">
          <Icon name="close" size="10px" aria-hidden="true"></Icon>
        </button>
      </div>
    </div>
    <div class="hidden bfx-sku notranslate">{{ lineItem.sku }}</div>
    <div class="hidden bfx-product-image notranslate">{{ lineItem.image.url }}</div>
    <div class="hidden bfx-product-customData-label notranslate">variant_id</div>
    <div class="hidden bfx-product-customData-value notranslate">{{ lineItem.id }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import debounce from 'lodash/debounce';
import Icon from '../../components/Icon.vue';

/**
 * @slot badge
 * @slot promotion
 */

@Component({
  components:{ Icon},
})
export default class SideCartLineItem extends Vue {
  @Prop() readonly lineItem!: ShopifyCartItem;

  @Prop() readonly product!: ShopifyProduct;

  @Prop() readonly promoText!: string;

  @Prop() readonly onItemRemove!: (item: ShopifyCartItem) => void;

  @Prop() readonly onItemUpdate!: (update: {quantity: number; id: string}) => Promise<Error|null>;

  debouncedUpdateItem = debounce(this.updateItem, 1000);

  maxQuantity = parseInt(this.product.tags.find(tag => tag.includes('max::'))?.split('max::')[1] || '20', 10);

  loading = false;

  state = window.APPSTATE;
  
  updateItem(quantity: string) {
    if(this.lineItem.quantity === this.maxQuantity) return;
    const updatedQuantity = this.lineItem.quantity < this.maxQuantity ? parseInt(quantity, 10) : this.maxQuantity;
    this.loading = true;
    this.onItemUpdate({
      quantity: updatedQuantity,
      id: this.lineItem.id.toString()
    })
      .catch((e) => {
        // eslint-disable-next-line
        alert(e.message);
      })
      .finally(() => {
        this.loading = false;
      })
  }

  get giftCheck(){
    if(this.lineItem.properties != null) {
      for(let i = 0; i < this.lineItem.properties.length; i++){
        if(this.lineItem.properties[i].includes('_smgift')){
          return true;
        }
      }
    }
    return false;
  }

  get isCustomized() {
    if (this.lineItem.properties) {
      return this.lineItem.properties.some((elem: any) => elem[0] === 'customisationId')
    }
    return false;
  }

  get PodCheck() {
    if(this.lineItem.product.tags.includes("Printful")) {
      return true;
    }
    return false;
  }

  get inputStyles() {
    if(window.innerWidth < 650){
      return 'font-body font-bold text-e12 ml-1 transition-colors duration-300 bfx-product-qty notranslate'
    }
    return 'py-e4 px-e8 border border-gray-300 border-solid font-body font-normal text-e10 ml-e8 focus:shadow-outline hover:border-gray-500 transition-colors duration-300 bfx-product-qty notranslate'
  }

  get qtySelectorStyles() {
    if(window.innerWidth < 650){
      return 'flex items-center border-b border-bottom-black border-bottom-solid focus:shadow-outline mb-2 hover:border-bottom-gray-500 "'
    }
    return 'flex items-center'
  }

  mounted(){
    if(this.lineItem.quantity > this.maxQuantity) {
      this.loading = true;
      this.onItemUpdate({
        quantity: this.maxQuantity,
        id: this.lineItem.id.toString()
      })
        .catch((e) => {
          // eslint-disable-next-line
          alert(e.message);
        })
        .finally(() => {
          this.loading = false;
        })
    }
  }

}
</script>

<style lang="scss" scoped>
  input[type="number"] {
    width: 20px;
  }
  @media screen and (min-width: 650px) {
      input[type="number"] {
      width: 50px;
    }
  }
</style>
