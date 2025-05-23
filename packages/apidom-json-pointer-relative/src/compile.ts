import { compile as compileJsonPointer } from '@swagger-api/apidom-json-pointer/modern';

import { RelativeJsonPointer } from './types.ts';
import CompilationRelativeJsonPointerError from './errors/CompilationRelativeJsonPointerError.ts';

/**
 * @public
 */
const compile = (relativeJsonPointer: RelativeJsonPointer): string => {
  try {
    let relativePointer = '';

    // non-negative-integer
    relativePointer += String(relativeJsonPointer.nonNegativeIntegerPrefix);

    // index-manipulation
    if (typeof relativeJsonPointer.indexManipulation === 'number') {
      relativePointer += String(relativeJsonPointer.indexManipulation);
    }

    if (Array.isArray(relativeJsonPointer.jsonPointerTokens)) {
      // <json-pointer>
      relativePointer += compileJsonPointer(relativeJsonPointer.jsonPointerTokens);
    } else if (relativeJsonPointer.hashCharacter) {
      // "#"
      relativePointer += '#';
    }

    return relativePointer;
  } catch (error: unknown) {
    throw new CompilationRelativeJsonPointerError(
      'Relative JSON Pointer compilation encountered an error.',
      {
        relativePointer: relativeJsonPointer,
        cause: error,
      },
    );
  }
};

export default compile;
