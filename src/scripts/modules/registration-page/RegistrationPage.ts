import Vue from 'vue';
import Component from 'vue-class-component';
// import { Prop } from 'vue-property-decorator';
import getProps from '../../lib/getProps';
import InputText from '../../components/InputText.vue';
import Dropdown from '../../components/Dropdown.vue';
import BtnPrimary from '../../components/BtnPrimary';
import Icon from '../../components/Icon.vue';

export const NAME = 'RegistrationPage';

export default function(el: HTMLElement) {
  @Component({
    name: NAME,
    el,
    propsData: getProps(el),
    components: { InputText, Dropdown, BtnPrimary, Icon },
  })
  class RegistrationPage extends Vue {
    activeSubject = '';

    subjectOptions = [
      { label: 'General', labelRight: '', value: 'general' },
      { label: 'Shipping Questions', labelRight: '', value: 'shipping' },
      { label: 'Ticketing', labelRight: '', value: 'ticketing' },
      { label: 'Website Questions', labelRight: '', value: 'website' }
    ]

    onInputChange({ name, value }: any) {
      this.activeSubject = value;
      const match = /\D\[(\D+)\]/.exec(name)
      if (!match || !match[1]) {
        return false
      }

      return match;
    }
  
  }

  return new Vue(RegistrationPage);
}
