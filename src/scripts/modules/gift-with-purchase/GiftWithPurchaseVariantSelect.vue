<template>
  <transition name="fade" mode="out-in">
    <div v-if="!loading">
      <template v-for="(optionSet, index) in product.optionsWithValues">
        <template v-if="selectedOptions.length === index">
          <p 
            :key="optionSet.name"
            class="mb-e8 font-primary font-bold text-e14 bg-white">
            <template v-pre>{{ 'cart.gift_with_purchase.variant_options_select' | t }}</template> {{ optionSet.name }}
          </p>
          <div 
            class="bg-white ratio ro-1"
            :key="optionSet.name + 'grid'">
            <div class="gwp-vselect__grid grid grid-flow-row grid-cols-3 grid-rows-3 gap-1 absolute w-full h-full">
              <template v-for="value in optionSet.values">
                <VariantSwatch 
                  v-if="/color/i.test(optionSet.name)"
                  :color="value"
                  :key="value"
                  class="w-full h-full min-w-full min-h-full"
                  :disabled="!getVariantAvailabilityByOptions(product.variants, [...selectedOptions, value])"
                  @click="selectedOptions.push(value)" />
                <button 
                  v-else
                  class="py-e4 px-e4 font-body text-e12 flex justify-center items-center bg-gray-200"
                  style="min-width: calc(33.33% - 2px); min-height: 42px;"
                  :key="value"
                  :disabled="!getVariantAvailabilityByOptions(product.variants, [...selectedOptions, value])"
                  @click="selectedOptions.push(value)">
                  {{ value }}
                </button>
              </template>
            </div>
          </div>
        </template>
      </template>
    </div>
    <div v-else>
      <p 
        class="mb-e8 font-primary font-bold text-e14">
        <template v-pre>{{ 'cart.gift_with_purchase.loading' | t }}</template>
      </p>
      <div  
        class="ratio ro-1 flex justify-center items-center min-h-full">
        <img class="absolute" src="{{ 'loader.gif' | asset_img_url: 'master' }}" alt="" v-pre>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import VariantSwatch from '../../components/VariantSwatch.vue';
import { getVariantAvailabilityByOptions } from '../../lib/util';

@Component({
  components: { VariantSwatch }
})
export default class GiftWithPurchaseVariantSelect extends Vue {
  @Prop() readonly product!: ShopifyProduct;

  @Prop() readonly onComplete!: (options: string[]) => Promise<any>;

  loading = false;

  selectedOptions = [];

  getVariantAvailabilityByOptions = getVariantAvailabilityByOptions;

  _onComplete() {
    this.loading = true;
    this.onComplete(this.selectedOptions)
      .finally(() => {
        this.loading = false;
      })
  }

  @Watch('selectedOptions')
  onSelectedOptionsChange (newOptions: string[]) {
    if(newOptions.length === this.product.optionsWithValues.length) {
      this._onComplete();
    }
  }
}
</script>

<style scoped lang="scss">
  button[disabled] {
    text-decoration-line: line-through;
  }

  .gwp-vselect__grid {
    grid-template-rows: repeat(3, minmax(56px, 1fr));
  }
</style>