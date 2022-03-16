import './hero-carousel.scss';

import { Vue, Component, Prop } from 'vue-property-decorator';
import VueMq from 'vue-mq';
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter';
import { Swiper as SwiperClass, Scrollbar, Navigation, Mousewheel } from 'swiper/core';

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

export const NAME = 'HeroCarousel';

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
    },
    directives: {
      swiper: directive,
    },
  })
  class HeroCarousel extends Vue {
    @Prop() readonly modsettings!: string;

    @Prop() readonly slides!: Array<any>;

    activeSlide = 0;

    slideInteraction = false;

    intervalSlide: any;

    get overlayCSS() {
      return "background-color: " + this.slides[this.activeSlide].settings.image_overlay_color + "; opacity: " + (this.slides[this.activeSlide].settings.image_overlay_opacity_percentage / 100) + ";";
    }

    hexToRgb(hex: string) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }

    anchorClick(url: string) {
      console.log('anchor - ' + url);
      document.location.href = url;
    }

    get textboxCSS() {
      let hexR = this.hexToRgb(this.slides[this.activeSlide].settings.text_box_color)?.r;
      let hexG = this.hexToRgb(this.slides[this.activeSlide].settings.text_box_color)?.g;
      let hexB = this.hexToRgb(this.slides[this.activeSlide].settings.text_box_color)?.b;
      let opacity = this.slides[this.activeSlide].settings.text_box_opacity_percentage / 100;
      let textAlignment = "";

      if (this.slides[this.activeSlide].settings.text_box_alignment === "center") {
        textAlignment = "justify-content: center; text-align: center;";
      } else {
        textAlignment = "justify-content: flex-start; text-align: left;";
      }

      if (this.slides[this.activeSlide].settings.enable_text_box) {
        if (this.slides[this.activeSlide].settings.text_box_color === 'light' || this.slides[this.activeSlide].settings.text_box_color === 'dark') {
          if (this.slides[this.activeSlide].settings.text_box_color === 'dark') {
            return "background-color: rgba(" + 0 + "," + 0 + "," + 0 + "," + opacity + "); color: var(--color-white); " + textAlignment;
          } 
          return "background-color: rgba(" + 255 + "," + 255 + "," + 255 + "," + opacity + "); color: var(--color-black); " + textAlignment;
        } 
        return "background-color: rgba(" + hexR + "," + hexG + "," + hexB + "," + opacity + "); " + textAlignment;
      }
      return textAlignment;
    }

    ctaCSS(breakpoint: string) {
      let ctaStyles = "";
      let opacity = this.slides[this.activeSlide].settings.text_box_opacity_percentage / 100;

      if (this.slides[this.activeSlide].settings.text_box_alignment === "center" || breakpoint === 'sm') {
        ctaStyles = "justify-content: center; align-items: center; text-align: center;";
      } else {
        ctaStyles = "justify-content: flex-start; align-items: flex-start; text-align: left;";
      }

      if (breakpoint !== 'sm' && breakpoint !== 'md') {
        if (this.slides[this.activeSlide].settings.text_box_color === 'light' || this.slides[this.activeSlide].settings.text_box_color === 'dark') {
          if (this.slides[this.activeSlide].settings.text_box_color === 'dark') {
            return "background-color: rgba(" + 0 + "," + 0 + "," + 0 + "," + opacity + "); color: var(--color-white); " + ctaStyles;
          } 
          return "background-color: rgba(" + 255 + "," + 255 + "," + 255 + "," + opacity + "); color: var(--color-black); " + ctaStyles;
        }  
      } else {
        if (this.slides[this.activeSlide].settings.text_box_color === 'light' || this.slides[this.activeSlide].settings.text_box_color === 'dark') {
          if (this.slides[this.activeSlide].settings.text_box_color === 'dark') {
            return "color: var(--color-white); " + ctaStyles;
          } 
          return "color: var(--color-black); " + ctaStyles;
        }          
      }
      return ctaStyles;
    }

    get ctaAlignmentCSS() {
      let ctaStyles = "";

      if (this.slides[this.activeSlide].settings.text_box_alignment === "center") {
        ctaStyles = "justify-content: center; align-items: center; text-align: center;";
      } else {
        ctaStyles = "justify-content: flex-start; align-items: flex-start; text-align: left;";
      }
      return ctaStyles;
    }

    bannerImage(breakpoint: string) {
      if (breakpoint === 'sm') {
        if (this.slides[this.activeSlide].settings.mobile_image != null) {
          return this.slides[this.activeSlide].settings.mobile_image;
        } 
        return this.slides[this.activeSlide].settings.desktop_image;
      }
      return this.slides[this.activeSlide].settings.desktop_image;
    }

    get preHeaderColor() {
      return "color: " + this.slides[this.activeSlide].settings.preheader_color + "; border-color: " + this.slides[this.activeSlide].settings.preheader_color;
    }

    get headerBodyColor() {
      return "color: " + this.slides[this.activeSlide].settings.header_body_color;
    }

    get cta1Colors() {
      return "color: " + this.slides[this.activeSlide].settings.cta_1_text_color + "; background-color: " + this.slides[this.activeSlide].settings.cta_1_bg_color;
    }

    get cta2Colors() {
      return "color: " + this.slides[this.activeSlide].settings.cta_2_text_color + "; background-color: " + this.slides[this.activeSlide].settings.cta_2_bg_color;
    }

    get textboxFlexAlign() {
      if (this.slides[this.activeSlide].settings.text_box_alignment === "left") {
        return "justify-start";
      }
      if (this.slides[this.activeSlide].settings.text_box_alignment === "center") {
        return "justify-center";
      }
      if (this.slides[this.activeSlide].settings.text_box_alignment === "right") {
        return "justify-end";
      }
      return "";
    }

    setSlide(slideNumber: number) {
      this.activeSlide = slideNumber;
      this.slideInteraction = true;
      clearInterval(this.intervalSlide);
    }

    slideRotate() {
      let totalSlides = this.slides.length;
      if (this.activeSlide + 1 === totalSlides) {
        this.activeSlide = 0;
      } else {
        this.activeSlide++;
      }
    }

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

    setSwiperFakeArrows() {
      if (this.swiper) {
        this.navVisible.next = !this.swiper.isEnd;
        this.navVisible.prev = !this.swiper.isBeginning;
      }
    }

    mounted() {
      this.intervalSlide = setInterval(this.slideRotate, 5000);
      this.setSwiperFakeArrows();
      setInterval(this.setSwiperFakeArrows, 1000);
    }
  }

  return new Vue(HeroCarousel);
}
