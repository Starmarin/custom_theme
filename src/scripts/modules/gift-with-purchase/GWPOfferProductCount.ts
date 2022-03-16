import GWPOfferBenfitAbstract from './GWPOfferAbstract';

/**
 * Trigger Type: product_threshold
 * Trigger:      When a user has x amount of items from any collection in their cart
 * Example:      Order 5 products and get this offer.
 */
export default class GWPOfferProductThreshold extends GWPOfferBenfitAbstract { 
  /** @override */
  getTriggerActive (cart: ShopifyCart) {
    const { value: thresholdValue } = this.trigger.settings;

    let cartItems = 0;
    for(let i = 0; i < cart.items.length; i++){
      let foundSMID = false;
      let foundVisible = false;
      for(let j = 0; j < cart.items[i].properties.length; j++){
        if(cart.items[i].properties[j].includes('_smid')){
          foundSMID = true;
        }
        if(cart.items[i].properties[j].includes('_smvisible')){
          foundVisible = true;
        }
      }
      if (!foundSMID || foundVisible) {
        
        cartItems += cart.items[i].quantity;
      }
    }

    return cartItems >= thresholdValue;
  }
}