import intersection from 'lodash/intersection';
import prop from 'lodash/property';
import GWPOfferBenfitAbstract from './GWPOfferAbstract';

/**
 * Trigger Type: atc_collections
 * Trigger:      When a user adds items from specific collections
 * Example:      Buy a t-shirt and jacket and get this offer.
 */
export default class GWPOfferTriggerCollections extends GWPOfferBenfitAbstract { 
  /** check if any item in cart is part of up to 3 collections provided by this trigger type
   * @override */
  getTriggerActive(cart: ShopifyCart) {
    // return false if we don't have line item product data yet
    if(!cart.items.some(li => li.product)) return false; 

    const collectionSet1 = this.trigger.settings.collections;
    const collectionSet2 = cart.items
      .filter(item => !item.properties?._smid)
      .flatMap(prop('product.collections'))
      .map(prop('handle'));
    
    return intersection(collectionSet1, collectionSet2).length === this.trigger.settings.collections.length;
  }
}