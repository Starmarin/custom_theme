const trackQuickShop = () => {
  const atcForm = document.getElementById('boost-pfs-quickview-cart-form') as HTMLFormElement;
  if (!atcForm) return;

  atcForm.addEventListener('submit', (event: Event) => {
    event.preventDefault();
    const store = document.getElementById('boost-pfs-quickview-datalayer-store') as HTMLDivElement;
    const quantity = document.getElementById('boost-pfs-quickview-cart-quantity') as HTMLInputElement;

    if (!store) {
      console.warn('No data store available for dataLayer event.');
      return;
    };

    const dataset = { ...store.dataset };
    const selectedOptions: Array<HTMLInputElement> = [...atcForm.querySelectorAll('input')].filter(input => input.checked);

    const variantOption1 = selectedOptions[0] ? selectedOptions[0].value : null;
    const variantOption2 = selectedOptions[1] ? selectedOptions[1].value : null;
    const variantOption3 = selectedOptions[2] ? selectedOptions[2].value : null;

    const item = {
      id: Number(dataset.id),
      sku: dataset.sku,
      variantId: Number(dataset.id),
      productType: dataset.productType,
      name: dataset.name,
      price: Number(dataset.price),
      currentCategory: dataset.productType,
      quantity: quantity ? Number(quantity.value) : 0,
      brand: dataset.brand,
      source: dataset.source,
      variantOption1,
      variantOption2,
      variantOption3,
    };

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'AddToCart',
      'ecommerce': {
        'currencyCode': window.Shopify.currency.active,
        'add': {
          'products': [
            item
          ]
        }
      }
    });
    atcForm.submit();
  });
}

export default trackQuickShop;