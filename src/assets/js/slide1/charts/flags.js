import * as emoji from 'node-emoji';

const emojis = {
  USD: 'flag-us',
  JPY: 'flag-jp',
  BGN: 'flag-bg',
  CZK: 'flag-cz',
  DKK: 'flag-dk',
  GBP: 'flag-gb',
  HUF: 'flag-hu',
  PLN: 'flag-pl',
  RON: 'flag-ro',
  SEK: 'flag-se',
  CHF: 'flag-ch',
  NOK: 'flag-no',
  HRK: 'flag-hr',
  RUB: 'flag-ru',
  TRY: 'flag-tr',
  AUD: 'flag-au',
  BRL: 'flag-br',
  CAD: 'flag-ca',
  CNY: 'flag-cn',
  HKD: 'flag-hk',
  IDR: 'flag-id',
  ILS: 'flag-il',
  INR: 'flag-in',
  KRW: 'flag-kr',
  MXN: 'flag-mx',
  MYR: 'flag-my',
  NZD: 'flag-nz',
  PHP: 'flag-ph',
  SGD: 'flag-sg',
  THB: 'flag-th',
  ZAR: 'flag-za',
  EUR: 'euro',
};

/**
 *
 * @param {String} countryInitial
 * @return {String}
 */
export function getCountryIcon(countryInitial) {
  return emoji.get(emojis[countryInitial]);
}
