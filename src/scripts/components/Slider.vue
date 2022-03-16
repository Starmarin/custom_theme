<template>
  <div class="generic-slider" :class="{relative: type === 'normal'}">
    <div class="swiper-wrapper" :class="{relative: type === 'normal'}">
      <slot></slot>
    </div>
    <slot name="button-prev">
      <div
        v-show="swiperInstance !== null && !swiperInstance.isBeginning"
        tabindex="0"
        class="btn--icon -mr-4 hidden md:block absolute top-50p z-10 left-0"
        :class="{'generic-swiper-button-prev': type === 'normal', 'swiper-button-prev transform -translate-x-1/2': type === 'full-bleed'}"
      >
        <icon name="chevron-left" :size="iconSize"></icon>
      </div>
    </slot>
    <slot name="button-next">
      <div
        v-show="swiperInstance !== null && !swiperInstance.isEnd"
        tabindex="0"
        class="btn--icon -ml-4 hidden md:block absolute top-50p z-10 right-0"
        :class="{'generic-swiper-button-next': type === 'normal', 'swiper-button-next transform translate-x-1/2': type === 'full-bleed'}"
      >
        <icon name="chevron-right" :size="iconSize"></icon>
      </div>
    </slot>
    <div class="swiper-scrollbar mt-e18"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Swiper from 'swiper/swiper-bundle';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Icon from './Icon.vue';

export const DEFAULT_SLIDER_CONFIG: any = {
  lazy: true,
  slidesPerView: 2,
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
  slideVisibleClass: 'swiper-slide-visible',
  a11y: {
    enabled: true,
  },
  mousewheel: {
    forceToAxis: true,
  },
  navigation: {
    nextEl: '[class*="swiper-button-next"]',
    prevEl: '[class*="swiper-button-prev"]',
  },
  breakpoints: {
    320: {
      slidesPerView: 2
    },
    800: {
      slidesPerView: 3
    },
    1200: {
      slidesPerView: 5
    }
  }
};

@Component({
  components: { Icon },
})
export default class Slider extends Vue {
  @Prop({ default: () => DEFAULT_SLIDER_CONFIG }) readonly swiperConfig!: any;

  @Prop({ default: 'normal' }) readonly type!: 'normal' | 'full-bleed';

  @Prop({ default: '24px' }) readonly iconSize!: string;

  @Prop({ default: null }) swiperInstance!: any;
  // swiperInstance = null;

  activeSlide = 0;

  navVisible = {
    prev: false,
    next: true,
  };

  mounted() {
    this.initSliders();
  }

  updated() {
    let slides = this.$el.querySelectorAll('.swiper-slide');
    slides.forEach(slide => {
      if(!slide.classList.contains('swiper-slide-visible')){
        let links = slide.querySelectorAll('a');
        if(links) {
          links.forEach((link: any) => link.setAttribute('tabindex', '-1'))
        }
      }
    })
  }

  initSliders() {
    // wait for children to render
    this.$nextTick(() => {
      this.swiperInstance = new Swiper(this.$el, this.swiperConfig);
      // for(let i = 0; i < this.swiperInstance.slides.length; i++){
      //   this.swiperInstance.slidesSizesGrid[i] = 250;
      //   this.swiperInstance.slidesGrid[i] = i * 250;
      // }
      // this.swiperInstance.scrollbar.updateSize();
      // console.log(this.swiperInstance);
    });
  }
}
</script>

<style scoped lang="scss">
  [class*='generic-swiper-button'] {
    transform: translateY(-12px + -23px);
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
  .swiper-notification {
    @apply hidden;
  }

</style>