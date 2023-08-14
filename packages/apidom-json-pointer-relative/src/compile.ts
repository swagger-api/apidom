import { compile as compileJsonPointer } from '@swagger-api/apidom-json-pointer';

import { RelativeJsonPointer } from './types';

// compile :: RelativeJSONPointer -> String
const compile = (relativeJsonPointer: RelativeJsonPointer): string => {
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
};

export default compile;
