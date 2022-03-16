<template>
  <div>
    <ModalWithOverlay :open="modalOpen" @update:open="modalOpen = false" v-if="includedItems && includedItems.length">
      <ProductProvider>
        <ProductWhatsInsideModalContents>
          <button slot="close-button" class="p-e12 border border-solid border-gray-200 hover:bg-gray-200 transition-colors duration-300 rounded-full focus:shadow-outline z-80" @click="modalOpen = false" aria-label="close modal">
            <Icon name="close" size="18px"></Icon>
          </button>
        </ProductWhatsInsideModalContents>
      </ProductProvider>
    </ModalWithOverlay>
    <article class="pdp-pf py-e40 px-e12 max-w-lg lg:px-0 md:pt-e64 md:pb-e84 mx-auto relative overflow-hidden" data-aos="fade">
      <header class="md:w-2/3">
        <h1 class="h2 mb-e12 md:mb-e16" v-if="title">Premium Features</h1>
        <div v-if="description" v-html="description" class="body-md mb-e40 md:mb-e68 md:text-e20 md:leading-8"></div>
      </header>
      <section>
        <ul class="feat-table grid md:hidden text-0" v-if="highlightedFeatures.length">
          <li v-for="feat in highlightedFeatures" :key="feat.specValue" class="inline-block">
            <img v-if="feat.specIcon && feat.specIcon[0]" :src="feat.specIcon[0].cloudinary_src + 'w_40'" :alt="feat.specIcon[0].alt" />
            <p class="text-e16 tracking-tighter text-gray-700 mt-e20 font-medium">{{ feat.specValue }}</p>
          </li>
        </ul>
        <Slider :swiperConfig="swiperConfig" class="hidden md:block text-0 overflow-hidden swiper-feat" v-if="highlightedFeatures.length">
          <div v-for="feat in highlightedFeatures" :key="feat.specValue" class="swiper-slide inline-block">
            <img v-if="feat.specIcon && feat.specIcon[0]" :src="feat.specIcon[0].cloudinary_src + 'w_80'" :alt="feat.specIcon[0].alt" />
            <p class="text-e16 tracking-tighter text-gray-700 mt-e20 font-medium">{{ feat.specValue }}</p>
          </div>
        </Slider>
      </section>
      <footer class="pt-e24 space-y-e16 text-center md:w-3/12 md:pt-e64 md:absolute md:top-0 md:right-12 lg:right-0">
        <BtnSecondary class="mx-auto w-full uppercase" @click="modalOpen = true" v-if="includedItems && includedItems.length">{{ cta1Text || "What's in the box?" }}</BtnSecondary>
        <BtnTertiaryLink :href="cta2Url" class="mx-auto w-full uppercase" v-if="cta2Url && product.type.toLowerCase().includes('belt')">{{ cta2Text || 'E-Belt Setup' }}</BtnTertiaryLink>
      </footer>
    </article>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import cloneDeep from 'lodash/cloneDeep';
import BtnSecondary from '../../components/BtnSecondary';
import BtnTertiaryLink from '../../components/BtnTertiaryLink';
import Icon from '../../components/Icon.vue';
import Slider, { DEFAULT_SLIDER_CONFIG } from '../../components/Slider.vue';
import ModalWithOverlay from '../../components/ModalWithOverlay.vue';
import ProductWhatsInsideModalContents from './ProductWhatsInsideModalContents.vue';
import { ProductProvider } from './ProductProvider';

const customSwiperConfig = cloneDeep(DEFAULT_SLIDER_CONFIG);

customSwiperConfig.spaceBetween = 32;
customSwiperConfig.watchOverflow = true;

@Component({
  components: { BtnSecondary, BtnTertiaryLink, Slider, ModalWithOverlay, ProductWhatsInsideModalContents, ProductProvider, Icon },
})
export default class ProductFeatures extends Vue {
  @Prop() readonly title!: string;

  @Prop() readonly description!: string;

  @Prop({ default: () => [] }) readonly features!: BVAFeatureSpec[];

  @Prop() readonly includedItems!: BVAIncludedItem[];

  @Prop() readonly product!: ShopifyProduct[];

  @Prop() readonly cta1Text!: string;

  @Prop() readonly cta2Text!: string;

  @Prop() readonly cta2Url!: string;

  swiperConfig = customSwiperConfig;

  modalOpen = false;

  get highlightedFeatures() {
    return this.features.filter((feat) => feat.sepcIsHighlight); // only the highlighted have icons
  }
}
</script>

<style lang="scss">
.pdp-pf {
  .feat-table {
    grid-template-columns: 50% 50%;
    column-gap: 10px;
    row-gap: 24px;
  }

  .swiper-feat {
    .swiper-slide {
      max-width: 200px;
      width: 200px;
      min-width: 200px;
    }

    .swiper-button-disabled {
      display: none;
    }
  }
}
</style>