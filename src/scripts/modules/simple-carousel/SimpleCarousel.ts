import { Vue, Component } from 'vue-property-decorator';
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter';
import { Swiper as SwiperClass, Scrollbar, Navigation, Mousewheel } from 'swiper/core';
import LinkPrimary from '../../components/LinkPrimary.vue';
import BtnPillLink from '../../components/BtnPillLink';

SwiperClass.use([Scrollbar, Navigation, Mousewheel]);
const { directive } = getAwesomeSwiper(SwiperClass);

export const NAME = 'SimpleCarousel';
export default function(el: HTMLElement) {
  @Component({
    name: NAME,
    el,
    components: {
      LinkPrimary,
      BtnPillLink,
    },
    directives: {
      swiper: directive,
    },
  })
  class SimpleCarousel extends Vue {
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
      mousewheel: {
        forceToAxis: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    };
  }

  return new Vue(SimpleCarousel);
}
