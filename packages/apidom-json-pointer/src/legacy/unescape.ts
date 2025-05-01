import { unescape as baseUnescape, URIFragmentIdentifier } from '@swaggerexpert/json-pointer';

/**
 * @public
 * @deprecated
 */
const unescape = (referenceToken: string): string => {
  return URIFragmentIdentifier.from(baseUnescape(referenceToken));
};

export default unescape;
