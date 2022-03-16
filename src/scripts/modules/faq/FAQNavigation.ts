import './faq.scss';

import { Vue, Component, Prop } from 'vue-property-decorator';
import VueMq from 'vue-mq';
import AccordionGroup from '../../components/AccordionGroup.vue';
import Accordion from '../../components/Accordion.vue';
import Dropdown from '../../components/Dropdown.vue';

Vue.use(VueMq, {
  breakpoints: {
    sm: 650,
    md: 991,
    lg: 1440,
    xl: Infinity,
  },
  defaultBreakpoint: 'sm'
})

export const NAME = 'FAQNavigation';

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
      Accordion,
      AccordionGroup,
      Dropdown
    },
    directives: {
    },
  })
  class FAQNavigation extends Vue {
    @Prop() readonly modsettings!: any;

    @Prop() readonly blocks!: Array<any>;

    @Prop() readonly navigation!: Array<any>;

    supportOptions = this.navigation;

    selectedSupportNav = 'customer-service';

    supportNav() {
      this.selectedSupportNav = this.modsettings.handle;
    }    

    supportNavigation(value: string) {
      this.selectedSupportNav = value;
      for (let i = 0; i < this.navigation.length; i++){
        if (this.navigation[i].value === value) {
          document.location.href = this.navigation[i].url;
        }
      }
    }

    mounted() {
      this.supportNav();
    }
  }
  return new Vue(FAQNavigation);
}
