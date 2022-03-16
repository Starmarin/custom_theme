/* eslint-disable */
import Vue from 'vue';
import renderModule from './lib/renderModule';
import * as Article from './modules/article/Article';
import Icon from './components/Icon.vue';
import '@/scripts/lib/filters';
Vue.component('Icon', Icon);

window.addEventListener('DOMContentLoaded', () => {
  renderModule(Article);
});
