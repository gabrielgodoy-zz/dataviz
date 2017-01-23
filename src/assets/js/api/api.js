import * as axios from 'axios';

/**
 * @typedef {Object} currency
 * @property {Array} rates
 */

/**
 * @return {Promise.<currency>}
 */
export async function getCurrencies() {
  let endpoint = 'http://api.fixer.io/latest?base=USD&symbols=BRL,GBP,EUR,AUD,CAD';
  try {
    return await axios.get(endpoint);
  } catch (error) {
    console.log('API error: ', error);
    throw Error();
  }
}
