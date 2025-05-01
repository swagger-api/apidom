import { unescape as baseUnescape, URIFragmentIdentifier } from '@swaggerexpert/json-pointer';

/**
 * @public
 */
const unescape = (referenceToken: string): string => {
  return URIFragmentIdentifier.from(baseUnescape(referenceToken));
};

export default unescape;
