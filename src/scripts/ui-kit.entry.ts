/* eslint-disable quotes */
import Vue from 'vue';
import UiKit from './UiKit.vue';
import Btn from './components/Btn.vue';
import AsyncButton from './components/AsyncButton.vue';
import BtnPrimary from './components/BtnPrimary';
import BtnSecondary from './components/BtnSecondary';
import BtnTertiary from './components/BtnTertiary';
import BtnPill from './components/BtnPill';
import BtnLink from './components/BtnLink';
import InputText from './components/InputText.vue';
import LinkPrimary from './components/LinkPrimary.vue';
import VariantBtn from './components/VariantBtn.vue';
import Dropdown from './components/Dropdown.vue';
import Icon from './components/Icon.vue';
import FilterTag from './components/FilterTag.vue';
import VariantSwatch from './components/VariantSwatch.vue';

Vue.config.productionTip = false;

Vue.component('Btn', Btn);
Vue.component('AsyncButton', AsyncButton);
Vue.component('BtnPrimary', BtnPrimary);
Vue.component('BtnSecondary', BtnSecondary);
Vue.component('BtnTertiary', BtnTertiary);
Vue.component('BtnPill', BtnPill);
Vue.component('BtnLink', BtnLink);
Vue.component('InputText', InputText);
Vue.component('LinkPrimary', LinkPrimary);
Vue.component('VariantBtn', VariantBtn);
Vue.component('Dropdown', Dropdown);
Vue.component('FilterTag', FilterTag);
Vue.component('VariantSwatch', VariantSwatch);
Vue.component('Icon', Icon);

new Vue({
  render: (h) => h(UiKit),
}).$mount('#ui-kit');
