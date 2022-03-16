/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import {mutations, actions} from './mutations'
import {
  updateURL,
  getStateFromUrl
} from './util'

Vue.use(Vuex)
declare var __COLLECTION__DEFAULT_SORT__: string;
const defaults = {
  isSearch: !!~document.location.href.indexOf('/search'), // Reference for Bitwise operator, https://dev.to/werninator/a-neat-little-trick-with-javascripts-indexof-4dj5
  mounted: false,
  sort: __COLLECTION__DEFAULT_SORT__ || 'mannual',
  showFilterMenu: false,
  showCollectionMenu: false,
  searchQuery: '',
  acceptedFilters: ['need', 'speed', 'color', 'price', 'frame-color'],
  collection: {
    handle: '',
    image: '',
    title: '',
    description: '',
    sortOptions: [],
    fetched: false,
    metafields: {
      promo_tile_1_preheader: '',
      promo_tile_1_header: '',
      promo_tile_1_text_color: '',
      promo_tile_1_image: '',
      promo_tile_1_link: '',
      promo_tile_1_cta_text: '',
      promo_tile_1_size: '',
      promo_tile_1_location: '',
      promo_tile_2_preheader: '',
      promo_tile_2_header: '',
      promo_tile_2_text_color: '',
      promo_tile_2_image: '',
      promo_tile_2_link: '',
      promo_tile_2_cta_text: '',
      promo_tile_2_size: '',
      promo_tile_2_location: '',
    }
  },
  products: [],
  facets: {},
  selectedFacets: [],
  ajaxing: false,
  loading: false,
  page: 1,
  pages: 1,
}

export default () => new Vuex.Store({
  state: Object.assign({},
    defaults,
    getStateFromUrl(Object.keys(defaults))
  ),
  actions,
  mutations,
  plugins: [updateURL]
})
