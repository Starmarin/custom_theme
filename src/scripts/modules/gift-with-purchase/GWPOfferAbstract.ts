import { getVariantsByOptions } from "@/scripts/lib/util";
import CartLogic from "../cart-shared/CartLogic";

/**
 * @class Handle the benefit part of each GWP offer
 * 
 * IMPORTANT: this class is not meant to be used without extension!
 */
export default class GWPOfferBenfitAbstract {
  benefit: GWPBenefit;
  
  trigger: GWPTrigger;
  
  addToCart: (id: ShopifyVariant['id'], attrs: ShopifyVariant['properties']) => Promise<any>;

  removeFromCart: (id: ShopifyVariant['id']) => Promise<any>;
  
  /** allow displaying of loading while selecting/unselecting offer */
  loadingPromise?: Promise<any>;

  /** trigger UI for user to select their product options  */
  collectingVariantOptions = false;

  /** the variant added from the users provided options */
  selectedVariantId?: number; 

  /** is this offer currently selected */
  selected = false;

  /** the offer is able to be selected */
  triggerActive = false;

  dummyVariantId: number;

  constructor(
    config: GWPItem, 
    onAddToCart: (id: ShopifyVariant['id'], attrs: ShopifyVariant['properties']) => Promise<any>, 
    onRemoveFromCart: (id: ShopifyVariant['id']) => Promise<any>,
    dummyVariantId: number
  ) {
    this.benefit = config.benefit;
    this.trigger = config.trigger;
    this.select = this.select.bind(this);
    this.unselect = this.unselect.bind(this);
    this.addToCart = onAddToCart;
    this.removeFromCart = onRemoveFromCart;
    this.dummyVariantId = dummyVariantId;
  }

  /** Based on the benefit type, return different line item attributes
   *  to be applied to a real or dummy product.
   * 
   *  See line item & shipping scripts for more info */
  getBenefitLineItemAttributes (benefit: GWPBenefit) {
    const defaultAttrs = {
      _smid: benefit.id
    };

    switch(benefit.type) {
      case 'gwp': 
        return {
          ...defaultAttrs,
          _smgift: 0
        };
      case 'free_ship': 
        return {
          ...defaultAttrs,
          _smshipping: benefit.settings.shipping_type
        };
      case 'discount': 
        return {
          ...defaultAttrs,
          _smdiscount: benefit.settings.discount / 100
        };
      case 'dollar_discount': 
        return {
          ...defaultAttrs,
          _smdiscount: benefit.settings.discount
        };
      case 'discounted_product': 
        return {
          ...defaultAttrs,
          _smgift: benefit.settings.discount,
          _discounted_product: benefit.settings.discount,
          _smvisible: true,
        };
      case 'full_price_product': 
        return {
          ...defaultAttrs,
          _smvisible: true
        };
      default: 
        return {};
    }
  }

  /** @see GWPOfferBenfitAbstract.select */
  addSingleVariant () {
    return this.addToCart(
      this.benefit.settings.product.selected_or_first_available_variant.id, 
      this.getBenefitLineItemAttributes(this.benefit)
    );
  }

  /** Find a variant based on values and add it to cart.
   *  @see GWPOfferBenfitAbstract.select */
  addMultiVariant (userSelectedVariantOptionValues: string[]) {
    // try to add the variant with those options to the cart
    // then this.collectingVariantOptions = false;
    return new Promise((res, rej) => {
      const [ variant ] = getVariantsByOptions(this.benefit.settings.product.variants, userSelectedVariantOptionValues);
      if(variant && variant.available) {
        res(
          this.addToCart(variant.id, this.getBenefitLineItemAttributes(this.benefit))
            .then(() => {
              this.collectingVariantOptions = false;
            })
        );
      } else {
        rej(new Error('Product unavailable'));
      }
    })
  }

  /** @see GWPOfferBenfitAbstract.select */
  addDummyVariant () {
    return this.addToCart(this.dummyVariantId, this.getBenefitLineItemAttributes(this.benefit));
  }
            
  /** Depending on the benefit type, this might
   *  - start a multi-variant product selection if the product has multiple variants
   *  - add the benefit product to cart based on variant options provided
   *  - add a dummy product w/ correct item attributes to cart
   */
  select(userSelectedVariantOptionValues?: string[]) {
    const promise = new Promise((res) => {
      if(this.benefit.settings.product) {
        if(this.benefit.settings?.product.has_only_default_variant) {
          res(this.addSingleVariant());
        } else if (userSelectedVariantOptionValues && userSelectedVariantOptionValues.length === this.benefit.settings.product.options.length) {
          res(this.addMultiVariant(userSelectedVariantOptionValues));
        } else {
          // benefit product has variants but they haven't been chosen yet.
          // toggle a boolean to start option selection
          this.collectingVariantOptions = true;
        }
      } else {
        /** There's no client defined product associated with this benefit
         * Use a dummy product */
        this.addDummyVariant();
      }
    })

    this.loadingPromise = promise;
    return this.loadingPromise.finally(() => {
      this.loadingPromise = undefined;
    });
  }
  
  /** This should be just removing the item from cart */
  unselect() {
    this.collectingVariantOptions = false;
    const promise = new Promise((res, rej) => {
      if(this.selectedVariantId)
        return res(this.removeFromCart(this.selectedVariantId));
      return rej(new Error('No selected variant id'));
    });
    this.loadingPromise = promise;
    return this.loadingPromise.finally(() => {
      this.loadingPromise = undefined;
    });
  }

  /** checks if this benefit is active  */
  getSelectedState(cart: ShopifyCart) {
    for (let i = 0; i < cart.items.length; i++) { 
      if (cart.items[i].properties != null) {
        for (let j = 0; j < cart.items[i].properties.length; j++){
          if (cart.items[i].properties[j].includes("_smid") && cart.items[i].properties[j][1] === this.benefit.id) {
            return true;
          }
        }    
      }
    }

    return cart.items
      .some(item => item.properties && item.properties._smid === this.benefit.id)
  }

  /** return the variant id of the offer item in cart  */
  getSelectedVariantId (cart: ShopifyCart) {
    for (let i = 0; i < cart.items.length; i++) { 
      if (cart.items[i].properties != null) {
        for (let j = 0; j < cart.items[i].properties.length; j++){
          if (cart.items[i].properties[j].includes("_smid") && cart.items[i].properties[j][1] === this.benefit.id) {
            return cart.items[i].id;
          }
        }    
      }
    }

    return cart.items
      .find(item => item.properties && item.properties._smid === this.benefit.id)
      ?.id
  }

  /** Determine if this offer has met the trigger requirements and is selectable
   * @abstract override me! */
  getTriggerActive(cart: ShopifyCart) {
    return false;
  }

  /** Re-evaluate and update state based on new cart
   *  Unselect self if threshold no longer met */
  update(cart: ShopifyCart) {
    const oldTriggerState = this.triggerActive;
    this.triggerActive = this.getTriggerActive(cart);
    this.selected = this.getSelectedState(cart);
    this.selectedVariantId = this.getSelectedVariantId(cart);

    if(this.selected && oldTriggerState && !this.triggerActive) {
      // cart has changed such that the customer no longer qualifies for this offer... unselect the offer.
      this.loadingPromise = this.unselect();
    }
  }
}
