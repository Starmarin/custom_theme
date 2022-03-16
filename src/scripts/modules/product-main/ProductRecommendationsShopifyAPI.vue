<template>
  <section class="pdp-recs bg-white pt-5 pb-5 md:mx-10 px-e12 lg:px-0 overflow-x-hidden" data-aos="fade" v-if="recommendedProducts.length > 0">
    <div class="max-w-lg mx-auto">
      <h3 class="h3 mb-7 px-10 text-center md:text-left md:mb-10">{{ state.language.ymal }}</h3>
      <Slider :swiperConfig="swiperConfig" class="px-0 sm:px-10">
        <ProductCard class="swiper-slide w-full sm:w-1/2 md:w-1/3 mr-2 max-w-e180 md:max-w-e250 min-w-e180 md:min-w-e250" v-for="prod in recommendedProducts" :product="prod" :key="prod.id"></ProductCard>
      </Slider>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import cloneDeep from 'lodash/cloneDeep';
import ProductCard from '../product-card/ProductCard.vue';
import Slider, { DEFAULT_SLIDER_CONFIG } from '../../components/Slider.vue';
import tailwindConfig from '../../../../tailwind.config.js';

const swiperConfig = cloneDeep(DEFAULT_SLIDER_CONFIG);

  swiperConfig.spaceBetween = 5;
  swiperConfig.slidesPerView = 2;
  swiperConfig.watchSlidesVisibility = true;
  swiperConfig.watchSlidesProgress = true;
  swiperConfig.slideVisibleClass = 'swiper-slide-visible';

  swiperConfig.breakpoints = {
  [tailwindConfig.theme.screens.sm.replace('px', '')]: {
    slidesPerView: 2,
  },
  [tailwindConfig.theme.screens.md.replace('px', '')]: {
    slidesPerView: 5,
  },
};

@Component({
  components: { ProductCard, Slider },
})
export default class ProductRecommendations extends Vue {
  @Prop() readonly product!: ShopifyProduct;

  recommendedProducts: ShopifyProduct[] = [];

  swiperConfig = swiperConfig;

  state = window.APPSTATE;

  filterRecommendedProducts(products: ShopifyProduct[]) {
    products = products.filter((prod: ShopifyProduct) => prod.available);

    if (this.product.type.toLowerCase().includes('belt')) return products.filter((p) => !p.type.toLowerCase().includes('belt')).slice(0, 3);
    return products.slice(0, 7);
  }

  mounted() {
    if (this.recommendedProducts.length <= 0) {
      // get recommended products
      fetch(`/recommendations/products?section_id=recommended-products--json&product_id=${this.product.id}&limit=8`)
        .then((res) => res.text())
        .then((res) => {
          // get json from inside recommended-section div and parse it.
          if (res && res.length) {
            const temp = document.createElement('div');
            temp.innerHTML = res;
            const jsonString = temp?.children[0] as HTMLElement;
            const data = JSON.parse(jsonString.innerText.trim());
            if (data.products instanceof Array) {
              this.recommendedProducts = this.filterRecommendedProducts(data.products);
            }
          }
        })
        .catch((e) => console.error('error fetching recommended products', e.message));
    }
  }
}
</script>

<style lang="scss">
.pdp-recs {
  [class*='generic-swiper-button'] {
    display: none !important;
    background: rgba(0,0,0,0.7);
    color: white;
    padding: 60px 10px;
    margin-top: -50px;
    @screen md {
      display: block !important;
    }
  }
  .product-card .yotpo-bottomline .text-m {
    display: none !important;
  }
  .product-card .brief-value-prop {
    top: -40px;
    position: relative;
    left: -10px;
    @screen md {
      left: 0;
      top: 0;
      margin-top: -20px !important;
    }
  }
}

.swiper-button-disabled {
  @apply opacity-0;
}

.swiper-slide, .swiper-slide-prev, .swiper-slide-prev.swiper-slide-visible {
  @apply opacity-100;
  @screen md {
    @apply opacity-0
  }
}

.swiper-slide-visible, .swiper-slide.swiper-slider-active {
  @apply opacity-100;
}


</style>