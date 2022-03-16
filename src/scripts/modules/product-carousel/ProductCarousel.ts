import './product-carousel.scss';

import { Vue, Component, Prop } from 'vue-property-decorator';
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter';
import { Swiper as SwiperClass, Scrollbar, Navigation, Mousewheel } from 'swiper/core';
import ProductCard from '../product-card/ProductCard.vue';
import Slider from '../../components/Slider.vue';

SwiperClass.use([Scrollbar, Navigation, Mousewheel]);
const { directive } = getAwesomeSwiper(SwiperClass);

export const NAME = 'HPProductCarousel';

function getProps(el: HTMLElement) {
  if (!el.dataset.props) return {};
  return JSON.parse(el.dataset.props);
}

export default function(el: HTMLElement) {
  @Component({
    name: NAME,
    el,
    propsData: getProps(el),
    components: { ProductCard, Slider },
    directives: {
      swiper: directive,
    },
  })
  class HPProductCarousel extends Vue {
    @Prop() readonly modsettings!: any;
    
    @Prop() readonly collection!: Array<any>;

    @Prop() readonly limit!: number;

    navVisible = {
      prev: false,
      next: true,
    };

    swiper?: SwiperClass;

    swiperOptions = {
      lazy: true,
      slidesPerView: 5,
      spaceBetween: 16,
      virtualSize: 2500,
      slideVisibleClass: 'swiper-slide-visible',
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
      },
      mousewheel: {
        forceToAxis: true,
      },
      navigation: {
        nextEl: '.generic-swiper-button-next',
        prevEl: '.generic-swiper-button-prev',
      },
      breakpoints: {
        320: {
          slidesPerView: 1.5,
          spaceBetween: 8,
        },
        800: {
          slidesPerView: 3
        },
        1200: {
          slidesPerView: 5
        },
        1600: {
          slidesPerView: 5,
          spaceBetween: 16,
        }
      }
    };

    setSwiperFakeArrows() {
      if (this.swiper) {
        this.navVisible.next = !this.swiper.isEnd;
        this.navVisible.prev = !this.swiper.isBeginning;
      }
    }

    get backgroundColor() {
      return "background-color: " + this.modsettings.background_color + ";";
    }

    get headerColor() {
      if (this.modsettings.header_text_color !== '') {
        return "color: " + this.modsettings.header_text_color + ";";
      }
      return "color: var(--color-gray-900);";
    }

    get shopAllColor() {
      if (this.modsettings.shop_all_link_color !== '') {
        return "color: " + this.modsettings.shop_all_link_color + ";";
      }
      return "color: var(--color-primary-500);";
    }

    getImpressions() {
      return this.collection.slice(0, this.limit).map((product: any) => {
        return {
          'list': 'product-card',
          'position': "", 
          'id': product.id,
          'name': `${product.title}`,
          'category': `${product.type}`,
          'brand': `${product.vendor}` || 'WWE',
          'variant': product.variants[0]?.id,
          'price': product.variants[0]?.price
        }
      })
    }

    getDataLayer() {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event': 'product-impression',
        'ecommerce': {
          'currencyCode': window.Shopify.currency.active,
          'impressions': this.getImpressions()
        }
      });
    }

    beforeMount() {
      this.getDataLayer()
    }

    mounted() {
      this.setSwiperFakeArrows();
      setInterval(this.setSwiperFakeArrows, 1000);
    }
  }

  return new Vue(HPProductCarousel);
}
