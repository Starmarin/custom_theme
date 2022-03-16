import GWPOfferBenfitAbstract from './GWPOfferAbstract';

/**
 * Trigger Type: atc_products
 * Trigger:      When a user adds between 1-3 specific products to their cart.
 * Example:      Buy these products and get this offer
 */
export default class GWPOfferSpecificProducts extends GWPOfferBenfitAbstract { 
  /** @override */
  getTriggerActive(cart: ShopifyCart) {
    let acc = 0;
    const specificProductsInCartCount = cart.items;
    for (let i = 0; i < specificProductsInCartCount.length; i++) {
      let foundSMID = false;
      if (specificProductsInCartCount[i].properties.length > 0) {
        for (let j = 0; j < specificProductsInCartCount[i].properties.length; j++){
          if (specificProductsInCartCount[i].properties[j].includes("_smid")) {
            foundSMID = true;
          }
        }
      }
      if (!foundSMID) {
        let handle = specificProductsInCartCount[i].product.handle;
        if (this.trigger.settings.products.includes(handle)) {
          acc += 1;
          return true;
        }
      }
    }
    
    return false;
  }
}