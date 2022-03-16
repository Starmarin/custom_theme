<template>
  <section class="whats-inside py-e32 px-e12 md:pt-e64 md:pb-e72 lg:px-0 overflow-hidden md:overflow-visible">
    <header class="flex justify-between items-center mb-e20 md:mb-e48">
      <h1 class="h3">What's Inside</h1>
      <slot name="close-button"></slot>
    </header>
    <div class="whats-inside__slider-main swiper-container">
      <div class="swiper-wrapper">
        <section class="swiper-slide md:flex items-center md:w-4/5 whats-inside__max-h-container" v-for="item in includedItems" :key="item.includedItemName">
          <img class="mb-e32 md:w-1/2 mr-e16" v-if="item.includedItemImage && item.includedItemImage[0]" :src="item.includedItemImage[0].cloudinary_src + 'w_577'" :alt="item.includedItemImage[0].alt" />
          <div class="md:w-1/2">
            <h1 class="font-semibold text-e22 mb-e16 md:mb-e24 md:text-e28">{{ item.includedItemHeading || item.includedItemName }}</h1>
            <div class="body-lg font-medium tracking-tighter text-gray-700 md:text-e20" v-html="item.includedItemDescription"></div>
          </div>
        </section>
      </div>
    </div>
    <div class="whats-inside__slider-thumbs mt-e40 swiper-container">
      <div class="swiper-wrapper">
        <button class="swiper-slide text-e18 tracking-tighter font-medium inline-flex items-center select-none" :class="{ active: activeIndex === index }" v-for="(item, index) in includedItems" :key="item.includedItemName">
          <span class="inline-block mr-e16">{{ item.includedItemName }}</span>
          <span class="inline-block accent-bar" aria-hidden="true"></span>
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Swiper from 'swiper/swiper-bundle';

@Component
export default class ProductWhatsInsideModalContents extends Vue {
  @Prop() readonly includedItems!: BVAIncludedItem[];

  swiperInstanceMain: any;

  swiperInstanceThumbs: any;

  activeIndex = 0;

  mounted() {
    this.initSliders();
  }

  initSliders() {
    const swiperOptionThumbs = {
      threshold: 15,
      spaceBetween: 20,
      initialSlide: 0,
      slidesPerView: 'auto',
      on: {
        click: this.onSlideClickThumb,
      },
    };
    const swiperOptionsMain = {
      initialSlide: 0,
      slidesPerView: 1,
      spaceBetween: 12,
      on: {
        slideChange: this.onSlideChangeMain,
      },
    };
    // wait for children to render
    this.$nextTick(() => {
      this.swiperInstanceThumbs = new Swiper('.whats-inside__slider-thumbs', swiperOptionThumbs);
      this.swiperInstanceMain = new Swiper('.whats-inside__slider-main', swiperOptionsMain);
    });
  }

  onSlideChangeMain(swiperInstance: any) {
    this.activeIndex = swiperInstance.realIndex;
    this.swiperInstanceThumbs.slideToLoop(swiperInstance.realIndex); // -1 to allow keep one thumb visible to go back
  }

  onSlideClickThumb(swiperInstance: any) {
    this.activeIndex = swiperInstance.clickedIndex;
    this.swiperInstanceMain.slideToLoop(swiperInstance.clickedIndex);
  }

  @Watch('includedItems')
  onIncludedItemsChange(newValue: any, oldValue: any) {
    this.$nextTick(function () {
      // entire view has been re-rendered. update slider
      this.swiperInstanceMain.loopDestroy?.(); // remove any cloned slides
      this.swiperInstanceMain.loopCreate?.(); // recreate loop because otherwise it doesn't update correctly
      this.swiperInstanceMain.update(); // update based on new slides vue has rendered
      this.swiperInstanceThumbs.update(); // update based on new slides vue has rendered
      this.swiperInstanceMain.lazy.load(); // trigger lazy load
    });
  }
}
</script>

<style scoped lang="scss">
.whats-inside__slider-thumbs {
  .swiper-slide {
    width: auto;

    &.active {
      color: var(--color-red-700);
    }
  }

  .accent-bar {
    width: 200px;
    height: 2px;
    background: currentColor;
  }
}

.whats-inside__slider-main {
  @screen md {
    overflow: visible;
  }
}

.whats-inside__max-h-container {
  max-height: 75vh;
  overflow-y: scroll;
}
</style>