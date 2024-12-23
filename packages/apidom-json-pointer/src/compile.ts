import escape from './escape.ts';
import CompilationJsonPointerError from './errors/CompilationJsonPointerError.ts';

/**
 * @public
 */
const compile = (tokens: string[]): string => {
  try {
    if (tokens.length === 0) {
      return '';
    }

    return `/${tokens.map(escape).join('/')}`;
  } catch (error: unknown) {
    throw new CompilationJsonPointerError(
      'JSON Pointer compilation of tokens encountered an error.',
      {
        tokens,
        cause: error,
      },
    );
  }
};

export default compile;
