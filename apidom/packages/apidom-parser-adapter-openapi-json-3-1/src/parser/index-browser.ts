import './index-browser-patch';

import Parser from 'web-tree-sitter';
import * as apiDOM from 'apidom';
// @ts-ignore
import treeSitterJson from 'tree-sitter-json/tree-sitter-json.wasm';

import parse from './index';

export { namespace } from './index';

const parserP = (async () => {
  await Parser.init();
  const JsonLanguage = await Parser.Language.load(treeSitterJson);
  const parser = new Parser();
  parser.setLanguage(JsonLanguage);
  return parser;
})();

const parseBrowser = async (
  source: string,
  options: Record<string, unknown> = {},
): Promise<apiDOM.ParseResultElement> => {
  const parser = await parserP;
  // @ts-ignore
  return parse(source, { ...options, parser });
};

export default parseBrowser;
