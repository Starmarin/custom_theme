declare interface Window {
  affirm: any;
  yotpo: any;
  Yotpo: any;
  pdp: any;
  dataLayer: any;
  dataLayerDTO: any;
  __trackQuickShop: Function;
  BorderFree: any;
  Cookies: any;
  KlarnaOnsiteService: any;
  BIS: any; // back in stock
  __PDP_INITIAL_PRODUCT__: ShopifyProduct;
  __PDP_CUSTOMER__: any;
  __PDP_LINKED_PRODUCTS__?: string[];
  __PDP_COLLECTION__: ShopifyCollection | null; 
  __PDP_COMPARE_PAGE_URL__?: string;
  __COLLECTION_PRICE_FILTER__?: Array<BVAPriceFilterBlockSetting>
  __BVA__: BVAGlobalState;
  BUS?: any;
  APPSTATE: BVAGlobalState;
  swellAPI: any;
}
declare let affirm: any;
declare let Yotpo: any;
declare let yotpo: any;
declare var __BVA__: BVAGlobalState;


declare interface BVAGlobalState {
  cart: ShopifyCart;
  cart_errors?: {
    status: number;
    message: string;
    description: string;
  }
  cart_modal: boolean;
  free_shipping_visible: boolean;
  shopify_country: any;
  valid_printful_user: boolean;
  borderfree: any;
  primary_language: string;
  current_language: string;
  current_currency: string;
  subscriptions_modal_headline?: string;
  subscriptions_modal_title?: string;
  subscriptions_modal_text?: string;
  subscriptions_modal_btn_link?: string;
  subscription_modal_btn_text?: string;
  current_store: string;
  customer?: any;
  customer_discount_codes_used: string[][];
  sidecart_settings: {
    cart_gift_message_enable: boolean;
    cart_free_shipping_enable: boolean;
    cart_free_shipping_threshold: number;
    cart_donation_enable: boolean;
    cart_donation_product: string;
  };
  gwp_data: any; // TODO
  global_superstar_data: any; 
  language: {
    add_to_cart?: string;
    not_available?: string;
    select_option?: string;
    add?: string;
    added?: string;
    close?: string;
    return?: string;
    out_of_stock?: string;
    promo?: string;
    preorder?: string;
    backorder?: string;
    subscription?: string;
    subscription_btn?: string;
    whats_this_text?: string;
    sale?: string;
    limited?: string;
    bestseller?: string;
    apply_now?: string;
    new?: string;
    youth?: string;
    customizable?: string;
    customized?: string;
    personalized?: string;
    special_offer?: string;
    available?: string;
    only?: string;
    left?: string;
    buy_now?: string;
    details?: string;
    quick_shop?: string;
    ymal?: string;
    home?: string;
    product_type?: string;
    size_chart?: string;
    confirm_delete?: string;
    product_exclusion_text?: string;
    order_history?: string;
    address_book?: string;
    subscriptions?: string;
    rewards?: string;
    fits?: string;
    rotate_belt?: string;
    subcategories?: string;
    shop_now?: string;
    complete_look?: string;
  };
  settings: {
    oos_text_color?: string;
    oos_bg_color?: string;
    promo_text_color?: string;
    promo_bg_color?: string;
    preorder_text_color?: string;
    preorder_bg_color?: string;
    backorder_text_color?: string;
    backorder_bg_color?: string;
    sale_text_color?: string;
    sale_bg_color?: string;
    limited_text_color?: string;
    limited_bg_color?: string;
    bestseller_text_color?: string;
    bestseller_bg_color?: string;
    new_text_color?: string;
    new_bg_color?: string;
    youth_text_color?: string;
    youth_bg_color?: string;
    customizable_text_color?: string;
    customizable_bg_color?: string;
    customizable_btn_text_color?: string;
    customizable_btn_bg_color?: string;
    customizable_atc_disable?: string;
    enable_subscription_tab?: string;
  };
  promos?: Array<any>;
}

declare interface BVAPriceFilterBlockSetting {
  lower_limit: number;
  upper_limit: number;
}

declare interface ShopifyCart {
  token: string;
  note: string | null;
  attributes: any;
  original_total_price: number;
  total_price: number;
  total_discount: number;
  total_weight: number;
  item_count: number;
  items: Array<ShopifyCartItem>;
  requires_shipping: boolean;
  currency: string;
  items_subtotal_price: number;
  cart_level_discount_applications: Array<any>;
  errors?: Array<string>;
}

declare interface ShopifyCartItem {
  id: number;
  variant_id: number;
  product_has_only_default_variant: boolean;
  properties: null | any;
  quantity: number;
  key: string;
  title: string;
  sku: string;
  featured_image: ShopifyMedia;
  handle: string;
  requires_shipping: boolean;
  product_type: string;
  product_title: string;
  product_description: string;
  variant: ShopifyVariant;
  variant_title: string;
  variant_options: Array<string>;
  options_with_values: Array<ShopifyOptionWithValue>;
  line_level_total_discount: string;
  selling_plan: any;
  price: number;
  product: ShopifyProduct;
  original_price: number;
  discounted_price: number;
  line_price: number;
  original_line_price: number;
  total_discount: number;
  taxable: boolean;
  product_id: number;
  final_price: number;
  final_line_price: number;
  vendor: string;
}

declare interface CartAddPostBody {
  id: number;
  quantity: number;
}

declare interface ShopifyProduct {
  title: string;
  handle: string;
  id: number;
  type: string;
  url: string;
  vendor: string;
  media: ShopifyMedia[];
  external_video: ShopifyMedia[];
  featured_media: ShopifyMedia;
  description: string;
  price: number;
  price_min: number;
  price_max: number;
  available: boolean;
  tags: string[];
  options: string[];
  optionsWithValues: Array<ShopifyOptionWithValue>;
  has_only_default_variant: boolean;
  selected_or_first_available_variant: ShopifyVariant;
  variants: ShopifyVariant[];
  metafields: BVAProductMetafields;
  collections: ShopifyProductCollection[];
}

interface ShopifyProductCollection {
  id: number;
  handle: string;
  title: string;
  updated_at: string;
  body_html: string;
  published_at: string;
  sort_order: string;
  template_suffix: string;
  disjunctive: boolean;
  rules: ShopifyProductCollectionRule[];
  published_scope: string;
  image: ShopifyProductCollectionImage;
}

interface ShopifyProductCollectionImage {
  created_at: string;
  alt?: any;
  width: number;
  height: number;
  src: string;
}

interface ShopifyProductCollectionRule {
  column: string;
  relation: string;
  condition: string;
}

declare interface ShopifyVariant {
  title: string;
  id: number;
  url: string;
  available: boolean;
  inventory_quantity: number;
  inventory_policy: 'deny' | 'continue';
  price: number;
  compare_at_price?: number;
  featured_media?: ShopifyMedia;
  option1: string;
  option2?: string;
  option3?: any;
  options: string[];
  sku?: string;
  [key: string]: any;
  metafields: BVAVariantMetafields;
}

declare interface ShopifyCollection {
  id: number;
  handle: string;
  title: string;
  updated_at: string;
  body_html: string;
  published_at: string;
  sort_order: string;
  template_suffix: string;
  published_scope: string;
}

declare interface SortOption {
  name: string;
  value: string;
}

declare interface ShopifyMedia {
  alt?: string;
  id: number;
  position: number;
  preview_image: ShopifyPreviewimage;
  aspect_ratio: number;
  height: number;
  media_type: string;
  src: string;
  width: number;
}

declare interface ShopifyPreviewimage {
  aspect_ratio: number;
  height: number;
  width: number;
  src: string;
}

declare interface BVAProductSpecsMetafield {
  type: Array<string>;
  is_highlight: Array<string>;
  value: Array<string>;
  icon: Array<AccentuateMediaV2[]>;
}

declare interface BVAProductMetafields {
  accentuate: {
    numeric_value?: string[];
    numeric_value_unit?: string[];
    promo_1?: string;
    link_promo_url?: string;
    link_promo_icon_image?: string;
    link_promo_main_text?: string;
    link_promo_link_text?: string;
    lifestyle_image: AccentuateMediaV2[];
    faq?: string; // html
    size_fit_image?: AccentuateMediaV2[];
    recommened_products?: string[];
    max_items_preorderable?: number; // when undefined, preordering is not limited
    tab_name?: string[];
    compatible_products?: string[];
  };
  global: {
    subtext?: string;
    value_props?: string[]; // TODO insure this type is correct
    spec_type?: string[];
    sepc_is_highlight?: boolean[];
    spec_value?: string[];
    spec_icon?: AccentuateMediaV2[];
    specifications: BVAProductSpecsMetafield;
  };
  pdp: {
    subscriptions_block_title?: string;
    onetime_text?: string,
    subscriptions_text?: string,
    expected_to_ship_date?: string,
    subscription_countdown_title?: string,
    subscription_countdown_title_color?: string,
    subscription_countdown_text?: string,
    subscription_countdown_text_color?: string,
    subscription_countdown_bg?: string,
    subscription_timer_bg_color?: string,
    subscription_end_date?: string,
    countdown_background_image?: string;
    countdown_hex_color?: string;
    primary_text_color?: string;
    accent_text_color_1?: string;
    accent_text_color_2?: string;
    countdown_headline_text?: string;
    countdown_sub_header_text_1?: string;
    countdown_promocode?: string;
    countdown_sub_header_text_2?: string;
    available_in_text?: string;
    enable_progress_bar?: number[];
    countdown_timer_end_date?: string;
    countdown_timer_start_date?: string;
    is_subscription?: any;
    short_description_heading?: string;
    short_description_text?: string;
    enable_buy_it_now?: number[];
    low_stock_threshold?: number[];
    additional_product_types?: string;
    complete_looks?: Array<any>;
    preorder_text?: string;
    rotating_view?: string;
    rotating_view_img?: string;
    heading_text?: string;
    description?: string;
    hero_desktop_banner?: AccentuateMediaV2[];
    hero_mobile_banner?: AccentuateMediaV2[];
    hero_video_shopify?: string;
    hero_video_vimeo?: string;
    hero_video_youtube?: string;
    rotating_hero?: string;
    text__cta_color?: string;
    enable_promotion?: number[];
    promo_text?: string;
    promo_collection?: object[];
    is_customizable?: object[];
    promo_link_text?: string;
    icons_image?: object[];
    icons_line_one?: object[];
    icons_line_two?: object[];
    cross_section_title?: string;
    cross_shop_all_collection?: object[];
    cross_shop_all_text?: string;
    cross_products?: object[];
    banner_desktop_banner?: AccentuateMediaV2[];
    banner_mobile_banner?: AccentuateMediaV2[];
    video_url_shopify?: string;
    video_url_vimeo?: string;
    video_url_youtube?: string;
    preheader?: string;
    header?: string;
    body_copy?: string;
    text_container_background_colo?: string;
    preheader_color?: string;
    header__body_copy_color?: string;
    product_types?: object;
    size_chart_metafields: {
      show_fit_tab?: boolean;
      size_chart_description?: string;
      fit_title_1?: string;
      fit_image_1?: string;
      fit_description_1?: string;
      fit_title_2?: string;
      fit_image_2?: string;
      fit_description_2?: string;
      size_chart_1_title?: string;
      size_chart_2_title?: string;
      sc_1_rows?: string;
      sc_1_row_title?: Array<any>;
      sc_1_2xs?: Array<any>;
      sc_1_cf_xs?: Array<any>;
      sc_1_cf_s?: Array<any>;
      sc_1_cf_m?: Array<any>;
      sc_1_cf_l?: Array<any>;
      sc_1_cf_xl?: Array<any>;
      sc_1_2xl?: Array<any>;
      sc_1_3xl?: Array<any>;
      sc_1_4xl?: Array<any>;
      sc_1_5xl?: Array<any>;
      sc_2_rows?: string;
      sc_1_row_title2?: Array<any>;
      sc_1_2xs2?: Array<any>;
      sc_1_cf_xs2?: Array<any>;
      sc_1_cf_s2?: Array<any>;
      sc_1_cf_m2?: Array<any>;
      sc_1_cf_l2?: Array<any>;
      sc_1_cf_xl2?: Array<any>;
      sc_1_2xl2?: Array<any>;
      sc_1_3xl2?: Array<any>;  
      sc_1_4xl2?: Array<any>;  
      sc_1_5xl2?: Array<any>;  
    };
  };
}

declare interface BVAVariantMetafields {
  accentuate: {
    is_preorder: boolean;
    max_items_preorderable?: number; // when undefined, preordering is not limited
  };
}

declare interface BVAFeatureSpec {
  specType?: string;
  sepcIsHighlight?: boolean;
  specValue?: string;
  specIcon?: AccentuateMediaV2[];
}

declare interface BVAIncludedItem {
  includedItemName?: string;
  includedItemDescription?: string;
  includedItemHeading?: string;
  includedItemImage?: AccentuateMediaV2[];
}

declare interface BVACompatibleProductsTab {
  tabName: string;
  compatibleProducts: string; // pipe deliminated list
}

declare interface BVAFAQ {
  faqQuestion?: string;
  faqAnswer?: string; // html
}

declare interface BVAProductYotpo {
  starsHtml: string;
}

// any time you need to access/assign a property value via bracket notation
declare interface Dict {
  [key: string]: any;
}
declare interface ShopifyOptionWithValue {
  name: string;
  position: number;
  values: Array<string>;
}

interface AccentuateMediaV2 {
  filename: string;
  mime_type: string;
  media_type: string;
  alt: string;
  id: number;
  key: string;
  scope: string;
  handle: string;
  src: string;
  original_src: string;
  cloudinary_src: string;
  width: number;
  height: number;
  aspect_ratio: number;
}
