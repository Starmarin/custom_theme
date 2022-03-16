import './tile-grid.scss';

import { Vue, Component, Prop } from 'vue-property-decorator';
import VueMq from 'vue-mq';
import { mixins } from 'vue-class-component';
import LazyLoad from '../../components/LazyLoad';
import TransitionExpand from '../../components/TransitionExpand.vue';
import Icon from '../../components/Icon.vue';
import ModalWithOverlay from '../../components/ModalWithOverlay.vue';

Vue.use(VueMq, {
  breakpoints: {
    sm: 650,
    md: 991,
    lg: 1440,
    xl: Infinity,
  },
  defaultBreakpoint: 'sm'
})

export const NAME = 'TileGrid';

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
      Icon,
      ModalWithOverlay,
      TransitionExpand,
      LazyLoad
    },
    directives: {
    },
  })
  class TileGrid extends mixins(LazyLoad) {
    @Prop() readonly modsettings!: any;

    videoModal = false;

    showSmallTile1 = false;

    showSmallTile2 = false;

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

    imageSize(file: string, size: string) {
      return file ? file.replace(/\.(png|jpg|jpeg|gif|webp)/, `_${size}.$1`) : '';
    }
  
    imageCrop(file: string, position: string) {
      return file.replace(/\.(png|jpg|jpeg|gif|webp)/, `_crop_${position}.$1`);
    }
  
    largeTileBackgroundImage(breakpoint: string) {
      let desktopImage = this.imageCrop(this.imageSize(this.modsettings.large_desktop_image, '1200x2100'), 'center');
      let mobileImage = this.imageCrop(this.imageSize(this.modsettings.large_mobile_image, '1200x2100'), 'center');

      if (breakpoint === 'sm') {
        if (this.modsettings.large_mobile_image && this.modsettings.large_mobile_image !== '') {
          return mobileImage;
        }
      }
      return  desktopImage;
    }

    smallTile1BackgroundImage(breakpoint: string) {
      let desktopImage = this.imageCrop(this.imageSize(this.modsettings.small_desktop_image_1, '1200x2100'), 'center');
      let mobileImage = this.imageCrop(this.imageSize(this.modsettings.small_mobile_image_1, '1200x2100'), 'center');

      if (breakpoint === 'sm') {
        if (this.modsettings.small_mobile_image_1 && this.modsettings.small_mobile_image_1 !== '') {
          return "background-image: url(" + mobileImage + ");";
        }
      }
      return "background-image: url(" + desktopImage + ");"
    }

    smallTile2BackgroundImage(breakpoint: string) {
      let desktopImage = this.imageCrop(this.imageSize(this.modsettings.small_desktop_image_2, '1200x2100'), 'center');
      let mobileImage = this.imageCrop(this.imageSize(this.modsettings.small_mobile_image_2, '1200x2100'), 'center');

      if (breakpoint === 'sm') {
        if (this.modsettings.small_mobile_image_2 && this.modsettings.small_mobile_image_2 !== '') {
          return "background-image: url(" + mobileImage + ");";
        }
      }
      return "background-image: url(" + desktopImage + ");"
    }

    hexToRgb(hex: string) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }

    get textboxBG() {
      let hexR = this.hexToRgb(this.modsettings.large_textbox_background_color)?.r;
      let hexG = this.hexToRgb(this.modsettings.large_textbox_background_color)?.g;
      let hexB = this.hexToRgb(this.modsettings.large_textbox_background_color)?.b;
      let brandR = this.hexToRgb(this.brandColor)?.r;
      let brandG = this.hexToRgb(this.brandColor)?.g;
      let brandB = this.hexToRgb(this.brandColor)?.b;
      let opacity = "0.8";

      if (this.modsettings.enable_large_textbox) {
        if (this.modsettings.large_textbox_background_color !== null) {
          return "background-color: rgba(" + hexR + "," + hexG + "," + hexB + "," + opacity + ");";

        }
        return "background-color: rgba(" + brandR + "," + brandG + "," + brandB + "," + opacity + ");";
      }
      return "";
    }

    get largeHeaderColor() {
      if (this.modsettings.large_header_text_color !== null) {
        return "color: " + this.modsettings.large_header_text_color + ";";        
      }
      return "color: var(--color-white);";
    }

    get largeBodyColor() {
      if (this.modsettings.large_body_text_color !== null) {
        return "color: " + this.modsettings.large_body_text_color + ";";        
      }
      return "color: var(--color-white);";
    }

    get largeCTA1Color() {
      let textColor = "var(--color-white)";
      let backgroundColor = "var(--color-primary-500)";
      if (this.modsettings.large_cta_1_text_color !== "" && this.modsettings.large_cta_1_text_color !== null) {
        textColor = this.modsettings.large_cta_1_text_color;
      }
      if (this.modsettings.large_cta_1_background_color !== "" && this.modsettings.large_cta_1_background_color !== null) {
        backgroundColor = this.modsettings.large_cta_1_background_color;
      }
      return "color: " + textColor + "; background-color: " + backgroundColor + ";";        
    }

    get largeCTA2Color() {
      let textColor = "var(--color-white)";
      let backgroundColor = "var(--color-primary-500)";
      if (this.modsettings.large_cta_2_text_color !== "" && this.modsettings.large_cta_2_text_color !== null) {
        textColor = this.modsettings.large_cta_2_text_color;
      }
      if (this.modsettings.large_cta_2_background_color !== "" && this.modsettings.large_cta_2_background_color !== null) {
        backgroundColor = this.modsettings.large_cta_2_background_color;
      }
      return "color: " + textColor + "; background-color: " + backgroundColor + ";";        
    }

    get sectionBackgroundColor() {
      if (this.modsettings.background_color !== "" && this.modsettings.background_color !== null) {
        return "background-color: " + this.modsettings.background_color + ";";        
      }
      return "background-color: var(--color-gray-200);";        
    }

    get smallTile1Background() {
      if (this.modsettings.small_textbox_background_color_1 !== null) {
        return "background-color: " + this.modsettings.small_textbox_background_color_1 + ";";
      }
      return "background-color: " + this.brandColor + ";";
    }

    get smallTile2Background() {
      if (this.modsettings.small_textbox_background_color_2 !== null) {
        return "background-color: " + this.modsettings.small_textbox_background_color_2 + ";";
      }
      return "background-color: " + this.brandColor + ";";
    }

    get smallTile1TextColor() {
      if (this.modsettings.small_header_text_color_1 !== null) {
        return "color: " + this.modsettings.small_header_text_color_1 + ";";
      }
      return "color: var(--color-white);";
    }

    get smallTile2TextColor() {
      if (this.modsettings.small_header_text_color_2 !== null) {
        return "color: " + this.modsettings.small_header_text_color_2 + ";";
      }
      return "color: var(--color-white);";
    }

    get smallTile1PreheaderColor() {
      if (this.modsettings.small_preheader_text_color_1 !== null) {
        return "color: " + this.modsettings.small_preheader_text_color_1 + ";";
      }
      return "color: var(--color-white);";
    }

    get smallTile2PreheaderColor() {
      if (this.modsettings.small_preheader_text_color_2 !== null) {
        return "color: " + this.modsettings.small_preheader_text_color_2 + ";";
      }
      return "color: var(--color-white);";
    }

    get staticHoverTile1() {
      if (this.modsettings.static_hover_tile_1 === true) {
        this.showSmallTile1 = true;
      }
      return this.showSmallTile1;
    }

    get staticHoverTile2() {
      if (this.modsettings.static_hover_tile_2 === true) {
        this.showSmallTile2 = true;
      }
      return this.showSmallTile2;
    }

    playButtonGridPosition(breakpoint: string) {
      if (window.navigator.userAgent.includes('Mozilla')) {
        if (breakpoint === 'sm') {
          return "position: relative; left: calc(100% - 40px); top: -640px;"
        }
        if (breakpoint === 'md' || breakpoint === 'lg') {
          return "position: relative; right: -40px; top: -840px;"
        }
        return "position: relative; right: -40px; top: -840px;"
      }
      if (breakpoint === 'sm') {
        return "right: 16px";
      }
      if (breakpoint === 'md' || breakpoint === 'lg') {
        return "right: calc(33.33% + 38px);";
      }
      return "right: calc(33.33% + 77px);";
    }

    playButtonSinglePosition(breakpoint: string) {
      if (breakpoint === 'sm') {
        return "right: 16px";
      }
      if (breakpoint === 'md' || breakpoint === 'lg') {
        return "right: 40px";
      }
      let horizontalPadding = 160;
      let widthDifference = window.innerWidth - document.querySelector('div[data-vue-component="TileGrid"] .single-image')!.clientWidth - horizontalPadding;
      return "right: " + widthDifference + "px";
    }

    mounted() {
      this.findBrand();
    }
  }

  return new Vue(TileGrid);
}
