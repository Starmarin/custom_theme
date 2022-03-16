<template>
  <section class="pdp-recs bg-white-100 pt-e32 pb-e40 px-e12 md:py-e64 lg:px-0 overflow-hidden" data-aos="fade" v-if="recommendedProducts.length > 0">
    <div class="max-w-lg mx-auto">
      <h1 class="h2 mb-e40 md:mb-e32">Customize Your Ride</h1>
      <Slider :swiperConfig="swiperConfig">
        <ProductCard class="swiper-slide w-full sm:w-1/2 md:w-1/3" v-for="prod in recommendedProducts" :product="prod" :key="prod.id"></ProductCard>
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
import { eventBus } from './ProductBreadcrumbs.vue';

const swiperConfig = cloneDeep(DEFAULT_SLIDER_CONFIG);

swiperConfig.spaceBetween = 20;
swiperConfig.breakpoints = {
  [tailwindConfig.theme.screens.sm.replace('px', '')]: {
    slidesPerView: 2,
  },
  [tailwindConfig.theme.screens.md.replace('px', '')]: {
    slidesPerView: 3,
  },
};

@Component({
  components: { ProductCard, Slider },
})
export default class ProductRecommendations extends Vue {
  @Prop() readonly product!: ShopifyProduct;

  recommendedProducts: ShopifyProduct[] = [];

  swiperConfig = swiperConfig;

  filterRecommendedProducts(products: ShopifyProduct[]) {
    products = products.filter((prod: ShopifyProduct) => prod.available);

    if (this.product.type.toLowerCase().includes('belt')) return products.filter((p) => !p.type.toLowerCase().includes('belt')).slice(0, 3);
    return products.slice(0, 4);
  }

  mounted() {
    if (this.recommendedProducts.length <= 0) {
      // get recommended products
      fetch(`/products/${this.product.handle}?view=json-recommendations`)
        .then((res) => res.text())
        .then((res) => {
          const parsedProducts = JSON.parse(res);
          if (parsedProducts instanceof Array) {
            this.recommendedProducts = this.filterRecommendedProducts(parsedProducts);
            this.$nextTick(() => {
              eventBus.$emit('update'); // update breadcrumbs to show customize link
            })
            return;
          }
          throw new Error('Invalid response type');
          // get json from inside recommended-section div and parse it.
        })
        .catch((e) => console.error('error fetching recommended products', e.message));
    }
  }
}
</script>

<style lang="scss">
.pdp-recs {
  [class*='generic-swiper-button'] {
    display: none;
  }
}
</style>