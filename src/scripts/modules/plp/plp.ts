import './plp.scss';

/* eslint-disable */
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import { FadeTransition, SlideXLeftTransition } from 'vue2-transitions';
import { mapState, mapActions, mapMutations } from 'vuex';
import debounce from 'lodash/debounce';
import TransitionExpand from '../../components/TransitionExpand.vue';
import LinkPrimary from '../../components/LinkPrimary.vue';
import Icon from '../../components/Icon.vue';
import FilterDropdown from './FilterDropdown.vue';
import FilterTag from '../../components/FilterTag.vue';
import BtnTertiaryLink from '../../components/BtnTertiaryLink';
import BtnSecondary from '../../components/BtnSecondary';
import ProductCard from '../product-card/ProductCard';
import SuperCollectionGroup from '../supercollection-group/SuperCollectionGroup';
import store from './store';
import { decode } from './util';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const vClickOutside = require('v-click-outside');
declare var __COLLECTION__SUPER__: boolean;

function getProps(el: HTMLElement) {
  if (!el.dataset.props) return {};
  return JSON.parse(el.dataset.props);
}  

export const NAME = 'Plp';
const PAGINATION_SIZE = 12;

export default function (el: HTMLElement) {
  const PLPProps = Vue.extend({
    name: NAME,
    store: store(),
    el,
    propsData: getProps(el),
    directives: {
      clickOutside: vClickOutside.directive,
    },
    components: {
      LinkPrimary,
      Icon,
      BtnSecondary,
      FilterTag,
      FadeTransition,
      SlideXLeftTransition,
      ProductCard,
      SuperCollectionGroup,
      FilterDropdown,
      TransitionExpand,
      BtnTertiaryLink
    },
    computed: {
      ...mapState([
        'collection',
        'products',
        'plpsettings',
        'mounted',
        'ajaxing',
        'loading',
        'showFilterMenu',
        'selectedFacets',
        'sort',
        'facets',
        'mq',
        'page',
        'pages',
      ]),
      ...mapState({
        visibleProducts(state: any) {
          const currentPage = parseInt(this.page)
          const currentProducts = state.products.slice(PAGINATION_SIZE * (currentPage - 1), PAGINATION_SIZE * currentPage)
          return state.products;
        },
      }),
    },
    methods: {
      ...mapActions([
        'fetchCollection',
        'toggleFilterMenu',
      ]),
      ...mapMutations([
        'setCurrentPage',
      ]),
      injectPromos() {
        let promoOneActive = false;
        let promoTwoActive = document.querySelector('.promo-tile-2');
        let activeCollection = this.plpsettings;
        let stepSize = 2;
        let state = window.APPSTATE;
        if (window.innerWidth <= 767) {
          stepSize = 2;
        } else {
          stepSize = 3; 
        }
  
        if (activeCollection.metafields.promo_tile_1_image != null && activeCollection.metafields.promo_tile_1_image != "") {
          let promoTileElement = "";
          if (activeCollection.metafields.promo_tile_1_link !== null) {
            promoTileElement = "a";
          } else {
            promoTileElement = "div";
          }
          let promoTileOne = document.createElement(promoTileElement);

          promoTileOne.setAttribute("href", activeCollection.metafields.promo_tile_1_link);
          promoTileOne.setAttribute("class", "promo-tile-1 boost-pfs-filter-product-item boost-pfs-filter-grid-width-3 boost-pfs-filter-grid-width-mb-2")
          promoTileOne.classList.add(activeCollection.metafields.promo_tile_1_size);
          let promoTextColor = activeCollection.metafields.promo_tile_1_text_color.toLowerCase();
          let preHeader = "";
          if (activeCollection.metafields.promo_tile_1_preheader != null) {
            preHeader = `<p class="font-primary font-bold text-xs md:text-md tracking-header uppercase text-${promoTextColor} py-1 md:py-e6 border-t-2 border-b-2 border-util-sale">${activeCollection.metafields.promo_tile_1_preheader}</p>`;
          }
          let header = "";
          if (activeCollection.metafields.promo_tile_1_header != null) {
            header = `<p class="font-primary font-bold text-md md:text-xl uppercase tracking-header mt-1 md:mt-4 text-${promoTextColor}">${activeCollection.metafields.promo_tile_1_header}</p>`;
          }
          let cta = "";
          if (activeCollection.metafields.promo_tile_1_link != null) {
            if (activeCollection.metafields.promo_tile_1_cta_text != null) {
              cta = `<a class="text-white bg-primary-500 font-primary font-bold uppercase text-megamenu_top tracking-header absolute bottom-20 px-4 md:px-15 py-4" href="${activeCollection.metafields.promo_tile_1_link}">${activeCollection.metafields.promo_tile_1_cta_text}</a>`;
            } else {
              cta = `<a class="text-white bg-primary-500 font-primary font-bold uppercase text-megamenu_top tracking-header absolute bottom-20 px-4 md:px-15 py-4" href="${activeCollection.metafields.promo_tile_1_link}">${state.language.shop_now}</a>`;              
            }
          }
          let orderOne = "order: " + (parseInt(activeCollection.metafields.promo_tile_1_location) * stepSize - stepSize - 1).toString(); 
          promoTileOne.setAttribute("style", orderOne);
          promoTileOne.innerHTML = `
            <div class="h-full bg-cover flex flex-col items-start justify-start py-5 px-4" style="background: url('${activeCollection.metafields.promo_tile_1_image}') no-repeat center; background-size: cover;">
              ${preHeader}
              ${header}
              ${cta}
            </div>
          `;
          if (!promoOneActive) {
            document.querySelector('.boost-pfs-filter-products')?.appendChild(promoTileOne);
            promoOneActive = true;
          }
        }

        if (activeCollection.metafields.promo_tile_2_image != null && activeCollection.metafields.promo_tile_2_image != "") {
          let promoTileElement = "";
          if (activeCollection.metafields.promo_tile_2_link !== null) {
            promoTileElement = "a";
          } else {
            promoTileElement = "div";
          }
          let promoTileTwo = document.createElement(promoTileElement);
          if (activeCollection.metafields.promo_tile_2_link !== null) {
            promoTileTwo = document.createElement("a");
          } else {
            promoTileTwo = document.createElement("div");
          }
          promoTileTwo.setAttribute("href", activeCollection.metafields.promo_tile_2_link);
          promoTileTwo.setAttribute("class", "promo-tile-2 boost-pfs-filter-product-item boost-pfs-filter-grid-width-3 boost-pfs-filter-grid-width-mb-2")
          promoTileTwo.classList.add(activeCollection.metafields.promo_tile_2_size);
          let promoTextColor = activeCollection.metafields.promo_tile_2_text_color.toLowerCase();
          let preHeader = "";
          if (activeCollection.metafields.promo_tile_2_preheader != null) {
            preHeader = `<p class="font-primary font-bold text-xs md:text-md tracking-header uppercase text-${promoTextColor} py-1 md:py-e6 border-t-2 border-b-2 border-util-sale">${activeCollection.metafields.promo_tile_2_preheader}</p>`;
          }
          let header = "";
          if (activeCollection.metafields.promo_tile_2_header != null) {
            header = `<p class="font-primary font-bold text-md md:text-xl uppercase tracking-header mt-1 md:mt-4 text-${promoTextColor}">${activeCollection.metafields.promo_tile_2_header}</p>`;
          }
          let cta = "";
          if (activeCollection.metafields.promo_tile_2_link != null) {
            if (activeCollection.metafields.promo_tile_1_cta_text != null) {
              cta = `<a class="text-white bg-primary-500 font-primary font-bold uppercase text-megamenu_top tracking-header absolute bottom-20 px-4 md:px-15 py-4" href="${activeCollection.metafields.promo_tile_2_link}">${activeCollection.metafields.promo_tile_2_cta_text}</a>`;
            } else {
              cta = `<a class="text-white bg-primary-500 font-primary font-bold uppercase text-megamenu_top tracking-header absolute bottom-20 px-4 md:px-15 py-4" href="${activeCollection.metafields.promo_tile_2_link}">${state.language.shop_now}</a>`;
            }
          }

          let orderTwoA = "order: " + (parseInt(activeCollection.metafields.promo_tile_2_location) * stepSize - stepSize - 1).toString(); 
          let orderTwoB = "order: " + (parseInt(activeCollection.metafields.promo_tile_2_location) * stepSize - stepSize - 2).toString(); 

          if (promoOneActive) {
            promoTileTwo.setAttribute("style", orderTwoB);
          } else {
            promoTileTwo.setAttribute("style", orderTwoA);
          }
          promoTileTwo.innerHTML = `
            <div class="h-full bg-cover flex flex-col items-start justify-start py-5 px-4" style="background: url('${activeCollection.metafields.promo_tile_2_image}') no-repeat center; background-size: cover;">
              ${preHeader}
              ${header}
              ${cta}
            </div>
          `;
          if (promoTwoActive == null) {
            document.querySelector('.boost-pfs-filter-products')?.appendChild(promoTileTwo);
          }
        }
      },
      initResizeWatcher() {
        window.addEventListener(
          'resize',
          debounce(() => {
            this.reRenderPromos(window.innerWidth);
          }),
        );
      },
      reRenderPromos(width: number) {
        let promoOneActive = false;
        let activeCollection = this.plpsettings;
        if (document.querySelector(".promo-tile-1")) {
          promoOneActive = true;
          let promoTileOne = document.querySelector(".promo-tile-1");
          let newOrderOne = "0";
          if (width < 750) {
            // calculate mobile order
            newOrderOne = "order: " + (parseInt(activeCollection.metafields.promo_tile_1_location) * 2 - 3).toString();
          } else {
            // calculate desktop order
            newOrderOne = "order: " + (parseInt(activeCollection.metafields.promo_tile_1_location) * 3 - 4).toString();
          }
          promoTileOne!.setAttribute('style', newOrderOne);
        }

        if (document.querySelector(".promo-tile-2")) {
          let promoTileTwo = document.querySelector(".promo-tile-2");
          let newOrderTwo = "0";
          if (width < 750) {
            // calculate mobile order
            if (promoOneActive) {
              newOrderTwo = "order: " + (parseInt(activeCollection.metafields.promo_tile_2_location) * 2 - 4).toString(); 
            } else {
              newOrderTwo = "order: " + (parseInt(activeCollection.metafields.promo_tile_2_location) * 2 - 3).toString();
            }
          } else {
            // calculate desktop order
            if (promoOneActive) {
              newOrderTwo = "order: " + (parseInt(activeCollection.metafields.promo_tile_2_location) * 3 - 5).toString();
            } else {
              newOrderTwo = "order: " + (parseInt(activeCollection.metafields.promo_tile_2_location) * 3 - 4).toString();
            }
          }
          promoTileTwo!.setAttribute('style', newOrderTwo);
        }

      }
    },
    mounted() {
      const checkBoost = () => {
        if (document.querySelector('.boost-pfs-filter-products .boost-pfs-action-list-enabled')) {
          this.injectPromos();
          this.initResizeWatcher();
        } else {
          window.setTimeout(function () {
            checkBoost();
          }, 500)
        }
      }
      checkBoost();
    },
  });
  
  @Component({
    name: NAME,
    el,
    propsData: getProps(el)
  })
  class PLP extends PLPProps {
    @Prop() readonly plpsettings!: any;

    @Prop() readonly collectionProducts!: Array<any>;

    sortOpen = false;

    showSubCat = false;

    state = window.APPSTATE;

    getImpressions() {
      return this.collectionProducts.map((product: any) => {
        return {
          'list': 'product-card',
          'position': "", 
          'id': product.id,
          'name': `${product.title}`,
          'category': `${product.type}`,
          'brand': `${product.vendor}` || 'WWE',
          'variant': product.variants[0]?.id,
          'price': product.variants[0]?.price
        }
      })
    }

    getDataLayer() {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event': 'product-impression',
        'ecommerce': {
          'currencyCode': window.Shopify.currency.active,
          'impressions': this.getImpressions()
        }
      });
    }

    beforeMount() {
      this.getDataLayer()
    }
  }

  return new Vue(PLP);
}
