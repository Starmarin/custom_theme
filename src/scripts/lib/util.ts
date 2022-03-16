import debounce from 'lodash/debounce'; // for defult export error
import isEqual from 'lodash/isEqual';

/* #__PURE__ */ /* eslint-disable */ export const uniqueId = () =>
  Math.random()
    .toString(16)
    .substring(2);

/**
 * @desc modify a shopify cdn image url to return a specific size image.
 * @param {String} file
 * @param {String} size
 * @returns String
 */
/* #__PURE__ */
export function imageSize(file: string, size: string) {
  return file ? file.replace(/\.(png|jpg|jpeg|gif|webp)/, `_${size}.$1`) : '';
}

/**
 * @desc modify a shopify cdn image url to return a cropped version of the image
 * @param {String} file
 * @param {String} size
 * @returns String
 */
/* #__PURE__ */
export function imageCrop(file: string, position: string) {
  return file.replace(/\.(png|jpg|jpeg|gif|webp)/, `_crop_${position}.$1`);
}

/* #__PURE__ */
export function moneyWithoutTrailingZeros(price: number) {
  if (price % 100 === 0) {
    return `${new Intl.NumberFormat('en-US', { style: 'currency', currency: window.APPSTATE.current_currency, minimumFractionDigits: 0 }).format(price / 100)}`;    
  }
  return `${new Intl.NumberFormat('en-US', { style: 'currency', currency: window.APPSTATE.current_currency, minimumFractionDigits: 2 }).format(price / 100)}`;
}

/* #__PURE__ */
export const isTouch = () => 'ontouchstart' in document.documentElement;

/**
 * Decodes a string that has been encode through the 'url_encode' Shopify filter
 * @param {*} str
 */
/* #__PURE__ */
export const decode = (str: string) => decodeURIComponent(str).replace(/\+/g, ' ');

// Debounced call to avoid flashes on the PLP
export const refreshAffirm = debounce(() => affirm.ui.refresh(), 500, { leading: false, trailing: true });

/* #__PURE__ */
export const handleize = (str: any) =>
  str
    .toString()
    .toLowerCase()
    .replace(/\u0027/g, '')
    .replace(/[^\w\u00C0-\u024f]+/g, '-')
    .replace(/^-+|-+$/g, '');

/* #__PURE__ */
export const rangeGenerator = function*(start: number, end: number, step = 500) {
  if (end === undefined) [end, start] = [start, 0];
  for (let n = start; n < end; n += step) yield n;
};

/* #__PURE__ */
export const formatCurrency = (value: number, minimumFractionDigits = 0) => {
  return `${new Intl.NumberFormat('en-US', { style: 'currency', currency: window.APPSTATE.current_currency, minimumFractionDigits: 2 }).format(value)}`;
};

export const priceFilterRender = (facet: string) => {
  const price = facet.split('|').map(Number);
  const lowerPrice = price[0];
  const higherPrice = price[1];
  if (lowerPrice === 0) {
    return `Under ${formatCurrency(higherPrice / 100, 0)}`;
  }

  if (higherPrice === Infinity) {
    return `Over ${formatCurrency(lowerPrice / 100, 0)}`;
  }
  return `${formatCurrency(lowerPrice / 100, 0)} - ${formatCurrency(higherPrice / 100, 0)}`;
};

export function getVariantsByOptions(variants: ShopifyVariant[], options: string[]) {
  return variants.filter((variant) => {
    const compareOptions = [variant.option1, variant.option2, variant.option3].slice(0, options.length);
    return isEqual(compareOptions, options);
  })
}

export function getVariantAvailabilityByOptions(variants: ShopifyVariant[], options: string[]) {
  return !!getVariantsByOptions(variants, options)
    .filter(v => v.available)[0];
}
