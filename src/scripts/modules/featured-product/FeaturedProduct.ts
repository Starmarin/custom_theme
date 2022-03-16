import './featured-product.scss';

import { Vue, Component, Prop } from 'vue-property-decorator';
import range from 'lodash/range';
import TransitionExpand from '../../components/TransitionExpand.vue';
import Icon from '../../components/Icon.vue';
import VariantSwatch from '../../components/VariantSwatch.vue';
import Dropdown from '../../components/Dropdown.vue';
import cart from '../../lib/cart';

export const NAME = 'FeaturedProduct';

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
      Icon,
      TransitionExpand,
      VariantSwatch,
      Dropdown
    },
    directives: {
    },
  })
  class FeaturedProduct extends Vue {
    @Prop() readonly mod_settings!: any;

    @Prop() readonly featuredProduct!: any;

    @Prop() readonly featuredProductAlt!: any;

    @Prop() readonly optionsWithValues!: any;

    @Prop() selectedVariant!: any;

    @Prop({default: 1}) selectedQuantity!: number;

    state = window.APPSTATE;

    selectedOptions = [...this.selectedVariant.options];

    quantityDropdownOptions = range(1, 21).map((value) => ({ label: value, value }));

    get isOOS() {
      return !this.featuredProduct.available;
    }
  
    get onSale() {
      if (!this.selectedVariant) return null;
      return (this.selectedVariant.compare_at_price || 0) > this.selectedVariant.price;
    }
  
    get isNew() {
      return this.featuredProduct.tags.includes('new');
    }

    get hasSizeChart() {
      for (let i = 0; i < this.featuredProduct.tags.length; i++){
        if (this.featuredProduct.tags[i].includes('SizeChart::')) {
          return true;
        }
      }
      return false;
    }
      
    get isLimited() {
      return this.featuredProduct.tags.includes('limited');
    }
  
    get vendorBadgeImageUrl() {
      for (let i = 0; i < this.featuredProduct.tags.length; i++){
        if (this.featuredProduct.tags[i].includes('vendor:')) {
          return 'https://cdn.shopify.com/s/files/1/0506/4409/1049/files/vendor_' + this.featuredProduct.tags[i].split(":")[1] + '.png';
        }
      }
      return false;
    }
  
    get isPromo() {
      for (let i = 0; i < this.featuredProduct.tags.length; i++){
        if (this.featuredProduct.tags[i].includes('promo:')) {
          return this.featuredProduct.tags[i].split(":")[1];
        }
      }
      return false;
    }
  
    get isPreorder() {
      return this.featuredProduct.tags.includes('preorder');
    }

    get isBackorder() {
      return this.featuredProduct.tags.includes('backorder');
    }
  
    get isBestseller() {
      return this.featuredProduct.tags.includes('bestseller');
    }
  
    get isYouth() {
      return this.featuredProduct.tags.includes('youth');
    }

    get isCustomizable() {
      return this.featuredProduct.metafields.pdp.is_customizable;
    }
  
    get OOSClass() {
      return "color:" + this.state.settings.oos_text_color + "; background-color:" + this.state.settings.oos_bg_color + ";";
    }
  
    get promoClass() {
      return "color:" + this.state.settings.promo_text_color + "; background-color:" + this.state.settings.promo_bg_color + ";";
    }
  
    get preorderClass() {
      return "color:" + this.state.settings.preorder_text_color + "; background-color:" + this.state.settings.preorder_bg_color + ";";
    }

    get backorderClass() {
      return "color:" + this.state.settings.backorder_text_color + "; background-color:" + this.state.settings.backorder_bg_color + ";";
    }
  
    get saleClass() {
      return "color:" + this.state.settings.sale_text_color + "; background-color:" + this.state.settings.sale_bg_color + ";";
    }
  
    get limitedClass() {
      return "color:" + this.state.settings.limited_text_color + "; background-color:" + this.state.settings.limited_bg_color + ";";
    }
  
    get bestsellerClass() {
      return "color:" + this.state.settings.bestseller_text_color + "; background-color:" + this.state.settings.bestseller_bg_color + ";";
    }
  
    get newClass() {
      return "color:" + this.state.settings.new_text_color + "; background-color:" + this.state.settings.new_bg_color + ";";
    }
  
    get youthClass() {
      return "color:" + this.state.settings.youth_text_color + "; background-color:" + this.state.settings.youth_bg_color + ";";
    }

    get customizableClass() {
      return "color:" + this.state.settings.customizable_text_color + "; background-color:" + this.state.settings.customizable_bg_color + ";";
    }

    get currentFormattedPrice() {
      if (!this.selectedVariant) return null;
      return this.$options.filters?.formatCurrency(this.selectedVariant.price / 100);
    }
  
    get currentFormattedComparePrice() {
      if (!this.selectedVariant || !this.selectedVariant.compare_at_price) return null;
      return this.$options.filters?.formatCurrency(this.selectedVariant.compare_at_price / 100);
    }
      
    isColorOption(option: any) {
      return /color/i.test(option.name);
    }
  
    isSizeOption(option: any) {
      return /size/i.test(option.name);
    }

    // see if an option value has at least one in-stock variant
    optionValueHasInStockVariant(optionIndex: number, optionValue: string) {
      return this.featuredProduct.variants.filter((variant: any) => variant.options[optionIndex] === optionValue).some((variant: any) => variant.available === true);
    }
    
    setVariantByIndex(selectedOptionValue: any, variantIndex: number) {
      let filteredVariants = [...this.featuredProduct.variants];
      this.selectedOptions[selectedOptionValue.optionIndex] = selectedOptionValue.value;

      if (this.optionsWithValues.length === 1) {
        filteredVariants = filteredVariants.filter(variant => (variant.options[0] === this.selectedOptions[0]));
      }
      if (this.optionsWithValues.length === 2) {
        filteredVariants = filteredVariants.filter(variant => (variant.options[0] === this.selectedOptions[0] && variant.options[1] === this.selectedOptions[1]));
      }
      if (this.optionsWithValues.length === 3) {
        filteredVariants = filteredVariants.filter(variant => (variant.options[0] === this.selectedOptions[0] && variant.options[1] === this.selectedOptions[1] && variant.options[2] === this.selectedOptions[2]));
      }
      this.selectedVariant = filteredVariants[0];
      window.KlarnaOnsiteService = window.KlarnaOnsiteService || [];
      window.KlarnaOnsiteService.push({ eventName: 'refresh-placements' });    
    }
    
    addToCart(selected: number) {
      cart.add({ id: selected, quantity: this.selectedQuantity });
    }

    buyNow(selected: number) {
      cart.add({ id: selected, quantity: this.selectedQuantity });
      cart.checkoutRedirect();
    }

    mounted() {
      window.KlarnaOnsiteService = window.KlarnaOnsiteService || [];
      window.KlarnaOnsiteService.push({ eventName: 'refresh-placements' });
    }
  }

  return new Vue(FeaturedProduct);
}
