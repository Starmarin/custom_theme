/**
 *
 * @param product ShopifyProduct
 *
 * This function reduces the Specificiation array to an object of { highlights, technicals }
 * with key-Value relation of the spec contents and the type label.
 */
export default function reduceSpecificationsFromMetafields (product: ShopifyProduct) {
  const base = {
    highlights: {},
    technicals: {},
  };

  if (product?.metafields?.global?.specifications) {
    const {
      icon = [],
      is_highlight = [],
      type = [],
      value = []
    } = product.metafields.global.specifications;

    const data = type ? type.reduce((specs: any, currentType: string, index: number) => {
      const isHighlight = is_highlight[index] === 'true'
      const payload = {
        isHighlight,
        value: value[index],
        icon: icon && icon[index] && icon[index].length ? icon[index][0] : null,
        type: currentType
      };

      if (isHighlight) {
        specs.highlights[currentType] = payload;
      } else {
        specs.technicals[currentType] = payload;
      }
      return specs;
    }, base) : base;

    return data;
  }
  return base;
}
