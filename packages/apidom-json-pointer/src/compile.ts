import escape from './escape';
import CompilationJsonPointerError from './errors/CompilationJsonPointerError';

// compile :: String[] -> String
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
      },
    );
  }
};

export default compile;
