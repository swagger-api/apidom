import { split, replace, tail, startsWith, map, pipe } from 'ramda';
import { isEmptyString, isInteger, trimCharsStart } from 'ramda-adjunct';
import { Element, isObjectElement, isArrayElement } from '@swagger-api/apidom-core';

import { InvalidJsonPointerError, EvaluationJsonPointerError } from './errors';

export { InvalidJsonPointerError, EvaluationJsonPointerError };

/**
 * decodeURIComponent can throw URIError in certain cases like 'c%d'.
 * safeDecodeURIComponent is a safe variant of decodeURIComponent that never trows.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Malformed_URI|More info about URIError}
 */
const safeDecodeURIComponent = (encodedURIComponent: string): string => {
  try {
    return decodeURIComponent(encodedURIComponent);
  } catch {
    return encodedURIComponent;
  }
};

// escape :: String -> String
export const escape = pipe(replace(/~/g, '~0'), replace(/\//g, '~1'), encodeURIComponent);

// unescape :: String -> String
export const unescape = pipe(replace(/~1/g, '/'), replace(/~0/g, '~'), safeDecodeURIComponent);

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

// evaluates JSON Pointer against ApiDOM fragment
export const evaluate = <T extends Element>(pointer: string, element: T): Element => {
  const tokens = parse(pointer);

  return tokens.reduce((acc, token) => {
    if (isObjectElement(acc)) {
      // @ts-ignore
      if (!acc.hasKey(token)) {
        throw new EvaluationJsonPointerError(`Evaluation failed on token: "${token}"`);
      }
      // @ts-ignore
      return acc.get(token);
    }

    if (isArrayElement(acc)) {
      if (!(token in acc.content) || !isInteger(Number(token))) {
        throw new EvaluationJsonPointerError(`Evaluation failed on token: "${token}"`);
      }
      // @ts-ignore
      return acc.get(Number(token));
    }

    throw new EvaluationJsonPointerError(`Evaluation failed on token: "${token}"`);
  }, element);
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
