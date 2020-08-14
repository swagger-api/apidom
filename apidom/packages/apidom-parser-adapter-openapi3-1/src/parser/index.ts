import $RefParser from '@apidevtools/json-schema-ref-parser';
import { createNamespace, ParseResultElement } from 'apidom';
import { Error, JsonArray, JsonDocument, JsonObject, JsonProperty } from 'apidom-ast';
import openapi3_1 from 'apidom-ns-openapi3-1';
import { transform } from './cst';
import specification from './specification';
import { visit } from './visitors';

const parse = async (
  source: string,
  { sourceMap = false, specObj = specification, parser = null } = {},
): Promise<ParseResultElement> => {
  const resolvedSpecObj = await $RefParser.dereference(specObj);
  const namespace = createNamespace(openapi3_1);
  // @ts-ignore
  const parseResultElement = new namespace.elements.ParseResult();
  // @ts-ignore
  const documentVisitor = resolvedSpecObj.visitors.document.$visitor();

  // @ts-ignore
  const cst = parser.parse(source);
  const ast = transform(cst);

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
