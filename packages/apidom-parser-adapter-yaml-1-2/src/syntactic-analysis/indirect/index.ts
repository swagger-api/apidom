import { Tree as NodeTree } from 'tree-sitter';
import { Tree as WebTree } from 'web-tree-sitter';
import { ParseResultElement } from '@swagger-api/apidom-core';
import { visit, YamlJsonSchema as JsonSchema } from '@swagger-api/apidom-ast';

import CstVisitor, { keyMap as cstKeyMap, isNode as isCstNode } from './visitors/CstVisitor';
import YamlAstVisitor, {
  keyMap as astKeyMap,
  isNode as isAstNode,
  getNodeType as getAstNodeType,
} from './visitors/YamlAstVisitor';
import TreeCursorIterator from '../TreeCursorIterator';
import TreeCursorSyntaxNode from '../TreeCursorSyntaxNode';

type Tree = WebTree | NodeTree;

/**
 * This version of syntactic analysis does following transformations:
 *   TreeSitter CST -> YAML AST -> ApiDOM
 * Two traversals passes are needed to get from CST to ApiDOM.
 */
const analyze = (cst: Tree, { sourceMap = false } = {}): ParseResultElement => {
  const cursor = cst.walk();
  const iterator = new TreeCursorIterator(cursor);
  const rootNode = [...iterator][0] as TreeCursorSyntaxNode;
  const cstVisitor = CstVisitor();
  const astVisitor = YamlAstVisitor();
  const schema = JsonSchema();

  const yamlAst = visit(rootNode, cstVisitor, {
    // @ts-ignore
    keyMap: cstKeyMap,
    nodePredicate: isCstNode,
    state: {
      schema,
      sourceMap,
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
