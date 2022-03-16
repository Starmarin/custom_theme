/* eslint-disable */
import '../styles/tailwind.scss';
import Vue from 'vue';
import AOS from 'aos';
import LazyLoad from 'vue-lazyload';
import TransitionMenu from './components/TransitionMenu.vue';
import TransitionExpand from './components/TransitionExpand.vue';
import AccordionGroup from './components/AccordionGroup.vue';
import LinkPrimary from './components/LinkPrimary.vue';
import LinkPrimaryLeft from './components/LinkPrimaryLeft.vue';
import Accordion from './components/Accordion.vue';
import Icon from './components/Icon.vue';
import Btn from './components/Btn.vue';
import Countdown from './components/Countdown.vue';
import ProgressBar from './components/ProgressBar.vue';
import BtnPrimary from './components/BtnPrimary';
import BtnPrimaryLink from './components/BtnPrimaryLink';
import BtnSecondary from './components/BtnSecondary';
import BtnSecondaryLink from './components/BtnSecondaryLink';
import BtnTertiary from './components/BtnTertiary';
import BtnTertiaryLink from './components/BtnTertiaryLink';
import BtnPill from './components/BtnPill';
import InputText from './components/InputText.vue';
import SideCartRoot from './modules/side-cart/SideCartRoot.vue';
import CartRoot from './modules/cart/CartRoot.vue';
import renderModule from './lib/renderModule';
import directiveScrollLock from './lib/directiveScrollLock';
import * as PromoBarModule from './modules/promo-bar/PromoBar';
import * as BottomPromoBarModule from './modules/bottom-promo-bar/BottomPromoBar';
import * as NavBarModule from './modules/nav-bar/NavBar';
import * as FooterModule from './modules/footer/Footer';
import * as HeroCarousel from './modules/hero-carousel/HeroCarousel';
import * as ButtonCollection from './modules/button-collection/ButtonCollection';
import * as CollectionBlocks from './modules/collection-blocks/CollectionBlocks';
import * as FiftyFifty from './modules/fifty-fifty/FiftyFifty';
import * as SuperstarBanner from './modules/superstar-banner/SuperstarBanner';
import * as TileGrid from './modules/tile-grid/TileGrid';
import * as FeaturedProduct from './modules/featured-product/FeaturedProduct';
import * as GlobalCountdown from './modules/countdown-timer/Countdown';
import * as SuperstarCarousel from './modules/superstar-carousel/SuperstarCarousel';
import * as PromoBanner from './modules/promo-banner/PromoBanner';
import * as HPProductCarousel from './modules/product-carousel/ProductCarousel';
import * as UGCGallery from './modules/ugc-gallery/UGCGallery';
import * as Hero from './modules/hero/Hero';
import * as AccountBase from './modules/account/AccountBase';
import * as HpColumns from './modules/hp-columns/HpColumns';
import * as AllSuperstarsBanner from './modules/all-superstars-banner/AllSuperstarsBanner';
import * as SuperstarGrid from './modules/superstar-grid/SuperstarGrid';
import * as FAQ from './modules/faq/FAQ';
import * as FAQNavigation from './modules/faq/FAQNavigation';
import FocusLock from 'vue-focus-lock';
import '@/scripts/lib/filters';
import bus from './lib/bus';
import AppState from './lib/appState';
const VScrollLock = require('v-scroll-lock');

Vue.use(VScrollLock);
Vue.use(LazyLoad);

// Creating BUS for cross bundle event sharing;
window.BUS = bus;
window.APPSTATE = AppState;

Vue.directive('scroll-lock', directiveScrollLock('html'));

Vue.component('FocusLock', FocusLock);
Vue.component('TransitionMenu', TransitionMenu);
Vue.component('TransitionExpand', TransitionExpand);
Vue.component('AccordionGroup', AccordionGroup);
Vue.component('Accordion', Accordion);
Vue.component('Countdown', Countdown);
Vue.component('ProgressBar', ProgressBar);
Vue.component('Icon', Icon);
Vue.component('BtnPill', BtnPill);
Vue.component('LinkPrimary', LinkPrimary);
Vue.component('LinkPrimaryLeft', LinkPrimaryLeft);
Vue.component('Btn', Btn);
Vue.component('BtnPrimary', BtnPrimary);
Vue.component('BtnPrimaryLink', BtnPrimaryLink);
Vue.component('BtnSecondary', BtnSecondary);
Vue.component('BtnSecondaryLink', BtnSecondaryLink);
Vue.component('BtnTertiary', BtnTertiary);
Vue.component('BtnTertiaryLink', BtnTertiaryLink);
Vue.component('InputText', InputText);


window.addEventListener('DOMContentLoaded', () => {
  renderModule(Hero);
  renderModule(PromoBarModule);
  renderModule(BottomPromoBarModule);
  renderModule(NavBarModule);
  renderModule(FooterModule);
  renderModule(SuperstarCarousel);
  renderModule(PromoBanner);
  renderModule(HPProductCarousel);
  renderModule(HeroCarousel);
  renderModule(ButtonCollection);
  renderModule(UGCGallery);
  renderModule(CollectionBlocks); 
  renderModule(FiftyFifty);
  renderModule(SuperstarBanner);
  renderModule(TileGrid);
  renderModule(FeaturedProduct);
  renderModule(GlobalCountdown);
  renderModule(AccountBase);
  renderModule(HpColumns);
  renderModule(AllSuperstarsBanner);
  renderModule(SuperstarGrid);
  renderModule(FAQ);
  renderModule(FAQNavigation);

  document.querySelector('html')?.classList.add('vue-loaded');
});

window.addEventListener('load', () => {
  document.querySelector('html')?.classList.add('loaded');
});

document.querySelector('html')?.classList.remove('no-js');

AOS.init({
  delay: 100,
});

new SideCartRoot();
new CartRoot();
