/* eslint-disable */
import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';
import { decode } from '@/scripts/lib/util';
import Cart from '../../lib/cart';
/** Provide basic option switching logic
 * @class BaseProduct
 */

export const NAME = 'BaseProduct';

function getProps(el: HTMLElement) {
  if (!el.dataset.props) return {};
  return JSON.parse(el.dataset.props);
}
@Component
export default class BaseProduct extends Vue {
  @Prop() readonly product!: ShopifyProduct;

  @Prop() readonly defaultVariant!: ShopifyVariant;

  addingTocart = false;

  activeColor = "";

  activeImage = "";

  activeAlt? = "";

  state = window.APPSTATE;

  selectedOptions: string[] = [...(this.defaultVariant?.options || this.product.selected_or_first_available_variant.options)];

  selectedVariant? = this.defaultVariant || this.product.selected_or_first_available_variant;

  public async  addToCart() {
    if (this.selectedVariant) {
      this.addingTocart = true;
      await Cart.add({ id: this.selectedVariant.id, quantity: 1 })
      this.addingTocart = false;
    }
  }

  public setOptionByIndex(index: number, value: string) {
    this.activeColor = value;
    this.$set(this.selectedOptions, index, value);
    this.setSelectedVariant();
  }

  private setSelectedVariant() {
    let filteredVariants = [...this.product.variants];

    this.selectedOptions.forEach((selectedOptionValue, optIndex) => {
      filteredVariants = filteredVariants.filter((variant) => variant.options[optIndex] === selectedOptionValue);
    });

    // filtering resulted in nothing. remove a selected option and try again
    if (filteredVariants[0] === undefined && this.selectedOptions.length > 1) {
      this.selectedOptions.pop();
      this.setSelectedVariant();
      return;
    }

    // we have a single variant that matches our selected options
    if (filteredVariants.length === 1 && this.product.options.length === this.selectedOptions.length) {
      this.selectedVariant = filteredVariants[0];
      if (this.selectedVariant.featured_media) {
        if (this.selectedVariant.featured_media.alt != "") {
          let variantAlt = this.selectedVariant.featured_media.alt;
          if (variantAlt?.includes('[')) { // Expected format ex. [Color::Black]|some alt text
            for (let i = 0; i < this.selectedOptions.length; i++){
              const option = this.product.options[i];
              const value = this.selectedOptions[i];
              let counter = 0;
              for (let j = 0; j < this.product.media.length; j++){
                if (this.product.media[j].alt?.includes("[" + option + ":" + value + "]")) {
                  counter++;
                  if (counter > 1) {
                    this.activeImage = this.product.media[j].src;
                  }
                }  
              }
            }
            this.activeAlt = variantAlt.split("|")[1];
          } else {
            this.activeImage = this.product.media[0].src;
            this.activeAlt = variantAlt;
          }
        }
      } else {
        if (this.product.media.length > 1) {
          this.activeImage = this.product.media[1].src;          
        } else {
          this.activeImage = this.product.media[0].src;          
        }
      }
      return;
    }
    this.selectedVariant = undefined;
  }

  get hasColorOptions() {
    return this.optionNames.includes('Color') || this.optionNames.includes('color');
  }

  get hasMultipleColors() {
    for (let i = 0; i < this.product.optionsWithValues.length; i++){
      if (this.product.optionsWithValues[i].name == 'Color') {
        return this.product.optionsWithValues[i].values.length;
      }
    }
    return false;
  }

  get colorOptionPositionIndex() {
    return this.product.optionsWithValues.reduce((colorOptionIndex: any, option) => {
      if (colorOptionIndex !== null) return colorOptionIndex;
      if (option.name.toLowerCase().includes('color')) return option.position - 1;
      return null;
    }, null)
  }

  get currentFormattedPrice() {
    if (!this.selectedVariant) return null;
    return this.$options.filters?.formatCurrency(this.selectedVariant.price / 100);
  }

  get currentFormattedComparePrice() {
    if (!this.selectedVariant || !this.selectedVariant.compare_at_price) return null;
    return this.$options.filters?.formatCurrency(this.selectedVariant.compare_at_price / 100);
  }

  get isOOS() {
    return !this.product.available;
  }

  get onSale() {
    if (!this.selectedVariant) return null;
    return (this.selectedVariant.compare_at_price || 0) > this.selectedVariant.price;
  }

  get isNew() {
    return this.product.tags.includes('new');
  }

  get isLimited() {
    return this.product.tags.includes('limited');
  }

  get vendorBadgeImageUrl() {
    const randomNumber = Math.floor(Math.random() * Math.floor(10000000));
    for (let i = 0; i < this.product.tags.length; i++){
      if (this.product.tags[i].includes('vendor:')) {
        return 'https://cdn.shopify.com/s/files/1/0070/5698/2143/files/vendor_' + this.product.tags[i].split(":")[1] + '.png?v=' + randomNumber;
      }
    }
    return false;
  }

  get isPromo() {
    for (let i = 0; i < this.product.tags.length; i++){
      if (this.product.tags[i].includes('promo:')) {
        return this.product.tags[i].split(":")[1];
      }
    }
    return false;
  }

  get isPreorder() {
    return this.product.tags.includes('preorder');
  }

  get isBackorder() {
    return this.product.tags.includes('backorder');
  }

  get isBestseller() {
    return this.product.tags.includes('bestseller');
  }

  get isYouth() {
    return this.product.tags.includes('youth');
  }

  get isCustomizable() {
    return this.product.metafields.pdp.is_customizable;
  }

  get OOSClass() {
    return "color: var(--color-badge-oos-text); background-color: var(--color-badge-oos-bg);";
  }

  get promoClass() {
    return "color: var(--color-badge-promo-text); background-color: var(--color-badge-promo-bg);";
  }

  get preorderClass() {
    return "color: var(--color-badge-preorder-text); background-color: var(--color-badge-preorder-bg);";
  }

  get backorderClass() {
    return "color: var(--color-badge-backorder-text); background-color: var(--color-badge-backorder-bg);";
  }


  get saleClass() {
    return "color: var(--color-badge-sale-text); background-color: var(--color-badge-sale-bg);";
  }

  get limitedClass() {
    return "color: var(--color-badge-limited-text); background-color: var(--color-badge-limited-bg);";
  }

  get bestsellerClass() {
    return "color: var(--color-badge-bestseller-text); background-color: var(--color-badge-bestseller-bg);";
  }

  get newClass() {
    return "color: var(--color-badge-new-text); background-color: var(--color-badge-new-bg);";
  }

  get youthClass() {
    return "color: var(--color-badge-youth-text); background-color: var(--color-badge-youth-bg);";
  }

  get customizableClass() {
    return "color: var(--color-badge-customizable-text); background-color: var(--color-badge-customizable-bg);";
  }

  get subtextTitle() {
    return this.product.metafields?.global?.subtext;
  }

  get valueProps() {
    return this.product.metafields.global.value_props || [];
  }

  get optionNames() {
    return this.product.optionsWithValues.map((option: ShopifyOptionWithValue) => option.name);
  }

  mounted() {
    if (this.product.media.length > 1) {
      this.activeImage = this.product.media[1].src;
    }
    if (this.hasColorOptions) {
      for (let i = 0; i < this.product.optionsWithValues.length; i++){
        if (this.product.optionsWithValues[i].name == 'Color') {
          this.setOptionByIndex(i, this.product.optionsWithValues[i].values[0]);      
          return;
        }
      }
    }
  }
}
