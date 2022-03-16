/* eslint-disable */
import qs from 'query-string';
import { handleize, rangeGenerator, formatCurrency } from '@/scripts/lib/util';

/**
 * This is what we use to populate the initial state
 * of the application from the URL. This allows a user
 * to go back and forward between PDPs and PLPs, among
 * other things.
 *
 * @param {*} keys
 */
export const getStateFromUrl = (keys: any) => {
  const parsed: any = qs.parse(
    location.search,
    { arrayFormat: 'bracket' },
  );

  const selectedFacets = (parsed.selectedFacets || []).map((str: string) => {
    const split = str.split(':');
    return {
      name: split[0],
      value: split[1],
    };
  });

  const filtered = Object.keys(parsed).reduce((obj: any, key) => {
    if (key === 'selectedFacets') {
      return obj;
    }
    if (~keys.indexOf(key)) {
      obj[key] = parseVal(parsed[key]);
    }
    return obj;
  }, {});

  if (keysThatRequireAjax(filtered).length) {
    filtered.ajaxing = true;
  }

  if (parsed.q) {
    filtered.searchQuery = parsed.q;
  }

  if (parsed.sort_by) {
    filtered.sort = parsed.sort_by;
  }

  if (parsed.page) {
    filtered.page = parsed.page;
  }

  return {
    ...filtered,
    selectedFacets,
  };
};

/**
 * A utility function that sees if there are
 * any params in the URL that should force the
 * application to show an ajax view, rather then
 * the DOM rendered in the initial render.
 *
 * @param {*} obj
 */
export const keysThatRequireAjax = (obj: any) => Object.keys(obj).filter(k => {
  if (k === 'sort' && obj[k] !== 'manual') {
    return true;
  }
  if (k === 'selectedFacets') {
    return true;
  }
  return false;
});

/**
 * Converts boolean strings into
 * actual booleans
 *
 * @param {*} val
 */
export const parseVal = (val: string) => {
  if (val === 'true') return true;
  if (val === 'false') return false;
  return val;
};

/**
 * This is a Vuex plugin that listens to the
 * store and updates the URL appropriately.
 *
 * @param {*} store
 */
export const updateURL = (store: any) => {
  store.subscribe((mutation: any, {
    collection, selectedFacets = [], sort, isSearch, exitted, page
  }: any) => {
    // Don't update if a page transition has occurred
    if (!/collections\/.+/.test(document.location.pathname)) {
      return;
    }

    const url = isSearch ? '/search?' : `${collection.handle}?`;
    const search = [];
    const filtersQs = qs.stringify({
      selectedFacets: selectedFacets.map(({ name, value }: any) => `${name}:${value}`),
    }, { arrayFormat: 'bracket' });
    filtersQs && search.push(filtersQs);
    search.push(`sort_by=${sort}`);
    search.push(`page=${page}`);

    const existing = qs.parse(
      location.search,
      { arrayFormat: 'bracket' },
    );
    const uniqueExisting = Object.keys(existing)
      .filter(key => !!key
        && !!existing[key]
        && !~['selectedFacets', 'sort_by', 'page'].indexOf(key)) // Reference for Bitwise operator, https://dev.to/werninator/a-neat-little-trick-with-javascripts-indexof-4dj5
      .map(key => `${key}=${existing[key]}`);

    const regex = new RegExp(`(${collection.title})(.?–.*)`, 'i');
    const { title } = document;
    if (!regex.test(title)) {
      document.title = title.replace(/^(.*)((?: | )?–.*)/, `${collection.title} $2`); // eslint-disable-line no-irregular-whitespace
    }

    uniqueExisting.length && search.push(...uniqueExisting);

    history.replaceState({}, 'Collections', `${url}${search.join('&')}`);
  });
};

/**
 * Parses JSON, removing any comments that
 * Shopify might throw at us.
 *
 * @param {*} string
 */
export const parseJSON = (string: string) => {
  let json = {};
  string = string.replace(/<!--.*-->/g, '');
  try {
    json = JSON.parse(string);
  } catch (e) {
    console.log(e);
  }
  return json;
};

export const decode = (str: string) => decodeURIComponent(str).replace(/\+/g, ' ');

/**
 * Sometimes we need to encode data so that it doesn't break
 * the JSON parsing. This decodes it.
 *
 * @param {*} meta
 */
export const decodeCollectionMeta = (meta: any) => {
  for (const key in meta) {
    if (key !== 'json') {
      meta[key] = decode(meta[key]);
    }
  }
};

export const interpretTags = ({ tags, ...product }: any, acceptedFilters = []) => {
  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i];
    if (acceptedFilters.find(accepted => new RegExp(accepted, 'i').test(tag))) {
      const {
        name = '',
        value = '',
        error = false,
      } = dehandelizeTag(tag);

      if (error) {
        continue;
      }

      if (typeof product[name] === 'undefined') {
        product[name] = [];
      }
      if (typeof product.tagNames === 'undefined') {
        product.tagNames = [];
      }
      if (!~product.tagNames.indexOf(name)) {
        product.tagNames.push(name);
      }
      product[name].push(value);
    }
  }
  return { ...product, tags };
};

export const dehandelizeTag = (tag: any) => {
  const split = tag.split('-');
  if (split.length < 2) {
    return { error: true };
  }
  return {
    name: split.shift().toLowerCase(),
    value: split.join(' ').toLowerCase(),
  };
};

/**
 * Compiles an array that combines strings that represent
 * product variant options with strings that represent
 * tag-based filters. This is used to generate the filters
 * in the PLP sidebar.
 *
 * @param {*} products
 */
export const aggregateProductOptionsWithTags = (products = [], acceptedFilters: any = []) => {
  const filters = products.reduce((obj: any, product: any) => {
    (product.tagNames || []).forEach((tagName: string) => {
      if (typeof obj[tagName] === 'undefined') {
        obj[tagName] = {};
      }
      (product[tagName] || []).forEach((tagValue: string) => {
        obj[tagName][tagValue] = true;
      });
    });
    (product.optionsWithValues.map((option: ShopifyOptionWithValue) => option.name) || []).forEach((optionName: string) => {
      if (typeof obj[optionName] === 'undefined') {
        obj[optionName] = {};
      }
      (product[optionName] || []).forEach((optionValue: string) => {
        obj[optionName][optionValue] = true;
      });
    });
    return obj;
  }, {});

  if (window.__COLLECTION_PRICE_FILTER__ && window.__COLLECTION_PRICE_FILTER__.length) {
    filters['price'] = window.__COLLECTION_PRICE_FILTER__.map((rangeSetting) => {
      return `${rangeSetting.lower_limit}|${rangeSetting.upper_limit === -1 ? Infinity : rangeSetting.upper_limit}`;
    }).reduce((map: any, key) => {
      map[`${key}`] = true;
      return map;
    }, {});
  }

  Object.keys(filters).forEach((key: any) => {
    if (!acceptedFilters.includes(handleize(key))){
      delete filters[key];
    }
  })

  return Object.keys(filters).reduce((obj: any, key: string) => {
    obj[key] = Object.keys(filters[key]).sort((a, b) => {
      if (key === 'price') return 0;
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
    return obj;
  }, {});
};

export const selectedFacetsIndex = (facets = [], facet: any) => {
  let index = -1;
  for (let i = 0; i < facets.length; i++) {
    const { name, value } = facets[i];
    if (facet.name === name && facet.value === value) {
      index = i;
    }
  }
  return index;
};

/**
 * Returns an array of filters with a filter
 * either added or removed.
 *
 * @param {*} filters
 * @param {*} facet
 */
export const toggleSelectedFilter = (facets = [], facet: string) => {
  const index = selectedFacetsIndex(facets, facet);
  const updated: Array<any> = facets.splice(0);
  if (~index) {
    updated.splice(index, 1);
  } else {
    updated.push(facet);
  }
  return updated;
};
