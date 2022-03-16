import prop from 'lodash/property';
import GWPOfferCollections from './GWPOfferCollections';
import GWPOfferSameCollection from './GWPOfferSameCollection';
import GWPOfferSpecificProducts from './GWPOfferSpecificProducts';
import GWPOfferOrderValue from './GWPOfferOrderValue';
import GWPOfferProductCount from './GWPOfferProductCount';
import GWPOfferAnyProduct from './GWPOfferAnyProduct';
import cartLib from '../../lib/cart';

type GiftWithPurchaseControllerOffer = 
    GWPOfferCollections
  | GWPOfferSameCollection
  | GWPOfferSpecificProducts
  | GWPOfferOrderValue
  | GWPOfferProductCount
  | GWPOfferAnyProduct;

const GWP_OFFER_CONSTRUCTOR_MAP: Dict = {
  atc_collections: GWPOfferCollections,
  atc_same_collection: GWPOfferSameCollection,
  atc_products: GWPOfferSpecificProducts,
  order_threshold: GWPOfferOrderValue,
  product_threshold: GWPOfferProductCount,
  atc_any: GWPOfferAnyProduct
}

/**
 * Assumptions: 
 *  - user can only select a maximum of one gift 
 */
class GiftWithPurchaseController {
  private raw: GWP;

  offers: GiftWithPurchaseControllerOffer[]

  onAddToCart: (id: ShopifyVariant['id'], attrs: ShopifyVariant['properties']) => Promise<any>;

  onRemoveFromCart: (id: ShopifyVariant['id']) => Promise<any>;

  selectedOffer?: GiftWithPurchaseControllerOffer;

  constructor (gwp: GWP, onAddToCart: (id: ShopifyVariant['id'], attrs: ShopifyVariant['properties']) => Promise<any>, onRemoveFromCart: (id: ShopifyVariant['id']) => Promise<any>) {
    this.raw = gwp;
    this.onAddToCart = onAddToCart;
    this.onRemoveFromCart = onRemoveFromCart;
    this.offers = this.getOffers();
  }

  toggleOffer(offer: GiftWithPurchaseControllerOffer): Promise<any> {
    if(offer.selected)
      return offer.unselect();
    
    // check for any selected offer
    const selectedOfferIndex = this.offers
      .map(prop('selected'))
      .indexOf(true);
    let removalPromise = new Promise(res => res(null));
    
    // unselect it 
    if(selectedOfferIndex > -1) {
      removalPromise = this.offers[selectedOfferIndex].unselect()
    }

    return removalPromise
      .then(() => {
        return offer.select();
      })
      .then(() => {
        this.selectedOffer = this.getSelectedOffer();
      });
  }

  getSelectedOffer() {
    return this.offers.find(offer => offer.selected);
  }

  /** updates each offer using new data provided */
  update(cart: ShopifyCart) {
    this.offers.forEach(offer => offer.update(cart));
    this.selectedOffer = this.getSelectedOffer();
  }
  
  getOffers () {
    if(!this.raw?.items) return [];
    return this.raw.items.map(item => new GWP_OFFER_CONSTRUCTOR_MAP[item.trigger.type](item, this.onAddToCart, this.onRemoveFromCart, this.raw.upsell_dummy_product_variant_id) as GiftWithPurchaseControllerOffer);
  }
}

export default new GiftWithPurchaseController(
  window.__BVA__.gwp_data, 
  (id: ShopifyVariant['id'], properties: ShopifyVariant['properties']) => cartLib.add({items: [{id, quantity: 1, properties}]}),
  (id: ShopifyVariant['id']) => cartLib.update({id: String(id), quantity: 0})
);