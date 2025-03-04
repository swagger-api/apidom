import { Tree as NodeTree } from 'tree-sitter';
import { Tree as WebTree } from 'web-tree-sitter';
import { ParseResultElement } from '@swagger-api/apidom-core';
import { visit, YamlJsonSchema as JsonSchema, YamlReferenceManager } from '@swagger-api/apidom-ast';

import CstVisitor, { keyMap as cstKeyMap, isNode as isCstNode } from './visitors/CstVisitor.ts';
import YamlAstVisitor, {
  keyMap as astKeyMap,
  isNode as isAstNode,
  getNodeType as getAstNodeType,
} from './visitors/YamlAstVisitor.ts';
import TreeCursorIterator from '../TreeCursorIterator.ts';

/**
 * @public
 */
export type Tree = WebTree | NodeTree;

/**
 * This version of syntactic analysis does following transformations:
 *   `TreeSitter CST -> YAML AST -> ApiDOM`
 * Two traversals passes are needed to get from CST to ApiDOM.
 * @public
 */
const analyze = (cst: Tree, { sourceMap = false } = {}): ParseResultElement => {
  const cursor = cst.walk();
  const iterator = new TreeCursorIterator(cursor);
  const [rootNode] = Array.from(iterator);
  const cstVisitor = new CstVisitor();
  const astVisitor = new YamlAstVisitor();
  const schema = new JsonSchema();
  const referenceManager = new YamlReferenceManager();

  const yamlAst = visit(rootNode, cstVisitor, {
    // @ts-ignore
    keyMap: cstKeyMap,
    nodePredicate: isCstNode,
    state: {
      schema,
      sourceMap,
      referenceManager,
    },
  });

  return visit(yamlAst.rootNode, astVisitor, {
    // @ts-ignore
    keyMap: astKeyMap,
    nodeTypeGetter: getAstNodeType,
    nodePredicate: isAstNode,
    state: {
      sourceMap,
    },
  });
};

export default analyze;
