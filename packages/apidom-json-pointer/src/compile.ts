import escape from './escape';

// compile :: String[] -> String
const compile = (tokens: string[]): string => {
  if (tokens.length === 0) {
    return '';
  }

  return `/${tokens.map(escape).join('/')}`;
};

export default compile;
