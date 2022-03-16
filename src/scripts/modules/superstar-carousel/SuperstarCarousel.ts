import './superstar-carousel.scss';

import { Vue, Component, Prop } from 'vue-property-decorator';
import VueMq from 'vue-mq';
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter';
import { Swiper as SwiperClass, Scrollbar, Navigation, Mousewheel } from 'swiper/core';
import { mixins } from 'vue-class-component';
import LazyLoad from '../../components/LazyLoad';
import LinkPrimary from '../../components/LinkPrimary.vue';

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

export const NAME = 'SuperstarCarousel';

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
      LinkPrimary,
      LazyLoad
    },
    directives: {
      swiper: directive,
    },
  })
  class SuperstarCarousel extends mixins(LazyLoad) { 
    @Prop() readonly modsettings!: any;

    @Prop() readonly blocks!: Array<any>;

    activeSuperstar = 0;

    selectSuperstar(superstarIndex: number, breakpoint: string) {
      if (breakpoint !== 'sm') {
        if (superstarIndex === this.activeSuperstar) {
          // go to collection page
          // window.location.href = "/collections/" + this.blocks[this.activeSuperstar].settings.superstar_collection;
        } else {
          this.activeSuperstar = superstarIndex;
        }
      }
    }

    selectSuperstarMobile(superstarIndex: number, breakpoint: string) {
      if (breakpoint === 'sm') {
        this.activeSuperstar = superstarIndex;        
        if (superstarIndex === this.activeSuperstar) {
          // go to collection page
          window.location.href = "/collections/" + this.blocks[this.activeSuperstar].settings.superstar_collection;
        } else {
          this.activeSuperstar = superstarIndex;
        }
      }
      if (breakpoint !== 'sm') {
        window.location.href = "/collections/" + this.blocks[this.activeSuperstar].settings.superstar_collection;
      }
    }

    badgeStyle(superstarIndex: number) {
      let text_color = ""
      let bg_color = ""
      if (this.blocks[superstarIndex].settings.badge_text_color  && this.blocks[superstarIndex].settings.badge_text_color !== 'rgba(0,0,0,0)') {
        text_color = this.blocks[superstarIndex].settings.badge_text_color;
      } else if(this.blocks[superstarIndex].collection.badge_text_color) {
        text_color = this.blocks[superstarIndex].collection.badge_text_color;
      } else {
        text_color = "var(--color-white)";
      }

      if (this.blocks[superstarIndex].settings.badge_bg_color  && this.blocks[superstarIndex].settings.badge_bg_color !== 'rgba(0,0,0,0)') {
        bg_color = this.blocks[superstarIndex].settings.badge_bg_color;
      } else if(this.blocks[superstarIndex].collection.badge_bg_color !== '') {
        bg_color = this.blocks[superstarIndex].collection.badge_bg_color;
      } else if (this.blocks[superstarIndex].collection.sub_brand !== '') {
        let brand = this.blocks[superstarIndex].collection.sub_brand.toLowerCase();
        bg_color = "var(--color-brand-" + brand + ")";
      } else {
        bg_color = "var(--color-primary-500)";
      }
      return "color:" + text_color + "; background-color: " + bg_color +  ";";
    }

    foundBadgeText(superstarIndex: number) {
      let badgeText = "";
      if (this.blocks[superstarIndex].settings.badge_text) {
        badgeText = this.blocks[superstarIndex].settings.badge_text;
      }
      if (this.blocks[superstarIndex].collection.badge_text) {
        badgeText = this.blocks[superstarIndex].collection.badge_text;
      }

      if (badgeText !== '') {
        return true;
      }
      return false;
    }
    
    badgeText(superstarIndex: number) {
      if (this.blocks[superstarIndex].settings.badge_text) {
        return this.blocks[superstarIndex].settings.badge_text;
      }
      return this.blocks[superstarIndex].collection.badge_text; 
    }

    superstarImage(superstarIndex: number) {
      if (this.blocks[superstarIndex].settings.superstar_photo) {
        return this.blocks[superstarIndex].settings.superstar_photo;
      }
      return this.blocks[superstarIndex].collection.superstar_photo;
    }

    imageSized(img: string, mobileSize: string, desktopSize: string) {
      if(window.innerWidth < 650) {
        return img ? img.replace(/\.(png|jpg|jpeg|gif|webp)/, mobileSize) : '';
      } 
      return img ? img.replace(/\.(png|jpg|jpeg|gif|webp)/, desktopSize) : '';
    }

    superstarText(superstarIndex: number) {
      if (this.blocks[superstarIndex].settings.superstar_name) {
        return this.blocks[superstarIndex].settings.superstar_name;
      }
      return this.blocks[superstarIndex].collection.superstar_name;
    }

    get ctaColors() {
      let text_color = ""
      let bg_color = ""

      if (this.modsettings.shop_all_text_color  && this.modsettings.shop_all_text_color !== 'rgba(0,0,0,0)') {
        text_color = this.modsettings.shop_all_text_color;
      } else {
        text_color = "var(--color-white)";
      }

      if (this.modsettings.bg_color) {
        bg_color = this.modsettings.bg_color;
      } else {
        bg_color = "var(--color-primary-500)";
      }

      return "color:" + text_color + "; background-color: " + bg_color +  ";";
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
          slidesPerView: 1.5,
          spaceBetween: 8,
        },
        800: {
          slidesPerView: 3
        },
        1200: {
          slidesPerView: 5,
        },
        1600: {
          slidesPerView: 6,
          spaceBetween: 16,
        }
      }
        };

    get shopAllColor() {
      return "color: " + this.modsettings.shop_all_text_color;
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

  return new Vue(SuperstarCarousel);
}
