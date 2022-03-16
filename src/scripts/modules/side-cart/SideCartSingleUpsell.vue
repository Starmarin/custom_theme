<template>
  <section class="text-0">
    <header class="relative">
      <h1 
        v-if="heading"
        class="w-5/6 mx-auto font-primary tracking-wider text-e14 leading-4 mb-e16 font-bold">
        {{ heading }}
      </h1>
      <button 
        class="absolute right-0 top-0 transition--red focus:shadow-outline" 
        @click="onClose"
        :aria-label="`{{ 'general.modal.close' | t }}`">
        <Icon name="close" aria-hidden="true" size="12px"></Icon>
      </button>
    </header>
    <div class="flex max-w-e350 mx-auto">
      <img 
        class="w-p28 h-e100 object-contain"
        :src="product.featured_media.src" 
        :alt="product.featured_media.alt" />
      <div class="py-e20 px-e16 text-left bfx-price-container">
        <h2 class=" font-secondary text-e14 mb-e4">{{ product.title }}</h2>
        <strong 
          class="font-body text-e15 bfx-price"
          :aria-label="`{{ 'cart.label.price' | t }}`">{{ selectedVariant.price / 100 | formatCurrency(2) }}</strong>
        <s 
          class="font-body text-e15 text-gray-300 ml-e8 bfx-price"
          :aria-label="`{{ 'products.product.regular_price' | t }}`" 
          v-if="selectedVariant.compare_at_price > selectedVariant.price">
          {{ selectedVariant.compare_at_price / 100 | formatCurrency(2)  }}
        </s>
      </div>
    </div>
    <div class="flex max-w-e350 mx-auto">
      <Dropdown 
        class="single-upsell__dropdown w-1/2 min-w-1/2 accent-dark focus:shadow-outline"
        v-if="!product.has_only_default_variant"
        :options="variantsToDropdownOptions(product.variants)"
        :selected="selectedVariant.option1"
        @select="selectVariant" />
      <AsyncButton 
        class="w-1/2 min-w-1/2 async--primary"
        :promise="loadingPromise"
        @click="loadingPromise = onSubmit(selectedVariant.id)" >
        <span v-pre>{{ 'products.product.add' | t }}</span>
      </AsyncButton>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import AsyncButton from '../../components/AsyncButton.vue';
import Dropdown from '../../components/Dropdown.vue';
import Icon from '../../components/Icon.vue';
import { getVariantsByOptions } from '../../lib/util';

@Component({
  components: { AsyncButton, Dropdown, Icon }
})
export default class SideCartSingleUpsell extends Vue {
  @Prop() readonly product!: ShopifyProduct;

  @Prop() readonly heading!: string;

  @Prop() readonly onSubmit!: (id: number) => Promise<any>;
  
  @Prop() readonly onClose!: () => unknown;

  selectedVariant: ShopifyVariant = this.product.selected_or_first_available_variant;

  loadingPromise: null|Promise<any> = null;

  selectVariant(option: any) {
    this.selectedVariant = getVariantsByOptions(this.product.variants, [option])[0];
  }

  variantsToDropdownOptions (variants: ShopifyVariant[]) {
    return variants
      .filter(v => v.available)
      .map(v => ({
        label: v.option1,
        value: v.option1
      }))
  }
}
</script>

<style lang="scss">
  .single-upsell__dropdown .options {
    display: none;
    top: inherit;
    bottom: calc(100% - 2px);
  }

  .single-upsell__dropdown.is-open .options {
    display: block; 
  }
</style>