import { split, replace, tail, startsWith, map, pipe, includes } from 'ramda';
import { isEmptyString, trimCharsStart } from 'ramda-adjunct';

import { getHash } from '../../util/url';
import { InvalidJsonPointerError } from './errors';

// escape :: String -> String
export const escape = pipe(replace(/~/g, '~0'), replace(/\//g, '~1'), encodeURIComponent);

// unescape :: String -> String
export const unescape = pipe(replace(/~1/g, '/'), replace(/~0/g, '~'), decodeURIComponent);

// uriToPointer :: String -> String
export const uriToPointer = (uri: string): string => {
  const hash = getHash(uri);
  return trimCharsStart('#', hash);
};

// parse :: String -> String[]
export const parse = (pointer: string): string[] => {
  if (isEmptyString(pointer)) {
    return [];
  }

  if (!startsWith('/', pointer)) {
    throw new InvalidJsonPointerError(pointer);
  }

  const tokens = pipe(split('/'), map(unescape))(pointer);

  return tail(tokens);
};

// compile :: String[] -> String
export const compile = (tokens: string[]): string => {
  if (tokens.length === 0) {
    return '';
  }

  return `/${tokens.map(escape).join('/')}`;
};

// join :: (String, String[]) -> String
export const join = (uri: string, tokens: string[]): string => {
  const uriWithHash = !includes('#', uri) ? `#${uri}` : uri;
  const pointer = compile(tokens);

  return `${uriWithHash}${pointer}`;
};
