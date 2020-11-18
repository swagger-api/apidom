import $RefParser from '@apidevtools/json-schema-ref-parser';
import { createNamespace, ParseResultElement } from 'apidom';
import {
  Error,
  JsonArray,
  JsonDocument,
  JsonObject,
  JsonProperty,
  transformTreeSitterJsonCST,
} from 'apidom-ast';
import openapi3_1 from 'apidom-ns-openapi-3-1';
// @ts-ignore
import { visit, SpecificationVisitor } from 'apidom-parser-adapter-json';

import specification from './specification';

export const namespace = createNamespace(openapi3_1);

const parse = async (
  source: string,
  {
    sourceMap = false,
    specObj = specification,
    rootVisitorSpecPath = ['document'],
    parser = null,
  } = {},
): Promise<ParseResultElement> => {
  const resolvedSpecObj = await $RefParser.dereference(specObj);
  // @ts-ignore
  const parseResultElement = new namespace.elements.ParseResult();
  const rootVisitor = SpecificationVisitor({ specObj: resolvedSpecObj }).retrieveVisitorInstance(
    rootVisitorSpecPath,
  );

  // @ts-ignore
  const cst = parser.parse(source);
  const ast = transformTreeSitterJsonCST(cst);

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

  visit(ast.rootNode, rootVisitor, {
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
