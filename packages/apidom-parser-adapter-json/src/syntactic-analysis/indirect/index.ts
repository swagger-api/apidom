import { Tree as NodeTree } from 'tree-sitter';
import { Tree as WebTree } from 'web-tree-sitter';
import { ParseResultElement } from '@swagger-api/apidom-core';
import { visit } from '@swagger-api/apidom-ast';

import TreeCursorIterator from '../TreeCursorIterator.ts';
import CstVisitor, { keyMap as cstKeyMap } from './visitors/CstVisitor.ts';
import JsonAstVisitor, {
  keyMap as astKeyMap,
  isNode,
  getNodeType,
} from './visitors/JsonAstVisitor.ts';

/**
 * @public
 */
export type Tree = WebTree | NodeTree;

/**
 * This version of syntactic analysis does following transformations:
 *   `TreeSitter CST -> JSON AST -> ApiDOM`
 *
 * Transient transformation of TreeSitter CST is performed
 * using TreeSitter cursor. TreeSitter cursor is a stateful object
 * that allows us to walk syntax tree containing large number of nodes
 * with maximum efficiency. Using this transient CST transformation
 * gives us double the performance when syntactically analyzing
 * CST into JSON AST.
 *
 * Two traversals passes are needed to get from CST to ApiDOM.
 * This analysis is much slower than the direct one, but allows
 * to do additional analysis magic on JSON AST.
 * @public
 */
const analyze = (cst: Tree, { sourceMap = false } = {}): ParseResultElement => {
  const cursor = cst.walk();
  const iterator = new TreeCursorIterator(cursor);
  const [rootNode] = Array.from(iterator);
  const cstVisitor = new CstVisitor();
  const astVisitor = new JsonAstVisitor();

  const jsonAst = visit(rootNode, cstVisitor, {
    // @ts-ignore
    keyMap: cstKeyMap,
    state: {
      sourceMap,
    },
  });

  return visit(jsonAst.rootNode, astVisitor, {
    // @ts-ignore
    keyMap: astKeyMap,
    nodeTypeGetter: getNodeType,
    nodePredicate: isNode,
    state: {
      sourceMap,
    },
  });
};

export default analyze;
