import './collection-blocks.scss';

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

export const NAME = 'CollectionBlocks';

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
  class CollectionBlocks extends Vue {
    @Prop() readonly modsettings!: any;

    @Prop() readonly blocks!: Array<any>;

    get preHeaderColors() {
      if (this.modsettings.preheader_text_color !== '') {
        return "color: " + this.modsettings.preheader_text_color + "; border-color: " + this.modsettings.preheader_border_color;
      }
      return "color: var(--color-gray-900); border-color: transparent;";
    }

    hexToRgb(hex: string) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }

    collectionBackgroundImage(blockIndex: number, breakpoint: string) {
      if (breakpoint === 'sm') {
        if (this.blocks[blockIndex].settings.mobile_image !== '') {
          return "background-image: url(" + this.blocks[blockIndex].settings.mobile_image + ");"          
        }
      }
      return "background-image: url(" + this.blocks[blockIndex].settings.desktop_image + ");"
    }

    blockColors(blockIndex: number, breakpoint: string) {
      let hexR = this.hexToRgb(this.blocks[blockIndex].settings.block_header_background_color)?.r;
      let hexG = this.hexToRgb(this.blocks[blockIndex].settings.block_header_background_color)?.g;
      let hexB = this.hexToRgb(this.blocks[blockIndex].settings.block_header_background_color)?.b;
      let opacity = "0.8";

      if (breakpoint === 'sm') {
        return "color: " + this.blocks[blockIndex].settings.block_header_color + "; background-color: " + this.blocks[blockIndex].settings.block_header_background_color + ";"
      }
      return "color: " + this.blocks[blockIndex].settings.block_header_color + "; background-color: rgba(" + hexR + "," + hexG + "," + hexB + "," + opacity + ");";
    }

    get sectionBackground() {
      if (this.modsettings.background_color !== '' && this.modsettings.background_color !== null) {
        return "background-color: " + this.modsettings.background_color + ";";        
      }
      return "background-color: var(--color-white);";
    }

    get shopAllColor() {
      return "color: " + this.modsettings.shop_all_text_color + ";";
    }

    get headerTextColor() {
      return "color: " + this.modsettings.header_text_color + ";";
    }

    mounted() {
    }
  }
  return new Vue(CollectionBlocks);
}
