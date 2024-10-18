// @ts-ignore
import hasOwnPonyfill from 'core-js-pure/actual/object/has-own';
// @ts-ignore
import replaceAllPonyfill from 'core-js-pure/actual/string/replace-all';

/**
 * These polyfills do maintain compatibility with Node.js >= 12.20.0
 */

if (!Object.hasOwn) {
  Object.hasOwn = hasOwnPonyfill;
}
if (!String.prototype.replaceAll) {
  // eslint-disable-next-line no-extend-native
  String.prototype.replaceAll = function replaceAll(search, replacement) {
    return replaceAllPonyfill(this, search, replacement);
  };
}
