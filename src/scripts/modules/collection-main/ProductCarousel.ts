import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import ProductCard from '../product-card/ProductCard.vue';
import Slider from '../../components/Slider.vue';
import tailwindConfig from '../../../../tailwind.config.js';

const swiperConfig: any = {
  slidesPerView: 3,
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
      slidesPerView: 2,
      spaceBetween: 8,
    },
    800: {
      slidesPerView: 3
    },
    1200: {
      slidesPerView: 5
    },
    1600: {
      slidesPerView: 6,
      spaceBetween: 16,
    } 
  }
};

export const NAME = 'ProductCarousel';

function getProps(el: HTMLElement) {
  if (!el.dataset.props) return {};
  return JSON.parse(el.dataset.props);
}

export default function(el: HTMLElement) {
  @Component({
    name: NAME,
    el,
    components: { ProductCard, Slider },
    propsData: getProps(el)
  })
  class ProductCarousel extends Vue {
    @Prop() readonly selectedProducts!: Array<any>;

    @Prop() readonly limit!: number;

    swiperConfig = swiperConfig;

    state = window.APPSTATE;

    getImpressions() {
      return this.selectedProducts.slice(0, this.limit).map((product: any) => {
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
  }
  return new Vue(ProductCarousel);
}
