import './promo-banner.scss';

import { Vue, Component, Prop } from 'vue-property-decorator';
import VueMq from 'vue-mq';

Vue.use(VueMq, {
  breakpoints: {
    sm: 650,
    md: 991,
    lg: 1440,
    xl: Infinity,
  },
  defaultBreakpoint: 'sm'
})

export const NAME = 'PromoBanner';

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
    },
  })
  class PromoBanner extends Vue {
    @Prop() readonly modsettings!: any;

    @Prop() readonly blocks!: any;

    singleBackgroundImage(breakpoint: string) {
      let desktopImage = this.modsettings.desktop_background_image;
      let mobileImage = this.modsettings.mobile_background_image;
      
      if (desktopImage !== null && desktopImage !== undefined) {
        if (breakpoint === 'sm') {
          if (this.modsettings.mobile_background_image !== '') {
            return "background-image: url(" + mobileImage + "); padding-top: " + this.modsettings.top_margin + "px; padding-bottom: " + this.modsettings.bottom_margin +  "px;";
          }
          return "background-image: url(" + desktopImage + "); padding-top: " + this.modsettings.top_margin + "px; padding-bottom: " + this.modsettings.bottom_margin +  "px;";
        }
        return "background-image: url(" + desktopImage + "); padding-top: " + this.modsettings.top_margin + "px; padding-bottom: " + this.modsettings.bottom_margin +  "px;";
      }
      return "background-color: " + this.modsettings.background_color + "; padding-top: " + this.modsettings.top_margin + "px; padding-bottom: " + this.modsettings.bottom_margin +  "px;";
    }

    get shopAllColor() {
      return "color: " + this.modsettings.shop_all_text_color;
    }

    get textColor() {
      return "color: " + this.modsettings.heading_text_color;
    }

    get linkColor() {
      return "color: " + this.modsettings.link_color;
    }

    mounted() {
    }
  }

  return new Vue(PromoBanner);
}
