import Vue from 'vue';
import { formatCurrency, priceFilterRender } from '@/scripts/lib/util';

Vue.filter('formatCurrency', formatCurrency);
Vue.filter('priceFilterRender', priceFilterRender);
