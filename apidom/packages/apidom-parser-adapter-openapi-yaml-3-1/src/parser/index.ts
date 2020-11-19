import { invokeArgs } from 'ramda-adjunct';
import $RefParser from '@apidevtools/json-schema-ref-parser';
import { createNamespace, ParseResultElement } from 'apidom';
import { transformTreeSitterYamlCST } from 'apidom-ast';
import openapi3_1 from 'apidom-ns-openapi-3-1';
// @ts-ignore
import { visit } from 'apidom-parser-adapter-yaml-1-2';

import specification from './specification';

export const namespace = createNamespace(openapi3_1);

const parse = async (
  source: string,
  {
    sourceMap = false,
    specObj = specification,
    rootVisitorSpecPath = ['visitors', 'stream', '$visitor'],
    parser = null,
  } = {},
): Promise<ParseResultElement> => {
  const resolvedSpecObj = await $RefParser.dereference(specObj);
  // @ts-ignore
  const parseResultElement = new namespace.elements.ParseResult();
  // @ts-ignore
  const cst = parser.parse(source);
  const ast = transformTreeSitterYamlCST(cst);
  const state = {
    namespace,
    specObj: resolvedSpecObj,
    sourceMap,
    element: parseResultElement,
  };
  const rootVisitor = invokeArgs(rootVisitorSpecPath, [], resolvedSpecObj);

  visit(ast.rootNode, rootVisitor, { state });

  return parseResultElement;
};

export default parse;
