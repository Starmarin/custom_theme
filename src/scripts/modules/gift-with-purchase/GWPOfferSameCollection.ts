import prop from 'lodash/property';
import GWPOfferBenfitAbstract from './GWPOfferAbstract';

/**
 * Trigger Type: atc_same_collection
 * Trigger:      When a user has added a specific number of products from a single collection.
 * Example:      When a user adds 2 t-shirts, they get the offer.
 */
export default class GWPOfferSameCollection extends GWPOfferBenfitAbstract { 
  /** @override */
  getTriggerActive (cart: ShopifyCart) {
    const productCountThreshold = parseInt(this.trigger.settings.product_count, 10);
    const targetCollectionHandle = this.trigger.settings.collection;
    const productsFromCollectionCount = cart.items
      .filter(item => !item.properties?._smid)
      .reduce((acc, item) => {
        const productsCollectionHandles = item.product?.collections.map(prop('handle'));
        if(productsCollectionHandles?.includes(targetCollectionHandle)) {
          return acc + item.quantity;
        }
        return acc;
      }, 0);

    return productsFromCollectionCount >= productCountThreshold;
  }
}