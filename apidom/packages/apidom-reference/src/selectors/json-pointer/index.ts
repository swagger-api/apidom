import { split, replace, tail, startsWith, map, pipe, includes } from 'ramda';
import { isEmptyString, trimCharsStart, isInteger } from 'ramda-adjunct';
import { Element, isObjectElement, isArrayElement, ObjectElement, ArrayElement } from 'apidom';

import { getHash } from '../../util/url';
import { InvalidJsonPointerError, EvaluationJsonPointerError } from './errors';

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

// evaluates JSON Pointer against ApiDOM fragment
export const evaluate = (pointer: string, element: ObjectElement | ArrayElement): Element => {
  const tokens = parse(pointer);

  return tokens.reduce((acc, token) => {
    if (isObjectElement(acc)) {
      // @ts-ignore
      if (!acc.hasKey(token)) {
        throw new EvaluationJsonPointerError(`Evaluation failed on token: "${token}"`);
      }
      return acc.get(token);
    }

    if (isArrayElement(acc)) {
      if (!(token in acc.content) || !isInteger(Number(token))) {
        throw new EvaluationJsonPointerError(`Evaluation failed on token: "${token}"`);
      }
      return acc.get(Number(token));
    }

    throw new EvaluationJsonPointerError(`Evaluation failed on token: "${token}"`);
  }, element);
};
