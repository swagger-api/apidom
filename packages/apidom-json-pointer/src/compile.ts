import {
  compile as baseCompile,
  URIFragmentIdentifier,
  JSONPointerCompileError,
} from '@swaggerexpert/json-pointer';

import CompilationJsonPointerError from './errors/CompilationJsonPointerError.ts';

/**
 * @public
 */
const compile = (tokens: string[]): string => {
  try {
    return URIFragmentIdentifier.to(baseCompile(tokens)).slice(1);
  } catch (error: unknown) {
    if (error instanceof JSONPointerCompileError) {
      throw new CompilationJsonPointerError(error.message, {
        tokens,
        cause: error,
      });
    }
    throw error;
  }
};

export default compile;
