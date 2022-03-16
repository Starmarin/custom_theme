// import './superstar-carousel.scss';

import { Vue, Component, Prop } from 'vue-property-decorator';
import VueMq from 'vue-mq';

Vue.use(VueMq, {
  breakpoints: {
    sm: 650,
    md: 991,
    lg: Infinity,
  },
  defaultBreakpoint: 'sm'
})

export const NAME = 'AllSuperstarsBanner'; 

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
  class AllSuperstarsBanner extends Vue {
    @Prop() readonly mod_settings!: any;

    singleBackgroundImage(breakpoint: string) {
      let desktopImage = this.mod_settings.desktop_background_image;
      let mobileImage = this.mod_settings.mobile_background_image;
      
      if (desktopImage !== null && desktopImage !== undefined) {
        if (breakpoint === 'sm') {
          if (this.mod_settings.mobile_background_image !== '') {
            return "background-image: url(" + mobileImage + ");";
          }
          return "background-image: url(" + desktopImage + ");";
        }
        return "background-image: url(" + desktopImage + ");";
      }
      return "background-color: " + this.mod_settings.background_color + ";";
    }

    mounted() {
    }
  }

  return new Vue(AllSuperstarsBanner);
}
