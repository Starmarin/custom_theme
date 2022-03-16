import GWPOfferBenfitAbstract from './GWPOfferAbstract';

/**
 * Trigger Type: atc_any
 * Trigger:      When a user adds anything to their cart
 * Example:      Make a purchase and get this offer.
 */
export default class GWPOfferAnyProduct extends GWPOfferBenfitAbstract { 
  /** @override */
  getTriggerActive (cart: ShopifyCart) {
    for(let i = 0; i < cart.items.length; i++){
      let foundSMID = false;
      let found_smShipping = false;
      for(let j = 0; j < cart.items[i].properties.length; j++){
        if(cart.items[i].properties[j].includes('_smid')){
          foundSMID = true;
        }
        if(cart.items[i].properties[j].includes('_smshipping')){
          found_smShipping = true;
        }
      }
      if(!foundSMID || found_smShipping){
        return true;
      }
    }

    const filteredProducts = cart.items.filter(item => { 
      return !item.properties?._smid || item.properties?._smvisible;
    });
    return filteredProducts.length > 0;
  }
}