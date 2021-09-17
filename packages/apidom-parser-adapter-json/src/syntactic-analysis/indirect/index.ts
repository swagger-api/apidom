import { Tree as NodeTree } from 'tree-sitter';
import { Tree as WebTree } from 'web-tree-sitter';
import { ParseResultElement } from 'apidom';
import { visit } from 'apidom-ast';

import CstVisitor, { keyMap as cstKeyMap } from './visitors/CstVisitor';
import JsonAstVisitor, {
  keyMap as astKeyMap,
  isNode,
  getNodeType,
} from './visitors/JsonAstVisitor';

type Tree = WebTree | NodeTree;

/**
 * This version of syntactic analysis does following transformations:
 *   TreeSitter CST -> JSON AST -> ApiDOM
 * Two traversals passes are needed to get from CST to ApiDOM.
 * This analysis is much slower than the direct one, but allows
 * to do additional analysis magic on JSON AST.
 */
const analyze = (cst: Tree, { sourceMap = false } = {}): ParseResultElement => {
  const cstVisitor = CstVisitor();
  const astVisitor = JsonAstVisitor();

  const jsonAst = visit(cst.rootNode, cstVisitor, {
    // @ts-ignore
    keyMap: cstKeyMap,
    state: {
      sourceMap,
    },
  });

  return visit(jsonAst.rootNode, astVisitor, {
    // @ts-ignore
    keyMap: astKeyMap,
    // @ts-ignore
    nodeTypeGetter: getNodeType,
    nodePredicate: isNode,
    state: {
      sourceMap,
    },
  });
};

export default analyze;
