<template>
  <section class="pdp-video-section bg-black pt-e40 pb-e48 px-e12 md:pt-e60 md:pb-e80 lg:px-0 relative overflow-hidden" data-aos="fade" v-if="videoImageSlides && videoImageSlides.length">
    <div class="max-w-lg mx-auto">
      <h1 class="h2 mb-e16 md:mb-e40 text-white" v-if="product.metafields.accentuate.video_section_heading">{{ product.metafields.accentuate.video_section_heading }}</h1>
      <Slider iconSize="18px" :swiperConfig="swiperConfig" type="full-bleed" v-if="videoImageSlides.length">
        <template v-for="slide in videoImageSlides">
          <img class="swiper-slide w-10/12" v-if="slide.videoImageSection[0].media_type === 'image'" :src="slide.videoImageSection[0].src" :alt="slide.videoImageSection[0].alt" :key="slide.videoImageSection[0].id" />
          <div class="swiper-slide w-10/12" v-else-if="slide.videoImageSection[0].media_type === 'video'" :key="slide.videoImageSection[0].id">
            <video :src="slide.videoImageSection[0].src" controls :poster="slide.videoPosterImage[0].src" v-if="slide.videoPosterImage && slide.videoPosterImage[0]"></video>
            <video :src="slide.videoImageSection[0].src" controls v-else></video>
          </div>
        </template>
      </Slider>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import cloneDeep from 'lodash/cloneDeep';
import Slider, { DEFAULT_SLIDER_CONFIG } from '../../components/Slider.vue';
import tailwindConfig from '../../../../tailwind.config.js';

const swiperConfig = cloneDeep(DEFAULT_SLIDER_CONFIG);

swiperConfig.watchOverflow = true;
swiperConfig.spaceBetween = 8;
swiperConfig.breakpoints = {
  [tailwindConfig.theme.screens.md.replace('px', '')]: {
    spaceBetween: 20,
  },
};

@Component({
  components: { Slider },
})
export default class ProductVideoImageSlider extends Vue {
  @Prop() readonly product!: ShopifyProduct;

  @Prop() readonly videoImageSlides!: Record<string, AccentuateMediaV2[]>[];

  swiperConfig = swiperConfig;
}
</script>

<style lang="scss">
.pdp-video-section {
  .swiper-scrollbar {
    @screen md {
      @apply mt-e40;
    }
  }

  .swiper-button-disabled {
    display: none;
  }
}
</style>