/* eslint-disable */
import Vue from 'vue';
import renderModule from './lib/renderModule';
import * as ProductRoot from './modules/product-main/ProductRoot';
import { ProductProvider } from './modules/product-main/ProductProvider';
import ProductBreadCrumbs from './modules/product-main/ProductBreadcrumbs.vue';
import directiveScrollLock from './lib/directiveScrollLock';
import VueLazyload from 'vue-lazyload';

const BREADCRUMBS_PROPS = {
  links: [
    {
      id: 'product',
      text: 'Product',
    },
    {
      id: 'features',
      text: 'Features',
    },
    {
      id: 'customize',
      text: 'Customize',
    },
    {
      id: 'specs',
      text: 'Specs',
    },
  ],
};

Vue.use(VueLazyload);

Vue.directive('scroll-lock', directiveScrollLock('html'));

window.addEventListener('DOMContentLoaded', () => {
  renderModule(ProductRoot);

  // we need to render this component in the snippet 'nav--root' so css "position: sticky" works correctly
  new Vue({
    render(h) {
      return h(ProductProvider, [
        h(ProductBreadCrumbs, {
          props: BREADCRUMBS_PROPS,
        }),
      ]);
    },
  }).$mount('#breadcrumbs-mount'); 
});
