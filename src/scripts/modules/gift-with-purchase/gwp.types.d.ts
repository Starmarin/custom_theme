type GWPBenefitType = 
    'gwp' // this is a single product gift
  | 'gwp_multi' // deprecated
  | 'free_ship' // applies free shipping
  | 'discount' // whole cart discount w/o discount code
  | 'dollar_discount' // dollar discount off whole cart
  | 'discounted_product' // single product discounted by percentage defined in benefit object
  | 'full_price_product'; // aka "exclusive product" 

type GWPTriggerType = 
    'atc_collections'
  | 'atc_same_collection'
  | 'atc_products'
  | 'order_threshold'
  | 'product_threshold'
  | 'atc_any';

interface GWP {
  upsell_heading: string;
  upsell_subheading: string;
  items: GWPItem[];
  discount_code_active: boolean;
  upsell_dummy_product_variant_id: number;
}

interface GWPItem {
  trigger: GWPTrigger;
  benefit: GWPBenefit;
}

interface GWPBenefit {
  type: GWPBenefitType;
  id: string;
  settings: GWPBenefitSettings;
}

interface GWPBenefitSettings {
  product: ShopifyProduct;
  text: string;
  image: string;
  image_alt: string;
  icon: string;
  discount: number;
  shipping_type: string;
}

interface GWPTrigger {
  type: string;
  id: string;
  settings: GWPTriggerSettings;
}

interface GWPTriggerSettings {
  collections: ShopifyProductCollection[];
  collection: ShopifyProductCollection;
  product_count: string;
  products: string[];
  value: number; // could be cents or product count depending on trigger type
}
