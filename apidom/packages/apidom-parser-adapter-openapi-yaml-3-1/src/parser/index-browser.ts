import './index-browser-patch';

import Parser from 'web-tree-sitter';
import * as apiDOM from 'apidom';
// @ts-ignore
import treeSitterYaml from 'tree-sitter-yaml/tree-sitter-yaml.wasm';

import parse from '.';

export { namespace } from '.';

const parserP = (async () => {
  await Parser.init();
  const YamlLanguage = await Parser.Language.load(treeSitterYaml);
  const parser = new Parser();
  parser.setLanguage(YamlLanguage);
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
