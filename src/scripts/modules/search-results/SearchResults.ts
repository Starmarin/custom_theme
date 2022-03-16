/* eslint-disable */
import './search.scss';
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import BtnPrimaryLink from '../../components/BtnPrimaryLink';
import ProductCard from '../product-card/ProductCard';
import Icon from '../../components/Icon.vue';

export const NAME = 'SearchResults';

const VALID_TYPES = [
  'products',
  'information',
  'support',
];

function getProps(el: HTMLElement) {
  if (!el.dataset.props) return {};
  return JSON.parse(el.dataset.props);
}

export default function (el: HTMLElement) {
  @Component({
    name: NAME,
    el,
    propsData: getProps(el),
    components: {
      Icon,
      BtnPrimaryLink,
      ProductCard,
    }
  })

  class SearchResults extends Vue {
    @Prop() readonly productsCount!: number;
    @Prop() readonly infoCount!: number;

    currentActive = 'products';

    get query() {
      const url = new URLSearchParams(window.location.search);
      return url.get('q');
    }

    get activeFromUrl() {
      const url = new URLSearchParams(window.location.search);
      const tab = url.get('tab');
      if (!tab) return null;
      return VALID_TYPES.includes(tab) ? tab : null;
    }

    @Watch('currentActive')
    handleActiveChange() {
      const url = new URLSearchParams(window.location.search);
      url.set('tab', this.currentActive);
      history.replaceState({}, `Search Results for "${this.query}"`, `${window.location.pathname}?${url.toString()}`);
    }

    toggleTab(tab: string) {
      this.currentActive = tab;
    }

    created() {
      this.currentActive = this.activeFromUrl ? this.activeFromUrl : this.currentActive;
      this.handleActiveChange()
    }

    mounted() {
      if (this.productsCount == 0) {
        this.currentActive = 'information';
      }

      if (this.infoCount == 0) {
        this.currentActive = 'support';
      }
    }
  }
  return new Vue(SearchResults);
}
