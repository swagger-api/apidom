import stampit from 'stampit';
import { either, unnest, propOr, pathOr } from 'ramda';
import { isArray, isFalse, isFunction } from 'ramda-adjunct';
import { SyntaxNode, Tree } from 'tree-sitter';

import YamlDirective from '../nodes/yaml/YamlDirective';
import YamlStream from '../nodes/yaml/YamlStream';
import YamlDocument from '../nodes/yaml/YamlDocument';
import YamlSequence from '../nodes/yaml/YamlSequence';
import YamlMapping from '../nodes/yaml/YamlMapping';
import YamlKeyValuePair from '../nodes/yaml/YamlKeyValuePair';
import YamlTag, { YamlNodeKind } from '../nodes/yaml/YamlTag';
import YamlAnchor from '../nodes/yaml/YamlAnchor';
import YamlScalar from '../nodes/yaml/YamlScalar';
import YamlComment from '../nodes/yaml/YamlComment';
import { YamlStyle, YamlStyleGroup } from '../nodes/yaml/YamlStyle';
import ParseResult from '../ParseResult';
import Position, { Point } from '../Position';
import Literal from '../Literal';
import Error from '../Error';
import { isNode, visit } from '../visitor';

export const keyMap = {
  stream: ['children'],
  document: ['children'],
  mapping: ['children'],
  keyValuePair: ['children'],
  sequence: ['children'],
  error: ['children'],
};

/* eslint-disable no-param-reassign */

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

    this.yaml_directive = {
      enter(node: SyntaxNode) {
        const position = toPosition(node);
        const version = pathOr(null, ['firstNamedChild', 'text'], node);

        return YamlDirective({
          position,
          name: '%YAML',
          parameters: {
            version,
          },
        });
      },
    };

    this.tag_directive = {
      enter(node: SyntaxNode) {
        const position = toPosition(node);
        const tagHandleNode = node.child(0);
        const tagPrefixNode = node.child(1);

        return YamlDirective({
          position,
          name: '%TAG',
          parameters: {
            handle: propOr(null, 'text', tagHandleNode),
            prefix: propOr(null, 'text', tagPrefixNode),
          },
        });
      },
    };

    this.reserved_directive = {
      enter(node: SyntaxNode) {
        const position = toPosition(node);
        const directiveNameNode = node.child(0);
        const directiveParameter1Node = node.child(1);
        const directiveParameter2Node = node.child(2);

        return YamlDirective({
          position,
          name: propOr(null, 'text', directiveNameNode),
          parameters: {
            handle: propOr(null, 'text', directiveParameter1Node),
            prefix: propOr(null, 'text', directiveParameter2Node),
          },
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
        node.children = unnest(node.children);
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
          styleGroup: YamlStyleGroup.Block,
          isMissing: node.isMissing(),
        });
      },
    };

    this.flow_mapping = {
      enter(node: SyntaxNode) {
        const position = toPosition(node);
        const tag = toTag(node);
        const anchor = toAnchor(node);

        return YamlMapping({
          children: node.children,
          position,
          anchor,
          tag,
          styleGroup: YamlStyleGroup.Flow,
          style: YamlStyle.Explicit,
          isMissing: node.isMissing(),
        });
      },
    };

    this.flow_pair = {
      enter(node: SyntaxNode) {
        const position = toPosition(node);

        return YamlKeyValuePair({
          children: unnest(node.children),
          position,
          styleGroup: YamlStyleGroup.Flow,
          isMissing: node.isMissing(),
        });
      },
    };

    this.keyValuePair = {
      leave(node: YamlKeyValuePair) {
        node.children = unnest(node.children);
      },
    };

    this.block_sequence = {
      enter(node: SyntaxNode) {
        const position = toPosition(node);
        const tag = toTag(node);
        const anchor = toAnchor(node);

        return YamlSequence({
          children: unnest(node.children),
          position,
          anchor,
          tag,
          styleGroup: YamlStyleGroup.Block,
          style: YamlStyle.NextLine,
        });
      },
    };

    this.block_sequence_item = {
      enter(node: SyntaxNode) {
        return node.children;
      },
    };

    this.flow_sequence = {
      enter(node: SyntaxNode) {
        const position = toPosition(node);
        const tag = toTag(node);
        const anchor = toAnchor(node);

        return YamlSequence({
          children: unnest(node.children),
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
        node.children = unnest(node.children);
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

    this.single_quote_scalar = {
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
          style: YamlStyle.SingleQuoted,
        });
      },
    };

    this.double_quote_scalar = {
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
          style: YamlStyle.DoubleQuoted,
        });
      },
    };

    this.block_scalar = {
      enter(node: SyntaxNode) {
        const position = toPosition(node);
        const tag = toTag(node);
        const anchor = toAnchor(node);
        // eslint-disable-next-line no-nested-ternary
        const style = node.text.startsWith('|')
          ? YamlStyle.Literal
          : node.text.startsWith('>')
          ? YamlStyle.Folded
          : null;

        return YamlScalar({
          content: node.text,
          anchor,
          tag,
          position,
          styleGroup: YamlStyleGroup.Block,
          style,
        });
      },
    };

    this.comment = {
      enter(node: SyntaxNode) {
        return YamlComment({ content: node.text });
      },
    };

    this.ERROR = function ERROR(node: SyntaxNode) {
      const position = toPosition(node);

      return Error({
        children: node.children,
        position,
        isUnexpected: !node.hasError(),
        isMissing: node.isMissing(),
        value: node.text,
      });
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
