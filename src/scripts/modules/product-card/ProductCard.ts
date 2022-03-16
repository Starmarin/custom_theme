import './product-card.scss';

import Component from 'vue-class-component';
import VariantSwatch from '../../components/VariantSwatch.vue';
import AffirmPromo from '../../components/AffirmPromo.vue';
import BtnPill from '../../components/BtnPill';
import Icon from '../../components/Icon.vue';
import BtnPillLink from '../../components/BtnPillLink';
import BtnTertiaryLink from '../../components/BtnTertiaryLink';
import BaseProduct from '../../lib/BaseProduct/BaseProduct';
import LazyLoad from '../../components/LazyLoad';

export const NAME = 'ProductCard';

@Component({
  name: NAME,
  components: {
    VariantSwatch,
    BtnPill,
    BtnTertiaryLink,
    BtnPillLink,
    AffirmPromo,
    Icon,
    LazyLoad
  }
})
  

export default class ProductCard extends BaseProduct {

  state = window.APPSTATE;

  get hasValueProps() {
    return ['E-Belts', 'Other Belts'].includes(this.product.type);
  }

  get hasCompareCTA() {
    return this.hasValueProps;
  }

  get currentImage() {
    if (this.selectedVariant) {
      if (this.selectedVariant.featured_media !== null) {
        return this.selectedVariant.featured_media;
      }
      if (this.product.featured_media !== null) {
        return this.product.featured_media;
      }
    }
    return this.product.media[0];
  }

}
