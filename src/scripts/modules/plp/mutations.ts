/* eslint-disable */
import request from './connectors';
import {
  aggregateProductOptionsWithTags,
  toggleSelectedFilter,
  interpretTags,
} from './util';

export const mutations = {
  changeCollection(state: any, handle: any) {
    state.collection.handle = handle;
  },
  changeCollectionData(state: any, {
    menu,
    products,
    collection,
    pages,
  }: any) {
    state.menu = menu;
    state.pages = pages;
    state.collection = collection;
    state.products = (products || [])
      .map((product: any) => interpretTags(product, state.acceptedFilters));
    state.facets = aggregateProductOptionsWithTags(state.products, state.acceptedFilters);
    state.mounted = true;
  },
  changeAjaxingFlag(state: any, ajaxing: any) {
    state.ajaxing = ajaxing;
  },
  changeLoadingState(state: any, isLoading: any) {
    state.loading = isLoading;
  },
  updateSelectedFacets(state: any, facet: any) {
    state.selectedFacets = toggleSelectedFilter(state.selectedFacets, facet);
  },
  resetSelectedFacets(state: any) {
    state.selectedFacets = [];
  },
  updateSort(state: any, sort: any) {
    state.sort = sort;
  },
  toggleFilterMenu(state: any, show: any) {
    state.showFilterMenu = show;
  },
  toggleCollectionMenu(state: any, show: any) {
    state.showCollectionMenu = show;
  },
  updateFlowExperience(state: any, experience: any) {
    state.experience = experience;
  },
  setCurrentPage (state: any, currentPage: any) {
    if (isNaN(parseInt(currentPage))) return null
    state.page = parseInt(currentPage)
    state.ajaxing = true
  },
};

export const actions = {
  fetchCollection({ commit, state }: any, {
    handle = state.collection.handle,
    ajaxing = true,
    initial = false,
    resetSelectedFacets = true,
  }) {
    !initial && commit('changeLoadingState', true);

    return new Promise((resolve, reject) => {
      request(handle, state, (res: any) => {
        const {
          menu,
          collection,
          products,
        } = res;

        commit('changeCollectionData', {
          menu,
          collection,
          products,
        });

        ajaxing && commit('changeAjaxingFlag', ajaxing);

        if (state.selectedFacets.length) {
          commit('changeAjaxingFlag', true);
        }

        !initial && resetSelectedFacets && commit('resetSelectedFacets');
        commit('toggleCollectionMenu', false);
        commit('changeLoadingState', false);
        resolve(res);
      });
    });
  },
  updateSelectedFacets({ commit, state }: any, facet: any) {
    commit('changeAjaxingFlag', true);
    commit('updateSelectedFacets', facet);
  },
  updateSort({ commit, state }: any, sort: any) {
    commit('updateSort', sort);
  },
  toggleFilterMenu({ commit, state }: any, show: any) {
    commit('toggleFilterMenu', show);
  },
  toggleCollectionMenu({ commit, state }: any, show: any) {
    commit('toggleCollectionMenu', show);
  },
  resetSelectedFacets({ commit, state }: any) {
    commit('resetSelectedFacets');
  },
};
