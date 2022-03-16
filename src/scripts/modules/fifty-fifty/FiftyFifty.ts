import './fifty-fifty.scss';

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

export const NAME = 'FiftyFifty';

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
  class FiftyFifty extends Vue {
    @Prop() readonly modsettings!: any;

    brandColor = "";

    findBrand() {
      switch(this.modsettings.superstar_brand) {
        case 'raw': {
          this.brandColor = "var(--color-brand-raw)";
          break;
        }
        case 'smackdown': {
          this.brandColor = "var(--color-brand-smackdown)";
          break;
        }
        case 'nxt': {
          this.brandColor = "var(--color-brand-nxt)";
          break;
        }
        case 'legends': {
          this.brandColor = "var(--color-brand-legends)"
          break;
        }
        default: {
          this.brandColor = "var(--color-brand-raw)";
          break;  
        }
      }        
    }

    get preHeaderColors() {
      if (this.modsettings.preheader_text_color !== '') {
        return "color: " + this.modsettings.preheader_text_color + "; border-color: " + this.modsettings.preheader_border_color + ";";
      }
      return "color: " + this.brandColor + "; border-color: " + this.brandColor + ";";
    }

    get preHeaderBorderColor() {
      if (this.modsettings.preheader_border_color !== '') {
        return "border-color: " + this.modsettings.preheader_border_color;
      }
      return "border-color: transparent";
    }

    get titleColor() {
      if (this.modsettings.header_text_color !== '') {
        return "color: " + this.modsettings.header_text_color;
      }
      return "color: var(--color-gray-900)";
    }

    get bodyCopyColor() {
      if (this.modsettings.body_text_color !== '') {
        return "color: " + this.modsettings.body_text_color;
      }
      return "color: var(--color-gray-900)";
    }

    get cta1Colors() {
      if (this.modsettings.cta_1_text_color !== '' && this.modsettings.cta_1_background_color !== '') {
        return "color: " + this.modsettings.cta_1_text_color + "; background-color: " + this.modsettings.cta_1_background_color + ";";
      }
      if (this.modsettings.cta_1_text_color !== '') {
        return "color: " + this.modsettings.cta_1_text_color + ";";
      }
      if (this.modsettings.cta_1_background_color !== '') {
        return "background-color: " + this.modsettings.cta_1_background_color + ";";
      }
      return "color: var(--color-white); background-color: var(--color-primary-500);";
    }

    get cta2Colors() {
      if (this.modsettings.cta_2_text_color !== '' && this.modsettings.cta_2_background_color !== '') {
        return "color: " + this.modsettings.cta_2_text_color + "; background-color: " + this.modsettings.cta_2_background_color + ";";
      }
      if (this.modsettings.cta_2_text_color !== '') {
        return "color: " + this.modsettings.cta_2_text_color + ";";
      }
      if (this.modsettings.cta_2_background_color !== '') {
        return "background-color: " + this.modsettings.cta_2_background_color + ";";
      }
      return "color: var(--color-white); background-color: var(--color-primary-500);";
    }

    get cta3Colors() {
      if (this.modsettings.cta_3_text_color !== '' && this.modsettings.cta_3_background_color !== '') {
        return "color: " + this.modsettings.cta_1_text_color + "; background-color: " + this.modsettings.cta_3_background_color + ";";
      }
      if (this.modsettings.cta_3_text_color !== '') {
        return "color: " + this.modsettings.cta_3_text_color + ";";
      }
      if (this.modsettings.cta_3_background_color !== '') {
        return "background-color: " + this.modsettings.cta_3_background_color + ";";
      }
      return "color: var(--color-white); background-color: var(--color-primary-500);";
    }

    get ctaStacking() {
      if (this.modsettings.cta_1_link_url && this.modsettings.cta_2_link_url && this.modsettings.cta_3_link_url) {
        return "flex-col items-center";
      }
      if (this.modsettings.cta_1_link_url && this.modsettings.cta_2_link_url) {
        return "flex-row justify-between";
      }
      if (this.modsettings.alignment === 'left') {
        return "justify-center md:justify-start";
      }
      return "justify-center";
    }

    get ctaClasses() {
      if (this.modsettings.cta_1_link_url && this.modsettings.cta_2_link_url && this.modsettings.cta_3_link_url) {
        return "w-2/3 md:w-full mb-2";
      }
      if (this.modsettings.cta_1_link_url && this.modsettings.cta_2_link_url) {
        return "w-1/2 md:mr-4";
      }
      return "w-2/3";
    }

    get mainBackgroundColor() {
      if (this.modsettings.background_color !== '') {
        return "background-color: " + this.modsettings.background_color + ";";
      }
      return "background-color: var(--color-gray-200);";
    }

    get imageColumnClasses() {
      if (this.modsettings.image_location === 'left' || this.modsettings.image_location === 'Image on Left') {
        if (this.modsettings.layout === '50/50') {
          return "order-1 md:order-1 w-full md:w-1/2 md:mr-e80";
        }
        return "order-1 md:order-1 w-full md:w-3/5 md:mr-e80";
      }
      if (this.modsettings.layout === '50/50') {
        return "order-1 md:order-2 w-full md:w-1/2 md:ml-e80";
      }
      return "order-1 md:order-2 w-full md:w-3/5 md:ml-e80";
    }

    get textColumnClasses() {
      let alignment = this.modsettings.alignment;
      let alignmentClasses = "";
      if (alignment === "left") {
        alignmentClasses = " justify-center text-center md:text-left md:justify-start";
      } else {
        alignmentClasses = " justify-center text-center";
      }
      if (this.modsettings.image_location === 'left' || this.modsettings.image_location === 'Image on Left') {
        if (this.modsettings.layout === '50/50') {
          return "order-2 md:order-2 w-full md:w-1/2 " + alignmentClasses;
        }
        return "order-2 md:order-2 w-full md:w-2/5 " + alignmentClasses;
      }
      if (this.modsettings.layout === '50/50') {
        return "order-2 md:order-1 w-full md:w-1/2 " + alignmentClasses;
      }
      return "order-2 md:order-1 w-full md:w-2/5 " + alignmentClasses;
    }

    mounted() {
      this.findBrand();
    }
  }
  return new Vue(FiftyFifty);
}
