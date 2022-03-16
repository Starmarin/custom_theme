import './article.scss';

import { Vue, Component } from 'vue-property-decorator';
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter';
import { Swiper as SwiperClass, Scrollbar, Navigation, Mousewheel } from 'swiper/core';
import LinkPrimary from '../../components/LinkPrimary.vue';
import ProductCard from '../product-card/ProductCard';
import LinkPrimaryLeft from '../../components/LinkPrimaryLeft.vue';

SwiperClass.use([Scrollbar, Navigation, Mousewheel]);
const { directive } = getAwesomeSwiper(SwiperClass);

export const NAME = 'Article';
export default function(el: HTMLElement) {
  @Component({
    name: NAME,
    el,
    components: {
      LinkPrimary,
      ProductCard,
      LinkPrimaryLeft,
    },
    directives: {
      swiper: directive,
    },
  })

  class Article extends Vue {
    navVisible = {
      prev: false,
      next: true,
    };

    swiper?: SwiperClass;

    swiperOptions = {
      slidesPerView: 'auto',
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    };

    articleSwiperOptions = {
      slidesPerView: 'auto',
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    };
  }

  return new Vue(Article);
}
