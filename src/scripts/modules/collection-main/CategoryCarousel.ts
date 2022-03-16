import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import ProductCard from '../product-card/ProductCard.vue';
import Slider from '../../components/Slider.vue';
import tailwindConfig from '../../../../tailwind.config.js';

const categoryConfig: any = {
  slidesPerView: 5,
  spaceBetween: 0,
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
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
    650: {
      slidesPerView: 5
    },
    992: {
      slidesPerView: 5
    }
  }
};

export const NAME = 'CategoryCarousel';
export default function(el: HTMLElement) {
  @Component({
    name: NAME,
    el,
    components: { ProductCard, Slider },
    props: {
      selectedProducts: Array
    }
  })
  class CategoryCarousel extends Vue {
    @Prop() selectedProducts!: Array<any>;
  
    categoryConfig = categoryConfig;

    state = window.APPSTATE;
    
    mounted() {
    }
  }
  return new Vue(CategoryCarousel);
}