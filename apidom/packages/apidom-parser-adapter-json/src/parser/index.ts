import { createNamespace, ParseResultElement } from 'apidom';
import { JsonDocument, JsonObject, JsonProperty, JsonArray, Error } from 'apidom-ast';

import specification, { dereference } from './specification';
import { visit } from './visitors';
import { analyze } from './syntactic-analysis';

export const namespace = createNamespace();

const parse = async (
  source: string,
  { sourceMap = false, specObj = specification, parser = null } = {},
): Promise<ParseResultElement> => {
  const resolvedSpecObj = dereference(specObj);
  // @ts-ignore
  const parseResultElement = new namespace.elements.ParseResult();
  // @ts-ignore
  const documentVisitor = resolvedSpecObj.visitors.document.$visitor();

  // @ts-ignore
  const cst = parser.parse(source);
  const ast = analyze(cst);

  const keyMap = {
    // @ts-ignore
    [JsonDocument.type]: ['children'],
    // @ts-ignore
    [JsonObject.type]: ['children'],
    // @ts-ignore
    [JsonProperty.type]: ['children'],
    // @ts-ignore
    [JsonArray.type]: ['children'],
    // @ts-ignore
    [Error.type]: ['children'],
  };

  visit(ast.rootNode, documentVisitor, {
    keyMap,
    // @ts-ignore
    state: {
      namespace,
      specObj: resolvedSpecObj,
      sourceMap,
      element: parseResultElement,
    },
  });

  return parseResultElement;
};

export default parse;
