import stampit from 'stampit';
import {
  YamlDirective,
  YamlStream,
  YamlDocument,
  YamlSequence,
  YamlMapping,
  YamlKeyValuePair,
  YamlTag,
  YamlAnchor,
  YamlScalar,
  YamlComment,
  YamlStyle,
  YamlStyleGroup,
  YamlNodeKind,
  ParseResult,
  Position,
  Point,
  Literal,
  Error,
  isNode as isCSTNode,
} from '@swagger-api/apidom-ast';

import TreeCursorSyntaxNode from '../../TreeCursorSyntaxNode';

export const keyMap = {
  stream: ['children'],
  document: ['children'],
  mapping: ['children'],
  keyValuePair: ['children'],
  sequence: ['children'],
  error: ['children'],
};

// @ts-ignore
export const isNode = (node: any) => Array.isArray(node) || isCSTNode(node);

/* eslint-disable no-param-reassign */

const CstVisitor = stampit({
  props: {
    schema: null,
  },
  init() {
    /**
     * Private API.
     */

    const toPosition = (node: TreeCursorSyntaxNode): Position => {
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

    const kindNodeToYamlTag = (node: TreeCursorSyntaxNode) => {
      const { tag: tagNode } = node;
      const explicitName = tagNode?.text || node.type === 'plain_scalar' ? '?' : '!';

      // eslint-disable-next-line no-nested-ternary
      const kind = node.type.endsWith('mapping')
        ? YamlNodeKind.Mapping
        : node.type.endsWith('sequence')
        ? YamlNodeKind.Sequence
        : YamlNodeKind.Scalar;
      const position = tagNode ? toPosition(tagNode) : null;

      return YamlTag({ explicitName, kind, position });
    };

    const kindNodeToYamlAnchor = (node: TreeCursorSyntaxNode): YamlAnchor | null => {
      const { anchor: anchorNode } = node;

      if (typeof anchorNode === 'undefined') return null;

      return YamlAnchor({ name: anchorNode.text, position: toPosition(anchorNode) });
    };

    const isKind = (ending: string) => (node: any) =>
      typeof node?.type === 'string' && node.type.endsWith(ending);
    const isScalar = isKind('scalar');
    const isMapping = isKind('mapping');
    const isSequence = isKind('sequence');

    const hasKeyValuePairEmptyKey = (node: TreeCursorSyntaxNode) => {
      if (node.type !== 'block_mapping_pair' && node.type !== 'flow_pair') {
        return false;
      }
      // keyNode was not explicitly provided; tag and anchor are missing too
      return typeof node.keyNode === 'undefined';
    };

    const hasKeyValuePairEmptyValue = (node: TreeCursorSyntaxNode) => {
      if (node.type !== 'block_mapping_pair' && node.type !== 'flow_pair') {
        return false;
      }
      // valueNode was not explicitly provided; tag and anchor are missing too
      return typeof node.valueNode === 'undefined';
    };

    const createKeyValuePairEmptyKey = (node: TreeCursorSyntaxNode) => {
      const emptyPoint = Point({
        row: node.startPosition.row,
        column: node.startPosition.column,
        char: node.startIndex,
      });
      const { keyNode } = node;
      const children = keyNode?.children || [];
      const tagNode = children.find(isKind('tag'));
      const anchorNode = children.find(isKind('anchor'));
      const tag =
        typeof tagNode !== 'undefined'
          ? YamlTag({
              explicitName: tagNode.text,
              kind: YamlNodeKind.Scalar,
              position: toPosition(tagNode),
            })
          : YamlTag({
              explicitName: '?',
              kind: YamlNodeKind.Scalar,
            });
      const anchor =
        typeof anchorNode !== 'undefined'
          ? YamlAnchor({ name: anchorNode.text, position: toPosition(anchorNode) })
          : null;

      return YamlScalar({
        content: '',
        position: Position({ start: emptyPoint, end: emptyPoint }),
        tag,
        anchor,
        styleGroup: YamlStyleGroup.Flow,
        style: YamlStyle.Plain,
      });
    };

    const createKeyValuePairEmptyValue = (node: TreeCursorSyntaxNode) => {
      const emptyPoint = Point({
        row: node.endPosition.row,
        column: node.endPosition.column,
        char: node.endIndex,
      });
      const { valueNode } = node;
      const children = valueNode?.children || [];
      const tagNode = children.find(isKind('tag'));
      const anchorNode = children.find(isKind('anchor'));
      const tag =
        typeof tagNode !== 'undefined'
          ? YamlTag({
              explicitName: tagNode.text,
              kind: YamlNodeKind.Scalar,
              position: toPosition(tagNode),
            })
          : YamlTag({
              explicitName: '?',
              kind: YamlNodeKind.Scalar,
            });
      const anchor =
        typeof anchorNode !== 'undefined'
          ? YamlAnchor({ name: anchorNode.text, position: toPosition(anchorNode) })
          : null;

      return YamlScalar({
        content: '',
        position: Position({ start: emptyPoint, end: emptyPoint }),
        tag,
        anchor,
        styleGroup: YamlStyleGroup.Flow,
        style: YamlStyle.Plain,
      });
    };

    /**
     * Public API.
     */

    this.enter = function enter(node: TreeCursorSyntaxNode) {
      // missing anonymous literals from CST transformed into AST literal nodes
      if (node instanceof TreeCursorSyntaxNode && !node.isNamed) {
        const position = toPosition(node);
        const value = node.type || node.text;
        const { isMissing } = node;

        return Literal({ value, position, isMissing });
      }

      return undefined;
    };

    this.stream = {
      enter(node: TreeCursorSyntaxNode) {
        const position = toPosition(node);

        return YamlStream({
          children: node.children,
          position,
          isMissing: node.isMissing,
        });
      },
      leave(stream: YamlStream) {
        return ParseResult({ children: [stream] });
      },
    };

    this.yaml_directive = {
      enter(node: TreeCursorSyntaxNode) {
        const position = toPosition(node);
        const version = node?.firstNamedChild?.text || null;

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
      enter(node: TreeCursorSyntaxNode) {
        const position = toPosition(node);
        const tagHandleNode = node.children[0];
        const tagPrefixNode = node.children[1];
        const tagDirective = YamlDirective({
          position,
          name: '%TAG',
          parameters: {
            handle: tagHandleNode?.text || null,
            prefix: tagPrefixNode?.text || null,
          },
        });

        this.schema.registerTagDirective(tagDirective);

        return tagDirective;
      },
    };

    this.reserved_directive = {
      enter(node: TreeCursorSyntaxNode) {
        const position = toPosition(node);
        const directiveNameNode = node.children[0];
        const directiveParameter1Node = node.children[1];
        const directiveParameter2Node = node.children[2];

        return YamlDirective({
          position,
          name: directiveNameNode?.text || null,
          parameters: {
            handle: directiveParameter1Node?.text || null,
            prefix: directiveParameter2Node?.text || null,
          },
        });
      },
    };

    this.document = {
      enter(node: TreeCursorSyntaxNode) {
        const position = toPosition(node);

        return YamlDocument({
          children: node.children,
          position,
          isMissing: node.isMissing,
        });
      },
      leave(node: YamlDocument) {
        node.children = node.children.flat();
      },
    };

    this.block_node = {
      enter(node: TreeCursorSyntaxNode) {
        return node.children;
      },
    };

    this.flow_node = {
      enter(node: TreeCursorSyntaxNode) {
        const [kindCandidate] = node.children.slice(-1);

        // kind node is present in flow node
        if (isScalar(kindCandidate) || isMapping(kindCandidate) || isSequence(kindCandidate)) {
          return node.children;
        }

        // kind node not present in flow node, creating empty node
        const emptyPoint = Point({
          row: kindCandidate.endPosition.row,
          column: kindCandidate.endPosition.column,
          char: kindCandidate.endIndex,
        });
        const emptyScalarNode = YamlScalar({
          content: '',
          anchor: kindNodeToYamlAnchor(kindCandidate),
          tag: kindNodeToYamlTag(kindCandidate),
          position: Position({ start: emptyPoint, end: emptyPoint }),
          styleGroup: YamlStyleGroup.Flow,
          style: YamlStyle.Plain,
        });

        return [...node.children, emptyScalarNode];
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
      enter(node: TreeCursorSyntaxNode) {
        const position = toPosition(node);
        const tag = kindNodeToYamlTag(node);
        const anchor = kindNodeToYamlAnchor(node);
        const mappingNode = YamlMapping({
          children: node.children,
          position,
          anchor,
          tag,
          styleGroup: YamlStyleGroup.Block,
          style: YamlStyle.NextLine,
          isMissing: node.isMissing,
        });

        return this.schema.resolve(mappingNode);
      },
    };

    this.block_mapping_pair = {
      enter(node: TreeCursorSyntaxNode) {
        const position = toPosition(node);
        const children: Array<TreeCursorSyntaxNode | YamlScalar> = [...node.children];

        if (hasKeyValuePairEmptyKey(node)) {
          const keyNode = createKeyValuePairEmptyKey(node);
          children.unshift(keyNode);
        }
        if (hasKeyValuePairEmptyValue(node)) {
          const valueNode = createKeyValuePairEmptyValue(node);
          children.push(valueNode);
        }

        return YamlKeyValuePair({
          children,
          position,
          styleGroup: YamlStyleGroup.Block,
          isMissing: node.isMissing,
        });
      },
    };

    this.flow_mapping = {
      enter(node: TreeCursorSyntaxNode) {
        const position = toPosition(node);
        const tag = kindNodeToYamlTag(node);
        const anchor = kindNodeToYamlAnchor(node);
        const mappingNode = YamlMapping({
          children: node.children,
          position,
          anchor,
          tag,
          styleGroup: YamlStyleGroup.Flow,
          style: YamlStyle.Explicit,
          isMissing: node.isMissing,
        });

        return this.schema.resolve(mappingNode);
      },
    };

    this.flow_pair = {
      enter(node: TreeCursorSyntaxNode) {
        const position = toPosition(node);
        const children: Array<TreeCursorSyntaxNode | YamlScalar> = [...node.children];

        if (hasKeyValuePairEmptyKey(node)) {
          const keyNode = createKeyValuePairEmptyKey(node);
          children.unshift(keyNode);
        }
        if (hasKeyValuePairEmptyValue(node)) {
          const valueNode = createKeyValuePairEmptyValue(node);
          children.push(valueNode);
        }

        return YamlKeyValuePair({
          children,
          position,
          styleGroup: YamlStyleGroup.Flow,
          isMissing: node.isMissing,
        });
      },
    };

    this.keyValuePair = {
      leave(node: YamlKeyValuePair) {
        node.children = node.children.flat();
      },
    };

    this.block_sequence = {
      enter(node: TreeCursorSyntaxNode) {
        const position = toPosition(node);
        const tag = kindNodeToYamlTag(node);
        const anchor = kindNodeToYamlAnchor(node);
        const sequenceNode = YamlSequence({
          children: node.children,
          position,
          anchor,
          tag,
          styleGroup: YamlStyleGroup.Block,
          style: YamlStyle.NextLine,
        });

        return this.schema.resolve(sequenceNode);
      },
    };

    this.block_sequence_item = {
      enter(node: TreeCursorSyntaxNode) {
        // flow or block node present; first node is always `-` literal
        if (node.children.length > 1) {
          return node.children;
        }

        // create empty node
        const emptyPoint = Point({
          row: node.endPosition.row,
          column: node.endPosition.column,
          char: node.endIndex,
        });
        const emptyScalarNode = YamlScalar({
          content: '',
          anchor: null,
          tag: YamlTag({
            explicitName: '?',
            kind: YamlNodeKind.Scalar,
          }),
          position: Position({ start: emptyPoint, end: emptyPoint }),
          styleGroup: YamlStyleGroup.Flow,
          style: YamlStyle.Plain,
        });

        return [emptyScalarNode];
      },
    };

    this.flow_sequence = {
      enter(node: TreeCursorSyntaxNode) {
        const position = toPosition(node);
        const tag = kindNodeToYamlTag(node);
        const anchor = kindNodeToYamlAnchor(node);
        const sequenceNode = YamlSequence({
          children: node.children.flat(),
          position,
          anchor,
          tag,
          styleGroup: YamlStyleGroup.Flow,
          style: YamlStyle.Explicit,
        });

        return this.schema.resolve(sequenceNode);
      },
    };

    this.sequence = {
      leave(node: YamlSequence) {
        node.children = node.children.flat(+Infinity);
      },
    };

    this.plain_scalar = {
      enter(node: TreeCursorSyntaxNode) {
        const position = toPosition(node);
        const tag = kindNodeToYamlTag(node);
        const anchor = kindNodeToYamlAnchor(node);
        const scalarNode = YamlScalar({
          content: node.text,
          anchor,
          tag,
          position,
          styleGroup: YamlStyleGroup.Flow,
          style: YamlStyle.Plain,
        });

        return this.schema.resolve(scalarNode);
      },
    };

    this.single_quote_scalar = {
      enter(node: TreeCursorSyntaxNode) {
        const position = toPosition(node);
        const tag = kindNodeToYamlTag(node);
        const anchor = kindNodeToYamlAnchor(node);
        const scalarNode = YamlScalar({
          content: node.text,
          anchor,
          tag,
          position,
          styleGroup: YamlStyleGroup.Flow,
          style: YamlStyle.SingleQuoted,
        });

        return this.schema.resolve(scalarNode);
      },
    };

    this.double_quote_scalar = {
      enter(node: TreeCursorSyntaxNode) {
        const position = toPosition(node);
        const tag = kindNodeToYamlTag(node);
        const anchor = kindNodeToYamlAnchor(node);
        const scalarNode = YamlScalar({
          content: node.text,
          anchor,
          tag,
          position,
          styleGroup: YamlStyleGroup.Flow,
          style: YamlStyle.DoubleQuoted,
        });

        return this.schema.resolve(scalarNode);
      },
    };

    this.block_scalar = {
      enter(node: TreeCursorSyntaxNode) {
        const position = toPosition(node);
        const tag = kindNodeToYamlTag(node);
        const anchor = kindNodeToYamlAnchor(node);
        // eslint-disable-next-line no-nested-ternary
        const style = node.text.startsWith('|')
          ? YamlStyle.Literal
          : node.text.startsWith('>')
          ? YamlStyle.Folded
          : null;
        const scalarNode = YamlScalar({
          content: node.text,
          anchor,
          tag,
          position,
          styleGroup: YamlStyleGroup.Block,
          style,
        });

        return this.schema.resolve(scalarNode);
      },
    };

    this.comment = {
      enter(node: TreeCursorSyntaxNode) {
        return YamlComment({ content: node.text });
      },
    };

    this.ERROR = function ERROR(node: TreeCursorSyntaxNode, key: any, parent: any, path: string[]) {
      const position = toPosition(node);
      const errorNode = Error({
        children: node.children,
        position,
        isUnexpected: !node.hasError,
        isMissing: node.isMissing,
        value: node.text,
      });

      if (path.length === 0) {
        return ParseResult({ children: [errorNode] });
      }

      return errorNode;
    };
  },
});

export default CstVisitor;
