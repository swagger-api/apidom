import { mergeDeepRight, lens, path, assocPath, over } from 'ramda';
import { isEmptyString } from 'ramda-adjunct';

import { ReferenceOptions as IReferenceOptions } from '../types';
import { cwd } from '../util/url';

/**
 * Algorithm for deep merging options.
 */

const baseURILens = lens(path(['resolve', 'baseURI']), assocPath(['resolve', 'baseURI']));
const baseURIDefault = (baseURI: string) => (isEmptyString(baseURI) ? cwd() : baseURI);

// eslint-disable-next-line import/prefer-default-export
export const merge = (lObj: IReferenceOptions, rObj: Record<string, any>): IReferenceOptions => {
  const withoutDefaults = mergeDeepRight(lObj, rObj);
  // @ts-ignore
  return over(baseURILens, baseURIDefault, withoutDefaults);
};
