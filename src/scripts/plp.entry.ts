/* eslint-disable */
import renderModule from './lib/renderModule';
import * as PLP from './modules/plp/plp';
import * as ProductCarousel from './modules/collection-main/ProductCarousel';
import * as CategoryCarousel from './modules/collection-main/CategoryCarousel';
import '@/scripts/lib/filters';
import trackQuickShop from './lib/quickShop';

window.addEventListener('DOMContentLoaded', () => {
  renderModule(PLP);
  renderModule(ProductCarousel);
  renderModule(CategoryCarousel);
  window.__trackQuickShop = trackQuickShop;
})
