const GRAPHQL_ENDPOINT = 'https://country-service.shopifycloud.com/graphql'

const GET_COUNTRIES = `query($locale: SupportedLocale!) {
  countries(locale: $locale) {
    name
    code
    zones {
      name
      code
    }
  }
}`

/**
 * Gets all countries
 * @param {string} locale Supported Locale
 * @returns {Promise} Resolves with the countries object
 */
export const loadCountries = (locale = 'EN') => {
  return fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      query: GET_COUNTRIES,
      variables: {
        locale,
      }
    })
  })
  .then(response => response.json())
  .then(json => json.data.countries)
}

export default loadCountries;
