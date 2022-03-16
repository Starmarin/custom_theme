/* eslint-disable */
import 'whatwg-fetch';

import {
  parseJSON,
  decode,
} from './util';

// const decodeMeta = (data: any) => {
//   data.collection && decodeCollectionMeta(data.collection);
//   return data;
// };

/**
 * Fires the actual ajax request to get the json from shopify.
 * Wraps this in a promise so we can chain onto it after it
 * completes
 *
 * @param {string} collection - The collection handle used in the URL
 * @param {string} sort - The current sort value
 * @param {int} page - The page of paginated results to return
 */
const getCollection = ({ handle, isSearch, searchQuery }: any, sort: any, page: any) => {
  const host = `//${window.location.host}`;
  const endpoint = !isSearch
    ? `${handle}?view=json-data&page=${page}&sort_by=${sort}`
    : `/search?q=${searchQuery}&type=product&view=json-data&page=${page}&sort_by=${sort}`;
  const url = `${host}${endpoint}`;

  return new Promise((resolve) => {
    console.log('resolving');
    fetch(url).then((response) => response.json()).then((data) => {
      const res: any = data;
      res.collection = parseJSON(decode(data.collection))
      resolve(res);
    });
  });
};

/**
 * Sets up a promise chain to get all pages of products.
 * First, we fire a request for page 1 to see how many pages
 * we need to get. Then, we set up a Promise.all to get
 * all the other pages at the same time.
 *
 * @param {string} collection - The collection handle used in the URL
 * @param {string} sort - The current sort value
 */
export const getAllPages = ({ handle, isSearch, searchQuery }: any, data: any, state: any) => {
  const {
    sort,
  } = state;

  const pages = Number(data.pages);

  if (pages > 1) {
    const iterations = [...Array(pages - 1).keys()];
    const chain = iterations.map(i => (
      getCollection({ handle, isSearch, searchQuery }, sort, (i + 2))
    ));

    return Promise.all(chain).then(responses => {
      responses.forEach((res: any) => {
        data.products = [...data.products, ...res.products];
      });

      return Promise.resolve(data);
    });
  }
  return Promise.resolve(data);
};

/**
 * Called directly by the Redux action. This
 * sets up the promise chain that returns the data
 * from all pages that need to be requested. This
 * is important when a collection has more than
 * 50 products, like the /collections/all collection
 *
 * @param {function} getState - Gets the current Redux state
 * @param {function} cb - Callback function to call when it's all over
 */
export default function (handle: any, state: any, dispatch: any) {
  const {
    sort,
    isSearch,
    searchQuery,
  } = state;
  getCollection({ handle, isSearch, searchQuery }, sort, 1)
    .then(data => {
      dispatch(data, true);
      return getAllPages({ handle, isSearch, searchQuery }, data, state);
    })
    .then(data => {
      dispatch(data, false);
    }).catch(e => {
      console.log(e);
    });
}
