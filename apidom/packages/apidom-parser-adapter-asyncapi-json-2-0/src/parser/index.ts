import { invokeArgs } from 'ramda-adjunct';
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
import asyncapi2_0 from 'apidom-ns-asyncapi-2-0';
// @ts-ignore
import { visit } from 'apidom-parser-adapter-json';

import specification from './specification';

export const namespace = createNamespace(asyncapi2_0);

const parse = async (
  source: string,
  {
    sourceMap = false,
    specObj = specification,
    rootVisitorSpecPath = ['visitors', 'document', '$visitor'],
    parser = null,
  } = {},
): Promise<ParseResultElement> => {
  const resolvedSpecObj = await $RefParser.dereference(specObj);
  // @ts-ignore
  const parseResultElement = new namespace.elements.ParseResult();
  // @ts-ignore
  const cst = parser.parse(source);
  const ast = transformTreeSitterJsonCST(cst);
  const state = {
    namespace,
    specObj: resolvedSpecObj,
    sourceMap,
    element: parseResultElement,
  };
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
  const rootVisitor = invokeArgs(rootVisitorSpecPath, [], resolvedSpecObj);

  visit(ast.rootNode, rootVisitor, { keyMap, state });

  return parseResultElement;
};

export default parse;
