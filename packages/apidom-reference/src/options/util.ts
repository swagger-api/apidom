import { mergeDeepRight, lens, path, assocPath, over } from 'ramda';
import { isEmptyString } from 'ramda-adjunct';

import { cwd } from '../util/url.ts';
import type { ReferenceOptions } from './index.ts';

/**
 * Algorithm for deep merging options.
 */

const baseURILens = lens(path(['resolve', 'baseURI']), assocPath(['resolve', 'baseURI']));
const baseURIDefault = (baseURI: string) => (isEmptyString(baseURI) ? cwd() : baseURI);

/**
 * @public
 */
// eslint-disable-next-line import/prefer-default-export
export const merge = (lObj: ReferenceOptions, rObj: Record<string, any>): ReferenceOptions => {
  const withoutDefaults = mergeDeepRight(lObj, rObj);
  // @ts-ignore
  return over(baseURILens, baseURIDefault, withoutDefaults);
};
