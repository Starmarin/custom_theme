import './faq.scss';

import { Vue, Component, Prop } from 'vue-property-decorator';
import AccordionGroup from '../../components/AccordionGroup.vue';
import Accordion from '../../components/Accordion.vue';

export const NAME = 'FAQ';

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
      AccordionGroup
    },
    directives: {
    },
  })
  class FAQ extends Vue {
    
    @Prop() readonly blocks!: Array<any>;

    mounted() {
    }
  }
  return new Vue(FAQ);
}
