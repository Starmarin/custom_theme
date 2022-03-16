const dataLayerRemove = (cartItem: ShopifyCartItem) => {
  const getTagValue = (identifier: string) => {
    const match: Array<string> = cartItem.product.tags.filter(tag => tag.includes(identifier));
    if (!match.length) return '';
    return match[0].split(':').pop() as string;
  }

  const superstarTag: string = getTagValue('Superstar:');
  const brandTag: string = getTagValue('Brand:');

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'event': 'RemoveFromCart',
    'ecommerce': {
      'currencyCode': window.Shopify.currency.active,
      'remove': {
        'products': [
          {
            'id': cartItem.product_id,
            'sku': cartItem.sku,
            'variantId': cartItem.id,
            'productType': cartItem.product.type.toLowerCase(),
            'name': cartItem.product.title,
            'price': cartItem.final_line_price / 100,
            'currentCategory': cartItem.product.type.toLowerCase(),
            'quantity': cartItem.quantity,
            'brand': superstarTag || brandTag || 'WWE',
            'variantOption1': cartItem.variant.option1,
            'variantOption2': cartItem.variant.option2,
            'variantOption3': cartItem.variant.option3,
            'source': cartItem.vendor,
          }
        ]
      }
    }
  });
}

export default dataLayerRemove;