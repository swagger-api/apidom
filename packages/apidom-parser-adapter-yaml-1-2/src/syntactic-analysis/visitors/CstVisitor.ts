import stampit from 'stampit';
import { SyntaxNode as NodeSyntaxNode } from 'tree-sitter';
import { SyntaxNode as WebSyntaxNode } from 'web-tree-sitter';
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

type SyntaxNode = WebSyntaxNode | NodeSyntaxNode;

const CstVisitor = stampit({
  props: {
    schema: null,
  },
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

    const kindNodeToYamlTag = (node: SyntaxNode) => {
      let { previousSibling } = node;

      while (previousSibling !== null && previousSibling.type !== 'tag') {
        ({ previousSibling } = previousSibling);
      }

      const explicitName = previousSibling?.text || node.type === 'plain_scalar' ? '?' : '!';

      // eslint-disable-next-line no-nested-ternary
      const kind = node.type.endsWith('mapping')
        ? YamlNodeKind.Mapping
        : node.type.endsWith('sequence')
        ? YamlNodeKind.Sequence
        : YamlNodeKind.Scalar;
      const position = toPosition(previousSibling);

      return YamlTag({ explicitName, kind, position });
    };

    const kindNodeToYamlAnchor = (node: SyntaxNode): YamlAnchor | null => {
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
     * If web-tree-sitter will support keyNode and valueNode this can be further simplified.
     */
    const isKind = (ending: string) => (node: any) =>
      typeof node?.type === 'string' && node.type.endsWith(ending);
    const isScalar = isKind('scalar');
    const isMapping = isKind('mapping');
    const isSequence = isKind('sequence');

    const getFieldFromNode = (fieldName: string, node: SyntaxNode): SyntaxNode | null => {
      return `${fieldName}Node` in node
        ? // @ts-ignore
          node[`${fieldName}Node`]
        : 'childForFieldName' in node
        ? node.childForFieldName?.(fieldName)
        : null;
    };

    const hasKeyValuePairEmptyKey = (node: SyntaxNode) => {
      if (node.type !== 'block_mapping_pair' && node.type !== 'flow_pair') {
        return false;
      }
      const keyNode = getFieldFromNode('key', node);

      // keyNode was not explicitly provided; tag and anchor are missing too
      return keyNode === null;
    };

    const hasKeyValuePairEmptyValue = (node: SyntaxNode) => {
      if (node.type !== 'block_mapping_pair' && node.type !== 'flow_pair') {
        return false;
      }

      const valueNode = getFieldFromNode('value', node);

      // valueNode was not explicitly provided; tag and anchor are missing too
      return valueNode === null;
    };

    const createKeyValuePairEmptyKey = (node: SyntaxNode) => {
      const emptyPoint = Point({
        row: node.startPosition.row,
        column: node.startPosition.column,
        char: node.startIndex,
      });
      const keyNode = getFieldFromNode('key', node);
      const children = keyNode?.children || [];
      // @ts-ignore
      const tagNode: any | undefined = children.find(isKind('tag'));
      // @ts-ignore
      const anchorNode: any | undefined = children.find(isKind('anchor'));
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

    const createKeyValuePairEmptyValue = (node: SyntaxNode) => {
      const emptyPoint = Point({
        row: node.endPosition.row,
        column: node.endPosition.column,
        char: node.endIndex,
      });
      const valueNode = getFieldFromNode('value', node);
      const children = valueNode?.children || [];
      // @ts-ignore
      const tagNode: any | undefined = children.find(isKind('tag'));
      // @ts-ignore
      const anchorNode: any | undefined = children.find(isKind('anchor'));
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

    this.enter = function enter(node: SyntaxNode) {
      // missing anonymous literals from CST transformed into AST literal nodes
      // WARNING: be aware that web-tree-sitter and tree-sitter node bindings have inconsistency
      // in `SyntaxNode.isNamed` property. web-tree-sitter has it defined as method
      // whether tree-sitter node binding has it defined as a boolean property.
      // @ts-ignore
      if ((typeof node.isNamed === 'function' && !node.isNamed()) || node.isNamed === false) {
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
      leave(stream: YamlStream) {
        return ParseResult({ children: [stream] });
      },
    };

    this.yaml_directive = {
      enter(node: SyntaxNode) {
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
      enter(node: SyntaxNode) {
        const position = toPosition(node);
        const tagHandleNode = node.child(0);
        const tagPrefixNode = node.child(1);
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
      enter(node: SyntaxNode) {
        const position = toPosition(node);
        const directiveNameNode = node.child(0);
        const directiveParameter1Node = node.child(1);
        const directiveParameter2Node = node.child(2);

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
      enter(node: SyntaxNode) {
        const position = toPosition(node);

        return YamlDocument({
          children: node.children,
          position,
          isMissing: node.isMissing(),
        });
      },
      leave(node: YamlDocument) {
        node.children = node.children.flat();
      },
    };

    this.block_node = {
      enter(node: SyntaxNode) {
        return node.children;
      },
    };

    this.flow_node = {
      enter(node: SyntaxNode) {
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
      enter(node: SyntaxNode) {
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
          isMissing: node.isMissing(),
        });

        return this.schema.resolve(mappingNode);
      },
    };

    this.block_mapping_pair = {
      enter(node: SyntaxNode) {
        const position = toPosition(node);
        const children: Array<SyntaxNode | YamlScalar> = [...node.children];

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
          isMissing: node.isMissing(),
        });
      },
    };

    this.flow_mapping = {
      enter(node: SyntaxNode) {
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
          isMissing: node.isMissing(),
        });

        return this.schema.resolve(mappingNode);
      },
    };

    this.flow_pair = {
      enter(node: SyntaxNode) {
        const position = toPosition(node);
        const children: Array<SyntaxNode | YamlScalar> = [...node.children];

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
          isMissing: node.isMissing(),
        });
      },
    };

    this.keyValuePair = {
      leave(node: YamlKeyValuePair) {
        node.children = node.children.flat();
      },
    };

    this.block_sequence = {
      enter(node: SyntaxNode) {
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
      enter(node: SyntaxNode) {
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
      enter(node: SyntaxNode) {
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
      enter(node: SyntaxNode) {
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
      enter(node: SyntaxNode) {
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
      enter(node: SyntaxNode) {
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
      enter(node: SyntaxNode) {
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
      enter(node: SyntaxNode) {
        return YamlComment({ content: node.text });
      },
    };

    this.ERROR = function ERROR(node: SyntaxNode, key: any, parent: any, path: string[]) {
      const position = toPosition(node);
      const errorNode = Error({
        children: node.children,
        position,
        isUnexpected: !node.hasError(),
        isMissing: node.isMissing(),
        value: 'YAML Syntax error',
      });

      if (path.length === 0) {
        return ParseResult({ children: [errorNode] });
      }

      return errorNode;
    };
  },
});

export default CstVisitor;
