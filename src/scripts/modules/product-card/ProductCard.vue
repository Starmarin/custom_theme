<template>
  <div class="">

    <div class="product-card relative sm:transition ease-in-out duration-500 bg-white max-w-e180 md:max-w-e250 min-w-e180 md:min-w-e250">
      <div>
        <a :href="product.url + '?variant=' + selectedVariant.id" class="block ratio ro-78 w-full h-e180 md:h-e300 bg-gray-100 border border-transparent focus:border-primary-500">
          <img v-cloak v-show="selectedVariant && currentImage" :class="[product.media.length > 1 ? 'card-primary' : '']" 
          class="swiper-lazy lazy absolute transition-opacity duration-200 inset-0 w-full h-full object-contain object-position-center pt-5 card-image" :data-src="[currentImage.src !== null ? imageSized(currentImage.src, '_600x600.$1', '_1000x1000.$1') : imageSized(product.featured_media.src, '_600x600.$1', '_1000x1000.$1')]" :alt="product.title">
          <img v-if="product.media.length > 1" :alt="product.title"  :data-src="imageSized(activeImage, '_600x600.$1', '_1000x1000.$1')" class="swiper-lazy lazy absolute transition-opacity duration-200 inset-0 w-full h-full object-contain object-position-center pt-5 card-image card-hover opacity-0">
          <div v-cloak v-if="isOOS" class="ml-1 mt-1 float-left px-4 py-1 md:py-2 tracking-header uppercase text-xxs md:text-xs font-bold" :style="OOSClass">{{ state.language.out_of_stock }}</div>
          <div v-cloak v-if="isCustomizable" class="ml-1 mt-1 float-left px-4 py-1 md:py-2 tracking-header uppercase text-xxs md:text-xs font-bold" :style="customizableClass">{{ state.language.customizable }}</div>
          <div v-cloak v-else-if="isPromo" v-html="isPromo" class="ml-1 mt-1 float-left px-4 py-1 md:py-2 tracking-header uppercase text-xxs md:text-xs font-bold" :style="promoClass">{{ state.language.promo }}</div>
          <div v-cloak v-else-if="isPreorder" class="ml-1 mt-1 float-left px-4 py-1 md:py-2 tracking-header uppercase text-xxs md:text-xs font-bold" :style="preorderClass">{{ state.language.preorder }}</div>
          <div v-cloak v-else-if="isBackorder" class="ml-1 mt-1 float-left px-4 py-1 md:py-2 tracking-header uppercase text-xxs md:text-xs font-bold" :style="backorderClass">{{ state.language.backorder }}</div>
          <div v-cloak v-else-if="onSale" class="ml-1 mt-1 float-left px-4 py-1 md:py-2 tracking-header uppercase text-xxs md:text-xs font-bold" :style="saleClass">{{ state.language.sale }}</div>
          <div v-cloak v-else-if="isLimited" class="ml-1 mt-1 float-left px-4 py-1 md:py-2 tracking-header uppercase text-xxs md:text-xs font-bold" :style="limitedClass">{{ state.language.limited }}</div>
          <div v-cloak v-else-if="isBestseller" class="ml-1 mt-1 float-left px-4 py-1 md:py-2 tracking-header uppercase text-xxs md:text-xs font-bold" :style="bestsellerClass">{{ state.language.bestseller }}</div>
          <div v-cloak v-else-if="isNew" class="ml-1 mt-1 float-left px-4 py-1 md:py-2 tracking-header uppercase text-xxs md:text-xs font-bold" :style="newClass">{{ state.language.new }}</div>
          <div v-cloak v-else-if="isYouth" class="float-left px-4 py-1 md:py-2 tracking-header uppercase text-xxs md:text-xs font-bold" :style="youthClass">{{ state.language.youth }}</div>

          <div v-cloak v-if="vendorBadgeImageUrl" class="z-10 absolute w-12 h-12 md:w-16 md:h-16 object-contain top-12 right-8 hidden md:block">
            <img alt="" :src="vendorBadgeImageUrl" />
          </div>
        </a>
        
        <div class="pl-1 pr-3">          
          <div class="py-e8 flex flex-wrap items-start" :class="[hasValueProps && valueProps.length === 0 ? 'pb-e20' : '' ]">
            <div class="w-full order-1">
              <a :href="`${product.url}?variant=${selectedVariant.id}`" class="block mb-2 focus:shadow-outline">
                <div v-cloak v-if="vendorBadgeImageUrl" class="w-12 my-2 object-contain block md:hidden">
                  <img alt="" :src="vendorBadgeImageUrl" />
                </div>        
                <p class="font-secondary text-xs md:text-md font-bold text-black w-full" v-html="product.title">{{ product.title }}</p>
              </a>
            </div>
            <div class="w-full order-2">
              <div class="flex justify-start" :class="[hasValueProps ? 'text-e14' : 'text-body-md']">
                <ins class="font-body font-bold text-md text-util-sale no-underline bfx-price" v-if="selectedVariant && onSale" v-html="currentFormattedPrice">{{ product.price | moneyWithoutTrailingZeros }}</ins>
                <ins class="font-body font-bold text-md no-underline text-misc-price_std bfx-price" v-else v-html="currentFormattedPrice">{{ product.price | moneyWithoutTrailingZeros }}</ins>
                <del class="font-body font-bold text-md ml-2 text-misc-price_sale bfx-price bfx-original-price" v-if="onSale" v-html="currentFormattedComparePrice"></del>
              </div>
            </div>
            <template v-if="product.metafields.pdp.promo_text !== null">
              <div class="w-full order-4 md:order-3">
                <p class="font-body font-semibold text-xs text-primary-500 mt-2">
                  {{ product.metafields.pdp.promo_text }}
                </p>
              </div>
            </template>
            <section is="ProductBriefValueProps" :product="product" class="md:flex order-4"></section>
          </div>

          <div class="h-e120 absolute top-320 w-full hidden swatches bg-white" v-if="hasColorOptions && selectedVariant && (hasMultipleColors > 1)">
            <div class="active-color"><span>Color</span><p class="font-normal" v-html="activeColor"></p></div>
            <div class=" h-e42 flex">
              <div v-if="hasMultipleColors > 6" class="h-full w-3 flex items-center bg-misc-color_multi">
                <svg is="icon" name="chevron-left" size="16px" class="text-white"></svg>
              </div>
              <div class="flex items-center overflow-x-scroll h-e42">
                <div class="flex w-e400">
                  <div 
                    @click="setOptionByIndex(colorOptionPositionIndex, color);"
                    v-for="(color, colorIndex) in product.Color" 
                    :active="selectedVariant.options.includes(color)" 
                    is="VariantSwatch" 
                    :size="42"
                    :color="color"
                    :key="`${color}-${colorIndex}`"
                    class="mr-e6"
                  ></div>
                </div>
              </div>
              <div v-if="hasMultipleColors > 6" class="h-full w-3 flex items-center bg-misc-color_multi">
                <svg is="icon" name="chevron-right" size="16px" class="text-white"></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import './product-card.scss';

import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import VariantSwatch from '../../components/VariantSwatch.vue';
import AffirmPromo from '../../components/AffirmPromo.vue';
import BtnPill from '../../components/BtnPill';
import BtnPillLink from '../../components/BtnPillLink';
import BtnTertiaryLink from '../../components/BtnTertiaryLink';
import Icon from '../../components/Icon.vue';
import { moneyWithoutTrailingZeros } from '../../lib/util';
import ProductBriefValueProps from '../product-main/ProductBriefValueProps.vue';
import BaseProduct from '../../lib/BaseProduct/BaseProduct';

@Component({
  components: {
    VariantSwatch,
    BtnPill,
    BtnPillLink,
    BtnTertiaryLink,
    AffirmPromo,
    Icon,
    ProductBriefValueProps
  },
  filters: {
    moneyWithoutTrailingZeros,
  },
})
export default class ProductCard extends BaseProduct {
  @Prop() readonly product!: ShopifyProduct;

  @Prop({ default: '' }) readonly comparePage!: string;

  @Prop() readonly compareProducts!: ShopifyProduct[];

  get hasValueProps() {
    return ['E-Belts', 'Other Belts'].includes(this.product.type);
  }

  get hasCompareCTA() {
    return this.hasValueProps;
  }

  get compareUrl() {
    if (this.compareProducts) {
      return `${this.comparePage}/?compare_products=${[this.product, ...this.compareProducts].map((product) => product.handle).join(',')}`;
    }
    return `${this.comparePage}/?compare_products=${this.product.handle}`;
  }

  get currentImage() {
    if (this.selectedVariant) {
      return this.selectedVariant.featured_media ? this.selectedVariant.featured_media : this.product.featured_media;
    }
    return this.product.featured_media;
  }

  imageSized(img: string, mobileSize: string, desktopSize: string) {
    if(window.innerWidth < 650) {
      return img ? img.replace(/\.(png|jpg|jpeg|gif|webp)/, mobileSize) : '';
    } 
    return img ? img.replace(/\.(png|jpg|jpeg|gif|webp)/, desktopSize) : '';
  }
}
</script>

<style>
  .badge-holder div:nth-child(n + 4){
    display: none;
  }

  .brief-value-prop {
    margin-top: -20px;
  }
</style>
