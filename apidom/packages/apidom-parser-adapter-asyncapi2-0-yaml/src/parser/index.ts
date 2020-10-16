import $RefParser from '@apidevtools/json-schema-ref-parser';
import { createNamespace, ParseResultElement } from 'apidom';
import {
  Error,
  YamlStream,
  YamlDocument,
  YamlMapping,
  YamlSequence,
  YamlKeyValuePair,
  transformTreeSitterYamlCST,
} from 'apidom-ast';
import asyncapi2_0 from 'apidom-ns-asyncapi2-0';

import specification from './specification';
import { visit } from './visitors';

export const namespace = createNamespace(asyncapi2_0);

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

  const keyMap = {
    // @ts-ignore
    [YamlStream.type]: ['children'],
    // @ts-ignore
    [YamlDocument.type]: ['children'],
    // @ts-ignore
    [YamlMapping.type]: ['children'],
    // @ts-ignore
    [YamlSequence.type]: ['children'],
    // @ts-ignore
    [YamlKeyValuePair.type]: ['children'],
    // @ts-ignore
    [Error.type]: ['children'],
  };

  visit(ast.rootNode, streamVisitor, {
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
