import stampit from 'stampit';
import { either, flatten, lensProp, over } from 'ramda';
import { isArray, isFunction, isFalse } from 'ramda-adjunct';
import { SyntaxNode, Tree } from 'tree-sitter';

import YamlStream from '../nodes/yaml/YamlStream';
import YamlDocument from '../nodes/yaml/YamlDocument';
import YamlSequence from '../nodes/yaml/YamlSequence';
import YamlMapping from '../nodes/yaml/YamlMapping';
import YamlKeyValuePair from '../nodes/yaml/YamlKeyValuePair';
import YamlTag, { YamlNodeKind } from '../nodes/yaml/YamlTag';
import YamlAnchor from '../nodes/yaml/YamlAnchor';
import YamlScalar from '../nodes/yaml/YamlScalar';
import { YamlStyle, YamlStyleGroup } from '../nodes/yaml/YamlStyle';
import ParseResult from '../ParseResult';
import Position, { Point } from '../Position';
import Literal from '../Literal';
import { isNode, visit } from '../visitor';

export const keyMap = {
  stream: ['children'],
  document: ['children'],
  mapping: ['children'],
  keyValuePair: ['children'],
  sequence: ['children'],
};

const Visitor = stampit({
  init() {
    /**
     * Private API.
     */

    const toPosition = (node: SyntaxNode | null): Position | null => {
      if (node === null) {
        return null;
      }

      const start = Point({
        row: node.startPosition.row,
        column: node.startPosition.column,
        char: node.startIndex,
      });
      const end = Point({
        row: node.endPosition.row,
        column: node.endPosition.column,
        char: node.endIndex,
      });

      return Position({ start, end });
    };

    const toTag = (node: SyntaxNode): YamlTag | null => {
      let { previousSibling } = node;

      while (previousSibling !== null && previousSibling.type !== 'tag') {
        ({ previousSibling } = previousSibling);
      }

      if (previousSibling === null) {
        return null;
      }

      // eslint-disable-next-line no-nested-ternary
      const kind = node.type.endsWith('mapping')
        ? YamlNodeKind.Mapping
        : node.type.endsWith('sequence')
        ? YamlNodeKind.Sequence
        : YamlNodeKind.Scalar;
      const position = toPosition(previousSibling);

      return YamlTag({ name: previousSibling.text, kind, position });
    };

    const toAnchor = (node: SyntaxNode): YamlAnchor | null => {
      let { previousSibling } = node;

      while (previousSibling !== null && previousSibling.type !== 'anchor') {
        ({ previousSibling } = previousSibling);
      }

      if (previousSibling === null) {
        return null;
      }

      return YamlAnchor({ name: previousSibling.text, position: toPosition(previousSibling) });
    };

    const flattenChildren = over(lensProp('children'), flatten);

    /**
     * Public API.
     */

    this.enter = function enter(node: SyntaxNode) {
      // missing anonymous literals from CST transformed into AST literal nodes
      // WARNING: be aware that web-tree-sitter and tree-sitter node bindings have inconsistency
      // in `SyntaxNode.isNamed` property. web-tree-sitter has it defined as method
      // whether tree-sitter node binding has it defined as a boolean property.
      // @ts-ignore
      if ((isFunction(node.isNamed) && !node.isNamed()) || isFalse(node.isNamed)) {
        const position = toPosition(node);
        const value = node.type || node.text;
        const isMissing = node.isMissing();

        return Literal({ value, position, isMissing });
      }

      return undefined;
    };

    this.stream = {
      enter(node: SyntaxNode) {
        const position = toPosition(node);

        return YamlStream({
          children: node.children,
          position,
          isMissing: node.isMissing(),
        });
      },
    };

    this.document = {
      enter(node: SyntaxNode) {
        const position = toPosition(node);

        return YamlDocument({
          children: node.children,
          position,
          isMissing: node.isMissing(),
        });
      },
      leave(node: YamlDocument) {
        return flattenChildren(node);
      },
    };

    this.block_node = {
      enter(node: SyntaxNode) {
        return node.children;
      },
    };

    this.flow_node = {
      enter(node: SyntaxNode) {
        return node.children;
      },
    };

    this.tag = {
      enter() {
        return null;
      },
    };

    this.anchor = {
      enter() {
        return null;
      },
    };

    this.block_mapping = {
      enter(node: SyntaxNode) {
        const position = toPosition(node);
        const tag = toTag(node);
        const anchor = toAnchor(node);

        return YamlMapping({
          children: node.children,
          position,
          anchor,
          tag,
          styleGroup: YamlStyleGroup.Block,
          style: YamlStyle.NextLine,
          isMissing: node.isMissing(),
        });
      },
    };

    this.block_mapping_pair = {
      enter(node: SyntaxNode) {
        const position = toPosition(node);

        return YamlKeyValuePair({
          children: node.children,
          position,
          isMissing: node.isMissing(),
        });
      },
    };

    this.keyValuePair = {
      leave(node: YamlKeyValuePair) {
        return flattenChildren(node);
      },
    };

    this.flow_sequence = {
      enter(node: SyntaxNode) {
        const position = toPosition(node);
        const tag = toTag(node);
        const anchor = toAnchor(node);

        return YamlSequence({
          children: node.children,
          position,
          anchor,
          tag,
          styleGroup: YamlStyleGroup.Flow,
          style: YamlStyle.Explicit,
        });
      },
    };

    this.sequence = {
      leave(node: YamlSequence) {
        return flattenChildren(node);
      },
    };

    this.plain_scalar = {
      enter(node: SyntaxNode) {
        const position = toPosition(node);
        const tag = toTag(node);
        const anchor = toAnchor(node);

        return YamlScalar({
          content: node.text,
          anchor,
          tag,
          position,
          styleGroup: YamlStyleGroup.Flow,
          style: YamlStyle.Plain,
        });
      },
    };
  },
});

export const transform = (cst: Tree): ParseResult => {
  const visitor = Visitor();
  const nodePredicate = either(isArray, isNode);
  // @ts-ignore
  const rootNode = visit(cst.rootNode, visitor, { keyMap, nodePredicate });

  return ParseResult({ children: [rootNode] });
};
