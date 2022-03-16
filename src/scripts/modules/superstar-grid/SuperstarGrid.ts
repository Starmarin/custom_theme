import './superstar-grid.scss';

import { Vue, Component, Prop } from 'vue-property-decorator';
import VueMq from 'vue-mq';
import LinkPrimary from '../../components/LinkPrimary.vue';

Vue.use(VueMq, {
  breakpoints: {
    sm: 650,
    md: 991,
    lg: 1440,
    xl: Infinity,
  },
  defaultBreakpoint: 'sm'
})

export const NAME = 'SuperstarGrid';

function getProps(el: HTMLElement) {
  if (!el.dataset.props) return {};
  return JSON.parse(el.dataset.props);
}

export default function(el: HTMLElement) {
  @Component({
    name: NAME,
    el,
    propsData: getProps(el),
    components: {
      LinkPrimary,
    },
    directives: {
    },
  })
  class SuperstarGrid extends Vue {

    superstars = window.__BVA__.global_superstar_data.superstars;
    
    // wwe or all superstars is blank
    activeTab = '';

    searchTerm = '';

    filteredSuperstarsArray?: Array<any>;

    showSubBrands = false;
    
    
    get filteredSuperstars() {
      this.filteredSuperstarsArray = this.superstars;
      let filteredSuperstars = []
  
      filteredSuperstars = this.filteredSuperstarsArray!.filter(
        superstar => (
          superstar.superstar_brand.includes(this.activeTab) &&
          superstar.superstar_title.includes(this.searchTerm.toLowerCase())
        )
      );

      return filteredSuperstars;
    }

    get superstarCount() {
      return this.filteredSuperstars.length + " total"
    }

    get countCSS() {
      switch(this.activeTab) {
        case '': {
          return 'bg-gray-700 text-white'
        }
        case 'raw': {
          return 'bg-brands-raw text-white'
        }
        case 'smackdown': {
          return 'bg-brands-smackdown text-white'
        }
        case 'nxt': {
          return 'bg-brands-nxt text-black'
        }
        case 'legends': {
          return 'bg-brands-legends text-black'
        }
        default: {
          return 'bg-gray-700 text-white';
        }
      }        
    }

    selectSubBrand(subBrand: string) {
      this.activeTab = subBrand;
      this.showSubBrands = false;
    }

    superstarImage(index: number) {
      return "background-image: url(" + this.filteredSuperstars[index].superstar_image + ");";
    }

    mounted() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const preFilteredBrand = urlParams.get('brand');
      if (preFilteredBrand !== null) {
        this.activeTab = preFilteredBrand;
      }
    }
  }

  return new Vue(SuperstarGrid);
}
