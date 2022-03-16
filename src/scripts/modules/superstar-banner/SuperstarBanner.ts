import './superstar-banner.scss';

import { Vue, Component, Prop } from 'vue-property-decorator';
import VueMq from 'vue-mq';
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

export const NAME = 'SuperstarBanner';

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
    },
    directives: {
    },
  })
  class SuperstarBanner extends Vue {
    @Prop() readonly modsettings!: any;

    @Prop() readonly blocks!: any;

    brandColor = "";

    brandImage = ""

    findBrand() {
      switch(this.modsettings.superstar_brand) {
        case 'raw': {
          this.brandColor = "var(--color-brand-raw)";
          this.brandImage = "https://cdn.shopify.com/s/files/1/0070/5698/2143/files/logo_white_raw.png";
          break;
        }
        case 'smackdown': {
          this.brandColor = "var(--color-brand-smackdown)";
          this.brandImage = "https://cdn.shopify.com/s/files/1/0070/5698/2143/files/logo_white_smackdown.png";
          break;
        }
        case 'nxt': {
          this.brandColor = "var(--color-brand-nxt)";
          this.brandImage = "https://cdn.shopify.com/s/files/1/0070/5698/2143/files/logo_black_nxt.png";
          break;
        }
        case 'legends': {
          this.brandColor = "var(--color-brand-legends)";
          this.brandImage = "https://cdn.shopify.com/s/files/1/0070/5698/2143/files/logo_white_legends.png";
          break;
        }
        default: {
          this.brandColor = "var(--color-brand-raw)";
          this.brandImage = "https://cdn.shopify.com/s/files/1/0070/5698/2143/files/logo_white_raw.png";
          break;  
        }
      }        
    }

    hexToRgb(hex: string) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }

    get textboxCSS() {
      let hexR = this.hexToRgb(this.modsettings.superstar_textbox_background_color)?.r;
      let hexG = this.hexToRgb(this.modsettings.superstar_textbox_background_color)?.g;
      let hexB = this.hexToRgb(this.modsettings.superstar_textbox_background_color)?.b;
      let opacity = '0.95';

      if (this.modsettings.superstar_textbox_background_color !== null && this.modsettings.superstar_textbox_text_color !== null) {
        return "background-color: rgba(" + hexR + "," + hexG + "," + hexB + "," + opacity + "); color: " + this.modsettings.superstar_textbox_text_color + ';';
      }
      if (this.modsettings.superstar_textbox_background_color !== null) {
        return "background-color: rgba(" + hexR + "," + hexG + "," + hexB + "," + opacity + "); color: var(--color-black);";
      }
      if (this.modsettings.superstar_textbox_text_color !== null) {
        return "background-color: rgba(255, 255, 255, " + opacity + "); color: " + this.modsettings.superstar_textbox_text_color + ';';
      }
      return "background-color: rgba(255, 255, 255, " + opacity + "); color: var(--color-black);";
    }

    get preHeaderColors() {
      if (this.modsettings.superstar_textbox_text_color !== '') {
        return "color: " + this.modsettings.superstar_textbox_text_color + "; border-color: " + this.brandColor + ";";
      }
      return "color: " + this.brandColor + "; border-color: " + this.brandColor + ";";
    }

    get buyNowColors() {
      return "color: " + this.modsettings.superstar_textbox_text_color + "; background-color: " + this.brandColor + ";";
    }

    get brandBackground() {
      return "background-color: " + this.brandColor + ";";
    }

    get preHeaderText() {
      if (this.modsettings.superstar_badge !== '') {
        return this.modsettings.superstar_badge;
      }
      if (this.modsettings.superstar_brand !== '') {
        return this.modsettings.superstar_brand;
      }
      return "";
    }

    ctaStyle(ctaIndex: number) {
      if (this.blocks[ctaIndex].settings.cta_background_color !== null && this.blocks[ctaIndex].settings.cta_text_color !== null) {
        return "background-color: " + this.blocks[ctaIndex].settings.cta_background_color + "; color: " + this.blocks[ctaIndex].settings.cta_text_color + ';';
      }
      if (this.blocks[ctaIndex].cta_background_color !== null) {
        return "background-color: " + this.blocks[ctaIndex].settings.cta_background_color + "; color: var(--color-white);";
      }
      if (this.blocks[ctaIndex].settings.cta_text_color !== null) {
        return "background-color: var(--color-primary-500); color: " + this.blocks[ctaIndex].settings.cta_text_color + ';';
      }
      return "background-color: var(--color-primary-500); color: var(--color-white);";
    }

    get titleColor() {
      if (this.modsettings.superstar_textbox_text_color !== '') {
        return "color: " + this.modsettings.superstar_textbox_text_color;
      }
      return "color: var(--color-black)";
    }

    get bodyCopyColor() {
      if (this.modsettings.superstar_textbox_text_color !== '') {
        return "color: " + this.modsettings.superstar_textbox_text_color;
      }
      return "color: var(--color-black)";
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

    get mainBackground() {
      if (this.modsettings.background_color !== '') {
        return "background-image: url(" + this.modsettings.superstar_background_image + ");";
      }
      return "background-color: var(--color-gray-100);";
    }


    mounted() {
      this.findBrand();
    }
  }

  return new Vue(SuperstarBanner);
}
