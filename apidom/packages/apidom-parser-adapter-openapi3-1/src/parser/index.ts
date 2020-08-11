import Parser from 'tree-sitter';
// @ts-ignore
import JSONLanguage from 'tree-sitter-json';
import { JsonDocument, JsonObject, JsonProperty, JsonArray } from 'apidom-ast';
import $RefParser from '@apidevtools/json-schema-ref-parser';
import * as apiDOM from 'apidom';
import openapi3_1 from 'apidom-ns-openapi3-1';
import { transform } from './cst';
import specification from './specification';
import { visit } from './visitors';

const parse = async (
  source: string,
  {
    sourceMap = false,
    specObj = specification,
    keyMap = {
      // @ts-ignore
      [JsonDocument.type]: ['child'],
      // @ts-ignore
      [JsonObject.type]: ['properties'],
      // @ts-ignore
      [JsonProperty.type]: ['key', 'value'],
      // @ts-ignore
      [JsonArray.type]: ['items'],
    },
  } = {},
): Promise<apiDOM.ParseResultElement> => {
  const resolvedSpecObj = await $RefParser.dereference(specObj);
  const namespace = apiDOM.createNamespace(openapi3_1);
  // @ts-ignore
  const parseResultElement = new namespace.elements.ParseResult();
  // @ts-ignore
  const documentVisitor = resolvedSpecObj.visitors.document.$visitor();

  const parser = new Parser();
  parser.setLanguage(JSONLanguage);

  const cst = parser.parse(source);
  const ast = transform(cst);

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
