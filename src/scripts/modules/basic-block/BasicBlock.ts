import { Vue, Component } from 'vue-property-decorator';
import LinkPrimary from '../../components/LinkPrimary.vue';
import BtnPrimaryLink from '../../components/BtnPrimaryLink';

export const NAME = 'BasicBlock';
export default function(el: HTMLElement) {
  @Component({
    name: NAME,
    el,
    components: {
      BtnPrimaryLink,
      LinkPrimary,
    },
  })
  class BasicBlock extends Vue {}

  return new Vue(BasicBlock);
}
