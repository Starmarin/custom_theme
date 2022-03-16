import { Vue, Component, Prop } from 'vue-property-decorator';
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter';
import {
  Swiper as SwiperClass,
  Scrollbar,
  Navigation,
  Mousewheel,
} from 'swiper/core';
import BtnTertiaryLink from '../../components/BtnTertiaryLink';
import ProductCard from '../product-card/ProductCard';
import Icon from '../../components/Icon.vue';

SwiperClass.use([Scrollbar, Navigation, Mousewheel]);
const { directive } = getAwesomeSwiper(SwiperClass);

export const NAME = 'SuperCollectionGroup';
@Component({
  name: NAME,
  components: {
    BtnTertiaryLink,
    ProductCard,
    Icon,
  },
  directives: {
    swiper: directive,
  },
})

export default class SuperCollectionGroup extends Vue {
  @Prop({ default: [] }) readonly products!: Array<ShopifyProduct>;

  @Prop({ default: '' }) readonly targetTag!: string;

  swiper?: SwiperClass

  readMore = false

  swiperOptions = {
    slidesPerView: 'auto',
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },
    mousewheel: {
      forceToAxis: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  }

  get groupProducts() {
    return this.products.filter((product) => product.tags.includes(this.targetTag));
  }
}
