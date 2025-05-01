import {
  parse as jsonPointerParse,
  URIFragmentIdentifier,
  ParseOptions,
} from '@swaggerexpert/json-pointer';

/**
 * @public
 */
const parse = (pointer: string, options?: ParseOptions): string[] => {
  const { tree } = jsonPointerParse(URIFragmentIdentifier.from(pointer), options);
  return tree!;
};

/**
 * Returns the hash (URL fragment), of the given path.
 * If there is no hash, then the root hash ("#") is returned.
 */
const getHash = (uri: string): string => {
  const hashIndex = uri.indexOf('#');
  if (hashIndex !== -1) {
    return uri.substring(hashIndex);
  }
  return '#';
};

/**
 * @public
 */
export const uriToPointer = (uri: string): string => {
  const hash = getHash(uri);
  return URIFragmentIdentifier.from(hash);
};

export default parse;
