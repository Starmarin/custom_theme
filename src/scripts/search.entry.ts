/* eslint-disable */
import renderModule from './lib/renderModule';
import * as SearchResults from './modules/search-results/SearchResults';
import '@/scripts/lib/filters';

window.addEventListener('DOMContentLoaded', () => {
  renderModule(SearchResults);
})
