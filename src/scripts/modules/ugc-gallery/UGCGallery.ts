import './ugc-gallery.scss';

import { Vue, Component, Prop } from 'vue-property-decorator';
import LinkPrimary from '../../components/LinkPrimary.vue';

export const NAME = 'UGCGallery';

function getProps(el: HTMLElement) {
  if (!el.dataset.props) return {};
  return JSON.parse(el.dataset.props);
}

export default function(el: HTMLElement) {
  @Component({
    name: NAME,
    el,
    propsData: getProps(el),
    components: { LinkPrimary },
    directives: {
    },
  })
  class UGCGallery extends Vue {
    @Prop() readonly modsettings!: any;

    mounted() {
    }
  }

  return new Vue(UGCGallery);
}
