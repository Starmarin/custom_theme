import './button-collection.scss';

import { Vue, Component, Prop } from 'vue-property-decorator';
import VueMq from 'vue-mq';
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter';
import { Swiper as SwiperClass, Scrollbar, Navigation, Mousewheel } from 'swiper/core';
import { mixins } from 'vue-class-component';
import LazyLoad from '../../components/LazyLoad';

Vue.use(VueMq, {
  breakpoints: {
    sm: 650,
    md: 991,
    lg: 1440,
    xl: Infinity,
  },
  defaultBreakpoint: 'sm'
})

SwiperClass.use([Scrollbar, Navigation, Mousewheel]);
const { directive } = getAwesomeSwiper(SwiperClass);

export const NAME = 'ButtonCollection';

function getProps(el: HTMLElement) {
  if (!el.dataset.props) return {};
  return JSON.parse(el.dataset.props);
}

export default function(el: HTMLElement) {
  @Component({
    name: NAME,
    el,
    propsData: getProps(el),
    components: {
      LazyLoad
    },
    directives: {
      swiper: directive,
    },
  })
  class ButtonCollection extends mixins(LazyLoad) {
    @Prop() readonly modsettings!: any;

    @Prop() readonly blocks!: Array<any>;

    buttonStyleInstance = "";

    collectionLink(buttonIndex: number) {
      return this.blocks[buttonIndex].collection.url;
    }

    borderColor(buttonIndex: number) {
      return "border-color: " + this.blocks[buttonIndex].settings.border_color;
    }

    navVisible = {
      prev: false,
      next: true,
    };

    swiper?: SwiperClass;

    swiperOptions = {
      lazy: true,
      slidesPerView: '5',
      spaceBetween: 16,
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
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 8,
        },
        800: {
          slidesPerView: 3
        },
        1200: {
          slidesPerView: 6
        },
        1600: {
          slidesPerView: 6,
          spaceBetween: 16,
        }
      }
    };

    get titleColor() {
      if (this.modsettings.header_text_color !== '') {
        return "color: " + this.modsettings.header_text_color;
      }
      return "color: var(--color-gray-900)";
    }
        
    get shopAllColor() {
      if (this.modsettings.shop_all_link_color !== '') {
        return "color: " + this.modsettings.shop_all_link_color;
      }
      return "color: var(--color-primary-500)";
    }

    get buttonTextColor() {
      if (this.modsettings.button_text_color !== '') {
        return "color: " + this.modsettings.button_text_color;
      }
      return "color: var(--color-gray-900)";
    }

    get backgroundStyles() {
      if (this.modsettings.bg_color !== '' || this.modsettings.background_image !== '') {
        return "background-image: url(" + this.modsettings.background_image + "); background-color: " + this.modsettings.bg_color + ";";        
      }
      return "background-color: var(--color-white)";
    }

    imageSized(img: string, mobileSize: string, desktopSize: string) {
      if(window.innerWidth < 650) {
        return img ? img.replace(/\.(png|jpg|jpeg|gif|webp)/, mobileSize) : '';
      } 
      return img ? img.replace(/\.(png|jpg|jpeg|gif|webp)/, desktopSize) : '';
    }

    setSwiperFakeArrows() {
      if (this.swiper) {
        this.navVisible.next = !this.swiper.isEnd;
        this.navVisible.prev = !this.swiper.isBeginning;
      }
    }

  mounted() {
      this.setSwiperFakeArrows();
      setInterval(this.setSwiperFakeArrows, 1000);
    }
  }
  return new Vue(ButtonCollection);
}
