/* eslint-disable no-underscore-dangle */
import Vue from 'vue';
import zip from 'lodash/zip';
import formatRepeatable from '../../lib/formatRepeatables';
import BaseVuexModule from '../../lib/BaseVuexModule';
import cart from '../../lib/cart';
import appState from '../../lib/appState';

const TAG_NEW = 'new';

interface RootState {
  product: ShopifyProduct;
  selectedOptions: string[];
  selectedVariant?: ShopifyVariant;
  quantity: number;
  sellingPlan?: any;
  crossProductPrice: number;
  customer?: any;
  productPromise: Promise<Function> | null;
  linkedProducts?: string[];
  collection: ShopifyCollection | null;
  compareUrl?: string;
  sizeChart?: object;
}

function updateUrl(collectionHandle: string | undefined, product: ShopifyProduct, variant?: ShopifyVariant) {
  const collectionUrl = collectionHandle ? `/collections/${collectionHandle}` : '';
  variant = variant || product.selected_or_first_available_variant;
  const url = `${collectionUrl + product.url}?variant=${variant.id}`;
  window.history.replaceState({ handle: product.handle }, product.title, url);
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * Mutations * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function SET_QUANTITY(state: RootState, value: number) {
  state.quantity = value;
}

function SET_CROSSPRODUCT_PRICE(state: RootState, value: number) {
  state.crossProductPrice = value;
}

function SET_SELLING_PLAN(state: RootState, value: number) {
  state.sellingPlan = value;
}

function SET_OPTION_BY_INDEX(state: RootState, { index, value }: any) {
  Vue.set(state.selectedOptions, index, value);
}

function SET_SELECTED_VARIANT(state: RootState, selectedVariant?: ShopifyVariant) {
  state.selectedVariant = selectedVariant;
  updateUrl(state.collection?.handle, state.product, selectedVariant);
  window.KlarnaOnsiteService = window.KlarnaOnsiteService || [];
  window.KlarnaOnsiteService.push({ eventName: 'refresh-placements' });
}

function SET_PRODUCT(state: RootState, product: ShopifyProduct) {
  state.selectedVariant = product.selected_or_first_available_variant;
  state.selectedOptions = [...product.selected_or_first_available_variant.options];
  state.product = product;
  updateUrl(state.collection?.handle, product);
}

function SET_PRODUCT_PROMISE(state: RootState, promise: Promise<Function>) {
  state.productPromise = promise;
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * Actions * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function setOptionByIndex({ commit, dispatch }: any, payload: any) {
  commit('SET_OPTION_BY_INDEX', payload);
  dispatch('setSelectedVariant');
}

function setQuantity({ commit }: any, payload: number) {
  commit('SET_QUANTITY', payload);
}

function setCrossProductPrice({ commit }: any, payload: number) {
  commit('SET_CROSSPRODUCT_PRICE', payload);
}

function setSellingPlan({ commit }: any, payload: number) {
  commit('SET_SELLING_PLAN', payload);
}

function setSelectedVariant({ state, commit, dispatch }: any) {
  let filteredVariants = [...state.product.variants];

  state.selectedOptions.forEach((selectedOptionValue: string, optIndex: number) => {
    filteredVariants = filteredVariants.filter((variant) => variant.options[optIndex] === selectedOptionValue);
  });

  commit('SET_SELECTED_VARIANT', filteredVariants[0]);
}

function onProductChange({ commit, state }: any, productHandle: string) {
  console.log('onProductChange');
  const productDataPromise = fetch(`/products/${productHandle}?view=json-data`)
    .then((res) => (res.ok ? res.json() : new Error('Failed to fetch product')))
    .then((jsonOrError: ShopifyProduct | Error) => {
      if (jsonOrError instanceof Error) {
        throw jsonOrError;
      } else {
        commit('SET_PRODUCT', jsonOrError);
      }
    });

  fetch(`/products/${productHandle}?view=reviews`)
    .then((res) => {
      if (res.ok) {
        return res.text();
      }
      throw new Error('failed to fetch productreviews');
    })
    .then((html) => {
      const reviewsWiget = document.querySelector('.yotpo.yotpo-main-widget');
      if (reviewsWiget) {
        reviewsWiget.outerHTML = html;
        yotpo.refreshWidgets();
      }
    })
    .catch(console.error);
  commit('SET_PRODUCT_PROMISE', productDataPromise);
}

function onAddToCart({ state }: { state: RootState }) {
  if (!state.selectedVariant) return;
  if (!state.sellingPlan) {
    cart.add({ id: state.selectedVariant.id, quantity: state.quantity })
      .then(() => {
        if (window.Cookies.get('bfx.isInternational') === 'false' || window.Cookies.get('bfx.isInternational') === undefined ) {
          window.APPSTATE.cart_modal = true;
        }
    });
  } else {
    cart.add({ id: state.selectedVariant.id, quantity: state.quantity, selling_plan: state.sellingPlan })
      .then(() => {
        if (window.Cookies.get('bfx.isInternational') === 'false' || window.Cookies.get('bfx.isInternational') === undefined ) {
          window.APPSTATE.cart_modal = true;
        }
    });
  }
}

function onBuyItNow({ state }: { state: RootState }) {
  if (!state.selectedVariant) return;

  cart.add({ id: state.selectedVariant.id, quantity: state.quantity });
  document.location.href = '/checkout';
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * Getters * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function onSale(state: RootState) {
  return state.selectedVariant && state.selectedVariant.price < (state.selectedVariant.compare_at_price || 0);
}

function taggedNew(state: RootState) {
  return state.product.tags.map((t) => t.toLowerCase()).includes(TAG_NEW);
}

function titleParts(state: RootState) {
  return state.product.title.split(':');
}

function briefValueProps(state: RootState) {
  const { numeric_value, numeric_value_unit } = state.product.metafields.accentuate;
  if (numeric_value && numeric_value_unit) {
    return zip(numeric_value, numeric_value_unit);
  }
  return [];
}

function mediaSet(state: RootState) {
  // all media if no option selected
  const optionIndex = state.product.options.map((opt) => opt.toLowerCase()).indexOf('color');
  if (!state.selectedOptions[optionIndex]) return state.product.media;

  let filteredMedia = state.product.media;
  if (state.selectedOptions[optionIndex]) {
    const searchStringSpecificOption = state.selectedOptions[optionIndex].toLowerCase();
    const searchStringAlwaysVisible = 'always_visible';
    const re = new RegExp(`${searchStringSpecificOption}|${searchStringAlwaysVisible}`, 'i');

    filteredMedia = state.product.media.filter((media) => typeof media.alt === 'string' && re.test(media.alt.toLowerCase()));
  }

  if (filteredMedia.length) {
    return filteredMedia;
  }
  return state.product.media;
}

function title(state: RootState, getters: any) {
  return getters.titleParts[0] || state.product.title;
}

function subTitle(state: RootState, getters: any) {
  return getters.titleParts[1];
}

function addToCartStates(state: RootState) {
  const sv = state.selectedVariant;
  const preorder = sv && state.product.tags.includes('preorder');
  const backorder = sv && state.product.tags.includes('backorder');
  return {
    normal: sv && sv.available,
    outOfStock: (sv && !sv.available) || !preorder,
    unavailable: !sv,
    preorder,
    backorder,
  };
}

/** transform from 4 props (array|undefined) to a single array of objects  */
function features(state: RootState) {
  return formatRepeatable(['spec_type', 'sepc_is_highlight', 'spec_value', 'spec_icon'], state.product.metafields.global) as BVAFeatureSpec[];
}

function includedItems(state: RootState) {
  return formatRepeatable(['included_item_name', 'included_item_description', 'included_item_heading', 'included_item_image'], state.product.metafields.accentuate) as BVAIncludedItem[];
}

function videoImageSlides(state: RootState) {
  return formatRepeatable(['video_poster_image', 'video__image_section'], state.product.metafields.accentuate) as BVAIncludedItem[];
}

function faqs(state: RootState) {
  return formatRepeatable(['faq_question', 'faq_answer'], state.product.metafields.accentuate) as BVAFAQ[];
}

function compatibilityTabs(state: RootState) {
  return formatRepeatable(['compatible_products', 'tab_name'], state.product.metafields.accentuate);
}

/** @alias ShopifyProduct.description */
function description(state: RootState) {
  return state.product.description;
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * *  Class Definition * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
export default class ProductVuexModule extends BaseVuexModule {
  state: RootState = {
    product: window.__PDP_INITIAL_PRODUCT__,
    selectedOptions: [...window.__PDP_INITIAL_PRODUCT__.selected_or_first_available_variant.options],
    selectedVariant: window.__PDP_INITIAL_PRODUCT__.selected_or_first_available_variant,
    quantity: 1,
    sellingPlan: null,
    crossProductPrice: 0,
    customer: window.__PDP_CUSTOMER__,
    productPromise: null,
    linkedProducts: window.__PDP_LINKED_PRODUCTS__,
    collection: window.__PDP_COLLECTION__,
    compareUrl: window.__PDP_COMPARE_PAGE_URL__,
    sizeChart: window.__PDP_INITIAL_PRODUCT__.metafields.pdp.size_chart_metafields,
  };

  getters = {
    onSale,
    taggedNew,
    titleParts,
    briefValueProps,
    mediaSet,
    title,
    subTitle,
    addToCartStates,
    faqs,
    features,
    description,
    includedItems,
    videoImageSlides,
    compatibilityTabs,
  };

  actions = {
    setQuantity,
    setCrossProductPrice,
    setOptionByIndex,
    setSelectedVariant,
    onProductChange,
    setSellingPlan,
    onAddToCart,
    onBuyItNow
  };

  mutations = {
    SET_QUANTITY,
    SET_CROSSPRODUCT_PRICE,
    SET_OPTION_BY_INDEX,
    SET_SELECTED_VARIANT,
    SET_SELLING_PLAN,
    SET_PRODUCT,
    SET_PRODUCT_PROMISE,
  };
}
