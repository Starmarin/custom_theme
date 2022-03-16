<template>
  <section class="px-0 md:px-6">

    <div class="flex badge-holder">
      <div v-cloak v-if="isCustomizable" class="float-left px-4 py-1 pb-e3 md:py-2 md:pb-e7 tracking-header uppercase text-xxs md:text-xs font-bold mb-2" :style="customizableClass">{{ state.language.customizable }}</div>
      <div v-cloak v-if="isOOS" class="mr-1 float-left px-4 py-1 pb-e3 md:py-2 md:pb-e7 tracking-header uppercase text-xxs md:text-xs font-bold mb-2" :style="OOSClass">{{ state.language.out_of_stock }}</div>
      <div v-cloak v-if="isPromo" v-html="isPromo" class="mr-1 float-left px-4 py-1 pb-e3 md:py-2 md:pb-e7 tracking-header uppercase text-xxs md:text-xs font-bold mb-2" :style="promoClass">{{ state.language.promo }}</div>
      <div v-cloak v-if="isPreorder" class="mr-1 float-left px-4 py-1 pb-e3 md:py-2 md:pb-e7 tracking-header uppercase text-xxs md:text-xs font-bold mb-2" :style="preorderClass">{{ state.language.preorder }}</div>
      <div v-cloak v-if="isBackorder" class="mr-1 float-left px-4 py-1 pb-e3 md:py-2 md:pb-e7 tracking-header uppercase text-xxs md:text-xs font-bold mb-2" :style="backorderClass">{{ state.language.backorder }}</div>
      <div v-cloak v-if="onSale" class="mr-1 float-left px-4 py-1 pb-e3 md:py-2 md:pb-e7 tracking-header uppercase text-xxs md:text-xs font-bold mb-2" :style="saleClass">{{ state.language.sale }}</div>
      <div v-cloak v-if="isLimited" class="mr-1 float-left px-4 py-1 pb-e3 md:py-2 md:pb-e7 tracking-header uppercase text-xxs md:text-xs font-bold mb-2" :style="limitedClass">{{ state.language.limited }}</div>
      <div v-cloak v-if="isBestseller" class="mr-1 float-left px-4 py-1 pb-e3 md:py-2 md:pb-e7 tracking-header uppercase text-xxs md:text-xs font-bold mb-2" :style="bestsellerClass">{{ state.language.bestseller }}</div>
      <div v-cloak v-if="isNew" class="mr-1 float-left px-4 py-1 pb-e3 md:py-2 md:pb-e7 tracking-header uppercase text-xxs md:text-xs font-bold mb-2" :style="newClass">{{ state.language.new }}</div>
      <div v-cloak v-if="isYouth" class="float-left px-4 py-1 pb-e3 md:py-2 md:pb-e7 tracking-header uppercase text-xxs md:text-xs font-bold mb-2" :style="youthClass">{{ state.language.youth }}</div>
    </div>

    <h2 class="pdp__title">{{ product.title }}</h2>

    <ProductProvider v-if="!isGiftCard">
      <ProductBriefValueProps class="md:flex px-e12" />
    </ProductProvider>

    <div class="mt-2">
      <p class="inline-block" v-if="selectedVariant"> 
        <span class="font-body font-semibold text-megamenu_top md:text-hero_price bfx-price" :class="{ 'text-util-sale': selectedVariant.price < selectedVariant.compare_at_price }">{{ selectedVariant.price + crossProductPrice | moneyWithoutTrailingZeros }}</span>
        <s class="ml-2 inline-block text-gray-discount font-body font-semibold text-megamenu_top md:text-hero_price bfx-price bfx-original-price" v-show="selectedVariant.price < selectedVariant.compare_at_price">{{ selectedVariant.compare_at_price + crossProductPrice | moneyWithoutTrailingZeros }}</s>
      </p>
    </div>
    
    <div v-if="state.current_store == 'usa' && !isGiftCard" class="klarna-pdp mb-4 bfx-remove-element">
      <klarna-placement
        data-key="credit-promotion-auto-size"
        :data-purchase-amount="selectedVariant.price"
        data-locale="en-US"
      ></klarna-placement>
    </div>

    <div class="mt-4" v-if="product.metafields.pdp.enable_promotion == 1">
      <div class="flex w-full">
        <div class="w-1/5 p-2 bg-primary-700">
          <p class="text-white font-primary font-bold uppercase text-xxs w-7 border-b-2 border-white tracking-wider">{{ state.language.special_offer }}</p>
        </div>
        <div class="w-4/5 flex justify-center items-center text-primary-700 font-body font-semibold text-xs tracking-tight border border-primary-700 capitalize">{{ product.metafields.pdp.promo_text }}</div>
      </div>
    </div>

  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import AffirmPromo from '../../components/AffirmPromo.vue';
import { moneyWithoutTrailingZeros } from '../../lib/util';
import ProductBriefValueProps from './ProductBriefValueProps.vue';
import { ProductProvider } from './ProductProvider';
import BaseProduct from '../../lib/BaseProduct/BaseProduct';

@Component({
  components: { AffirmPromo, ProductProvider, ProductBriefValueProps },
  filters: {
    moneyWithoutTrailingZeros,
  },
})
export default class ProductTitlePrice extends Vue {
  @Prop() readonly title!: string;

  @Prop() readonly subTitle!: string;

  @Prop() readonly selectedVariant!: ShopifyVariant;

  @Prop() readonly product!: ShopifyProduct;

  @Prop() readonly crossProductPrice!: number;

  @Prop({ default: () => () => {} }) readonly onProductChange!: Function;

  state = window.APPSTATE;

  get isOOS() {
    return !this.product.available;
  }

  get onSale() {
    if (!this.selectedVariant) return null;
    return (this.selectedVariant.compare_at_price || 0) > this.selectedVariant.price;
  }

  get isNew() {
    return this.product.tags.includes('new');
  }

  get isLimited() {
    return this.product.tags.includes('limited');
  }

  get vendorBadgeImageUrl() {
    for (let i = 0; i < this.product.tags.length; i++){
      if (this.product.tags[i].includes('vendor:')) {
        return 'https://cdn.shopify.com/s/files/1/0506/4409/1049/files/vendor_' + this.product.tags[i].split(":")[1] + '.png';
      }
    }
    return false;
  }

  get isPromo() {
    for (let i = 0; i < this.product.tags.length; i++){
      if (this.product.tags[i].includes('promo:')) {
        return this.product.tags[i].split(":")[1];
      }
    }
    return false;
  }

  get isGiftCard() {
    return this.product.type === "Gift Cards";
  }


  get isPreorder() {
    return this.product.tags.includes('preorder');
  }

  get isBackorder() {
    return this.product.tags.includes('backorder');
  }

  get isBestseller() {
    return this.product.tags.includes('bestseller');
  }

  get isYouth() {
    return this.product.tags.includes('youth');
  }

  get isCustomizable() {
    return this.product.metafields.pdp.is_customizable;
  }

  get OOSClass() {
    return "color:" + this.state.settings.oos_text_color + "; background-color:" + this.state.settings.oos_bg_color + ";";
  }

  get promoClass() {
    return "color:" + this.state.settings.promo_text_color + "; background-color:" + this.state.settings.promo_bg_color + ";";
  }

  get preorderClass() {
    return "color:" + this.state.settings.preorder_text_color + "; background-color:" + this.state.settings.preorder_bg_color + ";";
  }

  get backorderClass() {
    return "color:" + this.state.settings.backorder_text_color + "; background-color:" + this.state.settings.backorder_bg_color + ";";
  }

  get saleClass() {
    return "color:" + this.state.settings.sale_text_color + "; background-color:" + this.state.settings.sale_bg_color + ";";
  }

  get limitedClass() {
    return "color:" + this.state.settings.limited_text_color + "; background-color:" + this.state.settings.limited_bg_color + ";";
  }

  get bestsellerClass() {
    return "color:" + this.state.settings.bestseller_text_color + "; background-color:" + this.state.settings.bestseller_bg_color + ";";
  }

  get newClass() {
    return "color:" + this.state.settings.new_text_color + "; background-color:" + this.state.settings.new_bg_color + ";";
  }

  get youthClass() {
    return "color:" + this.state.settings.youth_text_color + "; background-color:" + this.state.settings.youth_bg_color + ";";
  }

  get customizableClass() {
    return "color:" + this.state.settings.customizable_text_color + "; background-color:" + this.state.settings.customizable_bg_color + ";";
  }

  mounted(){
    window.KlarnaOnsiteService = window.KlarnaOnsiteService || [];
    window.KlarnaOnsiteService.push({ eventName: 'refresh-placements' });
  }

}
</script>

<style>
  .badge-holder div:nth-child(n + 4){
    display: none;
  }
</style>