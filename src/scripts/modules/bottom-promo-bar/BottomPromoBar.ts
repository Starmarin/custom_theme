/* eslint-disable */
import './bottom-promo-bar.scss';

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import ModalWithOverlay from '../../components/ModalWithOverlay.vue';
import Icon from '../../components/Icon.vue';
import LinkPrimary from '../../components/LinkPrimary.vue';
import Swiper, {Scrollbar, Navigation, Mousewheel, Pagination} from 'swiper';

Swiper.use([Scrollbar, Navigation, Mousewheel, Pagination]);

export const NAME = 'BottomPromoBar';

function getProps(el: HTMLElement) {
  if (!el.dataset.props) return {};
  return JSON.parse(el.dataset.props);
}

export default function (el: HTMLElement) {
  @Component({
    name: NAME,
    el,
    propsData: getProps(el),
    components: { ModalWithOverlay, Icon, LinkPrimary },
  })
  class BottomPromoBar extends Vue {
    $refs!: {
      container: HTMLInputElement;
    };

    @Prop({ default: 10000 }) readonly timeout!: number;

    @Prop({ default: 1 }) readonly slideCount!: number;

    @Prop({ default: 1 }) readonly promos!: Array<any>;

    @Prop({ default: false }) modalOpen!: boolean;

    currentIndex = 0;

    state = window.APPSTATE;

    showPromo = true;

    openModal() {
      this.modalOpen = true;
    }
    changeSlide() {
      let newIndex = this.currentIndex;

      if (this.currentIndex + 2 > this.slideCount) {
        newIndex = -1;
      }
      this.currentIndex = newIndex + 1;
    }

    promoSwiper?: Swiper;
      
    initSwiper() {
      this.promoSwiper = new Swiper(".promo-swiper-container", {
        autoplay: false,
        scrollbar: {
          el: '.promo-swiper-scrollbar',
          draggable: true,
        },
        mousewheel: {
          forceToAxis: true,
        },
        loop: true,
        pagination: {
          el: '.promo-swiper-pagination',
          type: 'bullets',
          clickable: true
        },
        slidesPerView: 'auto',
        navigation: {
          nextEl: '.promo-swiper-arrow-next',
          prevEl: '.promo-swiper-arrow-prev',
        },
      });
      this.promoSwiper.pagination.render();
    }

    promoPrev() {
      if (this.promoSwiper) {
        this.promoSwiper.slidePrev();
      }
    }

    promoNext() {
      if (this.promoSwiper) {
        this.promoSwiper.slideNext();
      }
    }

    mounted() {
      this.state.promos = this.promos;
      this.$nextTick(() => {
        this.initSwiper();
      });

      if (this.promos.length > 0) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event': 'promotion-impression',
          'ecommerce': {
            'promoView': {
              'promotions': [
                {
                  'id': '',
                  'name': 'bottom-promo-bar',
                  'creative': '',
                  'position': '',
                  'start': ''
                }
              ]
            }
          } 
        });          
      }

    }
  }

  return new Vue(BottomPromoBar);
};
