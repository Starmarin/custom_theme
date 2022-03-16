import Vue from 'vue';
import Component from 'vue-class-component';
import animateScrollTo from 'animated-scroll-to';
import BtnPrimaryLink from '../../components/BtnPrimaryLink';
import BtnTertiaryLink from '../../components/BtnTertiaryLink';
import Icon from '../../components/Icon.vue';

export const NAME = 'Hero';
export default function(el: HTMLElement) {
  @Component({
    name: NAME,
    el,
    components: {
      Icon,
      BtnPrimaryLink,
      BtnTertiaryLink,
    },
  })
  class Hero extends Vue {
    scrollDown() {
      animateScrollTo(this.$el.getBoundingClientRect().height);
    }
  }

  return new Vue(Hero);
}
