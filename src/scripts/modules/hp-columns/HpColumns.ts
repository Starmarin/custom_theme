import Vue from 'vue';
import { Prop } from 'vue-property-decorator';
import Component, { mixins } from 'vue-class-component';
import getProps from '../../lib/getProps';
import LazyLoad from '../../components/LazyLoad';

export const NAME = 'HpColumns';

export default function (el: HTMLElement) {
  @Component({
    name: NAME,
    el,
    propsData: getProps(el),
  })
  class HpColumns extends mixins(LazyLoad) {
    @Prop() readonly modsettings!: any;

    @Prop() readonly blocks!: any;

    aosDuration(columnIndex: number) {
      return 750 * columnIndex;
    }

    textContainerStyle(columnIndex: number) {
      return "background-color: " + this.blocks[columnIndex].settings.column_color_text_container_bg + ";";
    }

    ctaColor1(columnIndex: number) {
      return "background-color: " + this.blocks[columnIndex].settings.column_color_cta1 + "; color: " +  this.blocks[columnIndex].settings.column_text_color_cta1 + ";";
    }

    ctaColor2(columnIndex: number) {
      return "background-color: " + this.blocks[columnIndex].settings.column_color_cta2 + "; color: " +  this.blocks[columnIndex].settings.column_text_color_cta2 + ";";
    }

    captionStyle(columnIndex: number) {
      return "color: " + this.blocks[columnIndex].settings.column_color_text + "; text-align: " + this.modsettings.column_section_block_text_align;
    }

    imageSized(img: string, mobileSize: string, desktopSize: string) {
      if(window.innerWidth < 650) {
        return img ? img.replace(/\.(png|jpg|jpeg|gif|webp)/, mobileSize) : '';
      } 
      return img;
    }

    get sectionStyle() {
      let sectionBackgroundColor = "";
      if (this.modsettings.column_section_background_color !== '') {
        sectionBackgroundColor = this.modsettings.column_section_background_color;
      } else {
        sectionBackgroundColor = "var(--color-gray-200)";
      }
      return "background-color: " + sectionBackgroundColor + "; margin-top: " + this.modsettings.column_section_margin_top + "; margin-bottom: " + this.modsettings.column_section_margin_bottom + ";";
    }

    mounted() {
    }

  }
  return new Vue(HpColumns);
}