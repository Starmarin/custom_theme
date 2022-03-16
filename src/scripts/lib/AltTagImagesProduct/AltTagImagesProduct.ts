import Component from 'vue-class-component';
import BaseProduct from '../BaseProduct/BaseProduct';

export default (optionIndex = 0) => {
  @Component
  class AltTagImagesProduct extends BaseProduct {
    get mediaSet() {
      // all media if no option selected
      if (!this.selectedOptions[optionIndex]) return this.product.media;

      let filteredMedia = this.product.media;
      if (this.selectedOptions[optionIndex]) {
        const searchStringSpecificOption = this.selectedOptions[optionIndex].toLowerCase();
        const searchStringAlwaysVisible = 'always_visible';

        filteredMedia = this.product.media.filter((media) => media.alt && typeof media.alt === 'string').filter((media) => media.alt?.toLowerCase().includes(searchStringAlwaysVisible) || media.alt?.toLowerCase().includes(searchStringSpecificOption));
      }

      if (filteredMedia.length) {
        return filteredMedia;
      }
      return this.product.media;
    }
  }

  return AltTagImagesProduct;
};
