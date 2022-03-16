<template>
  <section class="px-0" v-if="product.metafields.pdp.complete_looks.length > 0">

    <h3 class="font-primary font-bold uppercase text-center md:text-left text-megamenu_top p-5 w-full text-white mt-4 md:mt-10 mb-4 bg-util-sale tracking-header">{{ state.language.complete_look }}</h3>

    <CompleteLook :lookProduct="lookProduct" v-for="lookProduct in product.metafields.pdp.complete_looks" :key="lookProduct.title"></CompleteLook>

  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import AffirmPromo from '../../components/AffirmPromo.vue';
import Icon from '../../components/Icon.vue';
import CompleteLook from './CompleteLook.vue';
import BtnPrimary from '../../components/BtnPrimary';
import Dropdown from '../../components/Dropdown.vue';
import { moneyWithoutTrailingZeros } from '../../lib/util';
import { ProductProvider } from './ProductProvider';
import BaseProduct from '../../lib/BaseProduct/BaseProduct';
import cart from '../../lib/cart';

@Component({
  components: { AffirmPromo, ProductProvider, BtnPrimary, Dropdown, Icon, CompleteLook },
  filters: {
    moneyWithoutTrailingZeros,
  },
})
export default class ProductCompleteLook extends Vue {
  @Prop() readonly title!: string;

  @Prop() readonly selectedVariant!: ShopifyVariant;

  @Prop() readonly product!: ShopifyProduct;

  @Prop({ default: () => () => {} }) readonly onProductChange!: Function;

  state = window.APPSTATE;

  initialValues = [];

  completeLooks = this.product.metafields.pdp.complete_looks || []


}
</script>

<style>
  .badge-holder div:nth-child(n + 4){
    display: none;
  }
</style>