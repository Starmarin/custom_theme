import './countdown.scss';

import { Vue, Component, Prop } from 'vue-property-decorator';
import Countdown from '../../components/Countdown.vue';

export const NAME = 'GlobalCountdown';

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
     Countdown
    },
    directives: {
    },
  })
  class GlobalCountdown extends Vue {
    @Prop() readonly mod_settings!: any;

    visible = this.mod_settings.enable_global_countdown;

    hideTimer(){
      this.visible = false;
    }

    get backgroundImage(){
      if(window.innerWidth < 650){
        return `background-image: url(${this.mod_settings.global_countdown_mobile_bg_image}); background-color: ${this.mod_settings.global_countdown_bg_color}`
      }
      return `background-image: url(${this.mod_settings.global_countdown_bg_image}); background-color: ${this.mod_settings.global_countdown_bg_color}`
    }

    mounted() {
      this.visible = this.mod_settings.enable_global_countdown;
    }
  }

  return new Vue(GlobalCountdown);
}
