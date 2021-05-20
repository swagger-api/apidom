import { Tree as NodeTree } from 'tree-sitter';
import { Tree as WebTree } from 'web-tree-sitter';
import { ParseResultElement } from 'apidom';
import { visit, YamlJsonSchema as JsonSchema } from 'apidom-ast';

import CstVisitor, { keyMap as cstKeyMap, isNode as isCstNode } from './visitors/CstVisitor';
import YamlAstVisitor, {
  keyMap as astKeyMap,
  isNode as isAstNode,
  getNodeType as getAstNodeType,
} from './visitors/YamlAstVisitor';

type Tree = WebTree | NodeTree;

/**
 * This version of syntactic analysis does following transformations:
 *   TreeSitter CST -> YAML AST -> ApiDOM
 * Two traversals passes are needed to get from CST to ApiDOM.
 */
const analyze = (cst: Tree, { sourceMap = false } = {}): ParseResultElement => {
  const cstVisitor = CstVisitor();
  const astVisitor = YamlAstVisitor();
  const schema = JsonSchema();

  const yamlAst = visit(cst.rootNode, cstVisitor, {
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
    // @ts-ignore
    nodeTypeGetter: getAstNodeType,
    nodePredicate: isAstNode,
    state: {
      sourceMap,
    },
  });
};

export default analyze;
