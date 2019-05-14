// import { get, pickBy, isEmpty } from 'lodash';

// export function formatCurrency(amount, currency = 'USD', options = {}) {
//   amount = amount / 100;

//   let minimumFractionDigits = 2;
//   let maximumFractionDigits = 2;

//   if (options.hasOwnProperty('minimumFractionDigits')) {
//     minimumFractionDigits = options.minimumFractionDigits;
//   } else if (options.hasOwnProperty('precision')) {
//     minimumFractionDigits = options.precision;
//     maximumFractionDigits = options.precision;
//   }

//   return amount.toLocaleString(getLocaleFromCurrency(currency), {
//     style: 'currency',
//     currency,
//     minimumFractionDigits: minimumFractionDigits,
//     maximumFractionDigits: maximumFractionDigits,
//   });
// }

// function getLocaleFromCurrency(currency) {
//   let locale;
//   switch (currency) {
//     case 'USD':
//       locale = 'en-US';
//       break;
//     case 'EUR':
//       locale = 'en-EU';
//       break;
//     default:
//       locale = currency;
//   }
//   return locale;
// }

// export const getEnvVar = v => (process.browser ? get(window, ['__NEXT_DATA__', 'env', v]) : get(process, ['env', v]));

// export const getBaseImagesUrl = () => getEnvVar('IMAGES_URL');

// export function resizeImage(imageUrl, { width, height, query, baseUrl }) {
//   if (!imageUrl) return null;
//   if (imageUrl.substr(0, 1) === '/') return imageUrl; // if image is a local image, we don't resize it with the proxy.
//   if (imageUrl.substr(0, 4).toLowerCase() !== 'http') return null; // Invalid imageUrl;
//   if (!query && imageUrl.match(/\.svg$/)) return imageUrl; // if we don't need to transform the image, no need to proxy it.
//   let queryurl = '';
//   if (query) {
//     queryurl = encodeURIComponent(query);
//   } else {
//     if (width) queryurl += `&width=${width}`;
//     if (height) queryurl += `&height=${height}`;
//   }

//   return `${getBaseImagesUrl() || baseUrl || ''}/proxy/images?src=${encodeURIComponent(imageUrl)}${queryurl}`;
// }

// export function isValidImageUrl(src) {
//   return src && (src.substr(0, 1) === '/' || src.substr(0, 4).toLowerCase() === 'http');
// }

// export function imagePreview(src, defaultImage, options = { width: 640 }) {
//   if (typeof options.width === 'string') {
//     options.width = Number(options.width.replace(/rem/, '')) * 10;
//   }
//   if (typeof options.height === 'string') {
//     options.height = Number(options.height.replace(/rem/, '')) * 10;
//   }

//   if (src) return resizeImage(src, options);
//   if (isValidImageUrl(defaultImage)) return defaultImage;
//   return null;
// }

// /**
//  * Transorm an object into a query string. Strips undefined values.
//  *
//  * ## Example
//  *
//  *    > objectToQueryString({a: 42, b: "hello", c: undefined})
//  *    "?a=42&b=hello"
//  */
// export const objectToQueryString = options => {
//   const definedOptions = pickBy(options, value => value !== undefined);
//   if (isEmpty(definedOptions)) {
//     return '';
//   }

//   const encodeValue = value => {
//     if (Array.isArray(value)) {
//       return value.concat.map(encodeURIComponent).join(',');
//     }
//     return encodeURIComponent(value);
//   };

//   return `?${Object.entries(definedOptions)
//     .map(([key, value]) => `${key}=${encodeValue(value)}`)
//     .join('&')}`;
// };

// export const queryStringToObject = search => {
//   return JSON.parse(
//     `{"${decodeURI(search)
//       .replace(/"/g, '\\"')
//       .replace(/&/g, '","')
//       .replace(/=/g, '":"')}"}`,
//   );
// };

const SI_PREFIXES = ['', 'k', 'M', 'G', 'T', 'P', 'E'];

/*
* Shortens a number to the abbreviated thousands, millions, billions, etc
* https://stackoverflow.com/a/40724354

* @param {number} number: value to shorten
* @returns {string|number}

* @example
* // return '12.3k'
* abbreviateNumber(12345, 1)
*/
export const abbreviateNumber = (number, precision = 0) => {
  // what tier? (determines SI prefix)
  const tier = (Math.log10(number) / 3) | 0;

  const round = value => {
    return precision === 0 ? Math.round(value) : value.toFixed(precision);
  };

  // if zero, we don't need a prefix
  if (tier == 0) return round(number);

  // get prefix and determine scale
  const scale = Math.pow(10, tier * 3);

  // scale the number
  const scaled = number / scale;

  return round(scaled) + SI_PREFIXES[tier];
};
