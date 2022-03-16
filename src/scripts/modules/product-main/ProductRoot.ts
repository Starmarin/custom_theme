import './product-main.scss';
import Vue from 'vue';
import Component from 'vue-class-component';
import ProductGallery from './ProductGallery.vue';
import ProductTitlePrice from './ProductTitlePrice.vue';
import ProductCompleteLook from './ProductCompleteLook.vue';
import ProductCrossSells from './ProductCrossSells.vue';
import ProductHero from './ProductHero.vue';
import ProductBanner from './ProductBanner.vue';
import ProductForm from './ProductForm.vue';
import { ProductProvider, store } from './ProductProvider';
import TransitionPromiseFade from '../../components/TransitionPromiseFade.vue';
import Countdown from '../../components/Countdown.vue';
import ProgressBar from '../../components/ProgressBar.vue';
import LinkPrimary from '../../components/LinkPrimary.vue';
import ProductLifestyle from './ProductLifestyle.vue';
import ProductFeatures from './ProductFeatures.vue';
import ProductRecommendations from './ProductRecommendations.vue';
import ProductRecommendationsShopifyAPI from './ProductRecommendationsShopifyAPI.vue';
import ProductBriefValueProps from './ProductBriefValueProps.vue';
import ProductVideoImageSlider from './ProductVideoImageSlider.vue';
import ProductAccordions from './ProductAccordions.vue';
import ProductBreadcrumbs from './ProductBreadcrumbs.vue';
import '../../lib/filters';

export const NAME = 'ProductRoot';

export default function(el: HTMLElement) {
  @Component({
    name: NAME,
    el,
    components: {
      ProductGallery,
      ProductTitlePrice,
      ProductCompleteLook,
      ProductCrossSells,
      ProductHero,
      ProductBanner,
      ProductForm,
      ProductLifestyle,
      ProductFeatures,
      TransitionPromiseFade,
      ProductRecommendations,
      ProductRecommendationsShopifyAPI,
      ProductVideoImageSlider,
      ProductAccordions,
      LinkPrimary,
      Countdown,
      ProgressBar,
      ProductProvider,
      ProductBriefValueProps
    },
    store,
  })
  class ProductRoot extends Vue {}

  return new Vue(ProductRoot);
}
