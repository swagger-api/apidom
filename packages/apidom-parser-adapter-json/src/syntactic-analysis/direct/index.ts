import { Tree as NodeTree } from 'tree-sitter';
import { Tree as WebTree } from 'web-tree-sitter';
import { visit, getNodeType as getCSTNodeType, isNode as isCSTNode } from '@swagger-api/apidom-ast';
import {
  ParseResultElement,
  isElement,
  isParseResultElement,
  keyMap as keyMapApiDOM,
  getNodeType as getNodeTypeApiDOM,
} from '@swagger-api/apidom-core';

import CstVisitor from './visitors/CstVisitor.ts';
import TreeCursorIterator from '../TreeCursorIterator.ts';

const keyMap = {
  document: ['children'],
  object: ['children'],
  array: ['children'],
  string: ['children'],
  property: ['children'],
  key: ['children'],
  error: ['children'],
  ...keyMapApiDOM,
};

const getNodeType = (node: any) => {
  if (isParseResultElement(node)) {
    return 'ParseResultElement';
  }
  if (isElement(node)) {
    return getNodeTypeApiDOM(node);
  }
  return getCSTNodeType(node);
};

// @ts-ignore
const isNode = (element: any) => isElement(element) || isCSTNode(element);

/**
 * This version of syntactic analysis translates TreeSitter CTS
 * directly into ApiDOM.
 *
 * Transient transformation of TreeSitter CST is performed
 * using TreeSitter cursor. TreeSitter cursor is a stateful object
 * that allows us to walk syntax tree containing large number of nodes
 * with maximum efficiency. Using this transient CST transformation
 * gives us double the performance when syntactically analyzing
 * CST into ApiDOM.
 *
 * Single traversal pass is needed to get from CST to ApiDOM.
 * @public
 */
const analyze = (cst: NodeTree | WebTree, { sourceMap = false } = {}): ParseResultElement => {
  const visitor = new CstVisitor();
  const cursor = cst.walk();
  const iterator = new TreeCursorIterator(cursor);
  const [rootNode] = Array.from(iterator);

  return visit(rootNode, visitor, {
    // @ts-ignore
    keyMap,
    nodeTypeGetter: getNodeType,
    nodePredicate: isNode,
    state: { sourceMap },
  });
};

export default analyze;
