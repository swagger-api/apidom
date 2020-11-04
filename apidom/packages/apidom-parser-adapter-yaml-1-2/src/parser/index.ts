import $RefParser from '@apidevtools/json-schema-ref-parser';
import { createNamespace, ParseResultElement } from 'apidom';
import { transformTreeSitterYamlCST } from 'apidom-ast';

import specification from './specification';
import { visit } from './visitors';

export const namespace = createNamespace();

const parse = async (
  source: string,
  { sourceMap = false, specObj = specification, parser = null } = {},
): Promise<ParseResultElement> => {
  const resolvedSpecObj = await $RefParser.dereference(specObj);
  // @ts-ignore
  const parseResultElement = new namespace.elements.ParseResult();
  // @ts-ignore
  const streamVisitor = resolvedSpecObj.visitors.stream.$visitor();

  // @ts-ignore
  const cst = parser.parse(source);
  const ast = transformTreeSitterYamlCST(cst);

  visit(ast.rootNode, streamVisitor, {
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
