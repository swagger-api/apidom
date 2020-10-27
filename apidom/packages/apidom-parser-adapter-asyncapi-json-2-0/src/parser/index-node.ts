import Parser from 'tree-sitter';
// @ts-ignore
import JSONLanguage from 'tree-sitter-json';
import * as apiDOM from 'apidom';

import parse from '.';

export { namespace } from './index';

const parseNode = async (
  source: string,
  options: Record<string, unknown> = {},
): Promise<apiDOM.ParseResultElement> => {
  const parser = new Parser();
  parser.setLanguage(JSONLanguage);

  // @ts-ignore
  return parse(source, { ...options, parser });
};

export default parseNode;
