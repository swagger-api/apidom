import { parse as parseJsonPointer } from '@swagger-api/apidom-json-pointer/modern';

import InvalidRelativeJsonPointerError from './errors/InvalidRelativeJsonPointerError.ts';
import { RelativeJsonPointer } from './types.ts';

const nonNegativeIntegerPrefixRegExp = '(?<nonNegativeIntegerPrefix>[1-9]\\d*|0)';
const indexManipulationRegExp = '(?<indexManipulation>[+-][1-9]\\d*|0)';
const hashCharacterRegExp = '(?<hashCharacter>#)';
const jsonPointerRegExp = '(?<jsonPointer>\\/.*)';
const relativeJsonPointerRegExp = new RegExp(
  `^${nonNegativeIntegerPrefixRegExp}${indexManipulationRegExp}?(${hashCharacterRegExp}|${jsonPointerRegExp})?$`,
);

/**
 * @public
 */
export const isRelativeJsonPointer = (value: any) => {
  return typeof value === 'string' && relativeJsonPointerRegExp.test(value);
};

/**
 * @public
 */
const parse = (relativePointer: string): RelativeJsonPointer => {
  const match = relativePointer.match(relativeJsonPointerRegExp);
  if (match === null || typeof match.groups === 'undefined') {
    throw new InvalidRelativeJsonPointerError(
      `Invalid Relative JSON Pointer "${relativePointer}".`,
      { relativePointer },
    );
  }

  try {
    // non-negative-integer
    const nonNegativeIntegerPrefix = parseInt(match.groups.nonNegativeIntegerPrefix, 10);
    // index-manipulation
    const indexManipulation =
      typeof match.groups.indexManipulation === 'string'
        ? parseInt(match.groups.indexManipulation, 10)
        : undefined;
    // <json-pointer>
    const jsonPointerTokens =
      typeof match.groups.jsonPointer === 'string'
        ? parseJsonPointer(match.groups.jsonPointer).tree
        : undefined;
    // "#"
    const hashCharacter = typeof match.groups.hashCharacter === 'string';

    return {
      nonNegativeIntegerPrefix,
      indexManipulation,
      jsonPointerTokens,
      hashCharacter,
    };
  } catch (error: unknown) {
    throw new InvalidRelativeJsonPointerError(
      `Relative JSON Pointer parsing of "${relativePointer}" encountered an error.`,
      {
        relativePointer,
        cause: error,
      },
    );
  }
};

export default parse;
