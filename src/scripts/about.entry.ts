/* eslint-disable */
import renderModule from './lib/renderModule';
import * as SimpleCarousel from './modules/simple-carousel/SimpleCarousel';
import * as Hero from './modules/hero/Hero';
import * as BasicBlock from './modules/basic-block/BasicBlock';

window.addEventListener('DOMContentLoaded', () => {
  renderModule(Hero);
  renderModule(BasicBlock);
  renderModule(SimpleCarousel);
});
