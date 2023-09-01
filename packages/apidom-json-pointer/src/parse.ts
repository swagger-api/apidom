import { map, pipe, split, startsWith, tail } from 'ramda';
import { isEmptyString, trimCharsStart } from 'ramda-adjunct';

import unescape from './unescape';
import InvalidJsonPointerError from './errors/InvalidJsonPointerError';

// parse :: String -> String[]
const parse = (pointer: string): string[] => {
  if (isEmptyString(pointer)) {
    return [];
  }

  if (!startsWith('/', pointer)) {
    throw new InvalidJsonPointerError(
      `Invalid JSON Pointer "${pointer}". JSON Pointers must begin with "/"`,
      {
        pointer,
      },
    );
  }

  try {
    const tokens = pipe(split('/'), map(unescape))(pointer);
    return tail(tokens);
  } catch (error: unknown) {
    throw new InvalidJsonPointerError(
      `JSON Pointer parsing of "${pointer}" encountered an error.`,
      {
        pointer,
      },
    );
  }
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

// uriToPointer :: String -> String
export const uriToPointer = (uri: string): string => {
  const hash = getHash(uri);
  return trimCharsStart('#', hash);
};

export default parse;
