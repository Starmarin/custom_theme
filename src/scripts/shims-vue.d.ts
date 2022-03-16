declare module '*.vue' {
  import Vue from 'vue';

  export default Vue;
}

declare module 'vue2-transitions';
declare module 'aos';
declare module 'vue-mq';
declare module 'gsap';
declare module 'smoothscroll-polyfill';
declare module 'vue-focus-lock';
declare module 'vue-lazyload';
declare module 'swiper/swiper-bundle';
declare module '*tailwind.config.js';
declare module 'papaparse';
declare module 'vueinview';
declare module 'body-scroll-lock';

interface Window {
  affirm: any;
  Shopify: any;
}
