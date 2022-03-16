import Vue from 'vue';
import Component from 'vue-class-component';
// import { Prop } from 'vue-property-decorator';
import getProps from '../../lib/getProps';
import BtnPrimaryLink from '../../components/BtnPrimaryLink';

export const NAME = 'ErrorPage';

export default function(el: HTMLElement) {
  @Component({
    name: NAME,
    el,
    propsData: getProps(el),
    components: { BtnPrimaryLink },
  })
  class ErrorPage extends Vue {}

  return new Vue(ErrorPage);
}
