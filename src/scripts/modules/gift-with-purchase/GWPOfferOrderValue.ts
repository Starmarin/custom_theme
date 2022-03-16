import GWPOfferBenfitAbstract from './GWPOfferAbstract';

/**
 * Trigger Type: order_threshold
 * Trigger:      When a user's cart total reaches $x
 * Example:      Spend $100 and get this offer.
 */
export default class GWPOfferOrderValue extends GWPOfferBenfitAbstract { 
  /** if total order value minus any gwp items currently in cart is greater
   *  than provided threshold
   * @override */
  getTriggerActive (cart: ShopifyCart) {
    const { value: thresholdValue } = this.trigger.settings;
    let totalprice = cart.original_total_price;
    let gwpItemInCart = null;

    for(let i = 0; i < cart.items.length; i++){
      let foundSMID = false;
      if (cart.items[i].properties != null) {
        for(let j = 0; j < cart.items[i].properties.length; j++){
          if(cart.items[i].properties[j].includes('_smid')){
            foundSMID = true;
          }
        }  
      }
      if(foundSMID){
        gwpItemInCart = cart.items[i];
      }
    }

    if(gwpItemInCart) totalprice -= gwpItemInCart.final_price;
    return totalprice >= thresholdValue;
  }
}