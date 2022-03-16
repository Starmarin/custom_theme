const dataLayerAdd = (latestItem: ShopifyCartItem, { quantity }: CartAddPostBody) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'event': 'AddToCart',
    'ecommerce': {
      'currencyCode': window.Shopify.currency.active,
      'add': {
        'products': [
          {
            'id': latestItem.product_id,
            'sku': latestItem.sku,
            'variantId': latestItem.id,
            'productType': latestItem.product_type.toLowerCase(),
            'name': latestItem.product_title,
            'price': latestItem.price / 100,
            'currentCategory': latestItem.product_type.toLowerCase(),
            'quantity': quantity,
            'brand': window.dataLayerDTO.brand || 'WWE',
            'variantOption1': latestItem.variant_options[0] ? latestItem.variant_options[0] : null,
            'variantOption2': latestItem.variant_options[1] ? latestItem.variant_options[1] : null,
            'variantOption3': latestItem.variant_options[2] ? latestItem.variant_options[2] : null,
            'source': latestItem.vendor,
          }
        ]
      }
    }
  });
}

export default dataLayerAdd;