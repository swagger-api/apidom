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

export const isNode = (node: unknown) => Array.isArray(node) || isCSTNode(node);

/* eslint-disable no-param-reassign */

class CstVisitor {
  private static isScalar = this.isKind('scalar');

  private static isMapping = this.isKind('mapping');

  private static isSequence = this.isKind('sequence');

  private static isKind(ending: string) {
    return (node: unknown) =>
      node != null &&
      typeof node === 'object' &&
      'type' in node &&
      typeof node.type === 'string' &&
      node.type.endsWith(ending);
  }

  private static toPosition(node: TreeCursorSyntaxNode): Position {
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
  }

  private static hasKeyValuePairEmptyKey(node: TreeCursorSyntaxNode): boolean {
    if (node.type !== 'block_mapping_pair' && node.type !== 'flow_pair') {
      return false;
    }
    // keyNode was not explicitly provided; tag and anchor are missing too
    return typeof node.keyNode === 'undefined';
  }

  private static hasKeyValuePairEmptyValue(node: TreeCursorSyntaxNode): boolean {
    if (node.type !== 'block_mapping_pair' && node.type !== 'flow_pair') {
      return false;
    }
    // valueNode was not explicitly provided; tag and anchor are missing too
    return typeof node.valueNode === 'undefined';
  }

  private static kindNodeToYamlTag(node: TreeCursorSyntaxNode): YamlTag {
    const { tag: tagNode } = node;
    const explicitName = tagNode?.text || (node.type === 'plain_scalar' ? '?' : '!');
    const kind = node.type.endsWith('mapping')
      ? YamlNodeKind.Mapping
      : node.type.endsWith('sequence')
        ? YamlNodeKind.Sequence
        : YamlNodeKind.Scalar;
    const position = tagNode ? CstVisitor.toPosition(tagNode) : null;

    return YamlTag({ explicitName, kind, position });
  }

  private static kindNodeToYamlAnchor(node: TreeCursorSyntaxNode): YamlAnchor | null {
    const { anchor: anchorNode } = node;

    if (typeof anchorNode === 'undefined') return null;

    return YamlAnchor({ name: anchorNode.text, position: CstVisitor.toPosition(anchorNode) });
  }

  private static createKeyValuePairEmptyKey(node: TreeCursorSyntaxNode): YamlScalar {
    const emptyPoint = Point({
      row: node.startPosition.row,
      column: node.startPosition.column,
      char: node.startIndex,
    });
    const { keyNode } = node;
    const children = keyNode?.children || [];
    const tagNode = children.find(CstVisitor.isKind('tag'));
    const anchorNode = children.find(CstVisitor.isKind('anchor'));
    const tag =
      typeof tagNode !== 'undefined'
        ? YamlTag({
            explicitName: tagNode.text,
            kind: YamlNodeKind.Scalar,
            position: CstVisitor.toPosition(tagNode),
          })
        : YamlTag({
            explicitName: '?',
            kind: YamlNodeKind.Scalar,
          });
    const anchor =
      typeof anchorNode !== 'undefined'
        ? YamlAnchor({ name: anchorNode.text, position: CstVisitor.toPosition(anchorNode) })
        : null;

    return YamlScalar({
      content: '',
      position: Position({ start: emptyPoint, end: emptyPoint }),
      tag,
      anchor,
      styleGroup: YamlStyleGroup.Flow,
      style: YamlStyle.Plain,
    });
  }

  private static createKeyValuePairEmptyValue(node: TreeCursorSyntaxNode): YamlScalar {
    const emptyPoint = Point({
      row: node.endPosition.row,
      column: node.endPosition.column,
      char: node.endIndex,
    });
    const { valueNode } = node;
    const children = valueNode?.children || [];
    const tagNode = children.find(CstVisitor.isKind('tag'));
    const anchorNode = children.find(CstVisitor.isKind('anchor'));
    const tag =
      typeof tagNode !== 'undefined'
        ? YamlTag({
            explicitName: tagNode.text,
            kind: YamlNodeKind.Scalar,
            position: CstVisitor.toPosition(tagNode),
          })
        : YamlTag({
            explicitName: '?',
            kind: YamlNodeKind.Scalar,
          });
    const anchor =
      typeof anchorNode !== 'undefined'
        ? YamlAnchor({ name: anchorNode.text, position: CstVisitor.toPosition(anchorNode) })
        : null;

    return YamlScalar({
      content: '',
      position: Position({ start: emptyPoint, end: emptyPoint }),
      tag,
      anchor,
      styleGroup: YamlStyleGroup.Flow,
      style: YamlStyle.Plain,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public schema!: any;

  public stream = {
    enter: (node: TreeCursorSyntaxNode): YamlStream => {
      const position = CstVisitor.toPosition(node);

      return YamlStream({
        children: node.children,
        position,
        isMissing: node.isMissing,
      });
    },
    leave(stream: YamlStream): ParseResult {
      return ParseResult({ children: [stream] });
    },
  };

  public yaml_directive = {
    enter: (node: TreeCursorSyntaxNode): YamlDirective => {
      const position = CstVisitor.toPosition(node);
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

  public tag_directive = {
    enter: (node: TreeCursorSyntaxNode): YamlDirective => {
      const position = CstVisitor.toPosition(node);
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

  public reserved_directive = {
    enter: (node: TreeCursorSyntaxNode): YamlDirective => {
      const position = CstVisitor.toPosition(node);
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

  public document = {
    enter: (node: TreeCursorSyntaxNode): YamlDocument => {
      const position = CstVisitor.toPosition(node);

      return YamlDocument({
        children: node.children,
        position,
        isMissing: node.isMissing,
      });
    },
    leave(node: YamlDocument): void {
      node.children = node.children.flat();
    },
  };

  public block_node = {
    enter(node: TreeCursorSyntaxNode): TreeCursorSyntaxNode[] {
      return node.children;
    },
  };

  public flow_node = {
    enter: (node: TreeCursorSyntaxNode): (TreeCursorSyntaxNode | YamlScalar)[] => {
      const [kindCandidate] = node.children.slice(-1);

      // kind node is present in flow node
      if (
        CstVisitor.isScalar(kindCandidate) ||
        CstVisitor.isMapping(kindCandidate) ||
        CstVisitor.isSequence(kindCandidate)
      ) {
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
        anchor: CstVisitor.kindNodeToYamlAnchor(kindCandidate),
        tag: CstVisitor.kindNodeToYamlTag(kindCandidate),
        position: Position({ start: emptyPoint, end: emptyPoint }),
        styleGroup: YamlStyleGroup.Flow,
        style: YamlStyle.Plain,
      });

      return [...node.children, emptyScalarNode];
    },
  };

  public tag = {
    enter(): null {
      return null;
    },
  };

  public anchor = {
    enter(): null {
      return null;
    },
  };

  public block_mapping = {
    enter: (node: TreeCursorSyntaxNode) => {
      const position = CstVisitor.toPosition(node);
      const tag = CstVisitor.kindNodeToYamlTag(node);
      const anchor = CstVisitor.kindNodeToYamlAnchor(node);
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

  public block_mapping_pair = {
    enter: (node: TreeCursorSyntaxNode): YamlKeyValuePair => {
      const position = CstVisitor.toPosition(node);
      const children: Array<TreeCursorSyntaxNode | YamlScalar> = [...node.children];

      if (CstVisitor.hasKeyValuePairEmptyKey(node)) {
        const keyNode = CstVisitor.createKeyValuePairEmptyKey(node);
        children.unshift(keyNode);
      }
      if (CstVisitor.hasKeyValuePairEmptyValue(node)) {
        const valueNode = CstVisitor.createKeyValuePairEmptyValue(node);
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

  public flow_mapping = {
    enter: (node: TreeCursorSyntaxNode) => {
      const position = CstVisitor.toPosition(node);
      const tag = CstVisitor.kindNodeToYamlTag(node);
      const anchor = CstVisitor.kindNodeToYamlAnchor(node);
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

  public flow_pair = {
    enter: (node: TreeCursorSyntaxNode): YamlKeyValuePair => {
      const position = CstVisitor.toPosition(node);
      const children: Array<TreeCursorSyntaxNode | YamlScalar> = [...node.children];

      if (CstVisitor.hasKeyValuePairEmptyKey(node)) {
        const keyNode = CstVisitor.createKeyValuePairEmptyKey(node);
        children.unshift(keyNode);
      }
      if (CstVisitor.hasKeyValuePairEmptyValue(node)) {
        const valueNode = CstVisitor.createKeyValuePairEmptyValue(node);
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

  public keyValuePair = {
    leave(node: YamlKeyValuePair): void {
      node.children = node.children.flat();
    },
  };

  public block_sequence = {
    enter: (node: TreeCursorSyntaxNode) => {
      const position = CstVisitor.toPosition(node);
      const tag = CstVisitor.kindNodeToYamlTag(node);
      const anchor = CstVisitor.kindNodeToYamlAnchor(node);
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

  public block_sequence_item = {
    enter(node: TreeCursorSyntaxNode): TreeCursorSyntaxNode[] | YamlScalar[] {
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

  public flow_sequence = {
    enter: (node: TreeCursorSyntaxNode) => {
      const position = CstVisitor.toPosition(node);
      const tag = CstVisitor.kindNodeToYamlTag(node);
      const anchor = CstVisitor.kindNodeToYamlAnchor(node);
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

  public sequence = {
    leave(node: YamlSequence): void {
      node.children = node.children.flat(+Infinity);
    },
  };

  public plain_scalar = {
    enter: (node: TreeCursorSyntaxNode) => {
      const position = CstVisitor.toPosition(node);
      const tag = CstVisitor.kindNodeToYamlTag(node);
      const anchor = CstVisitor.kindNodeToYamlAnchor(node);
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

  public single_quote_scalar = {
    enter: (node: TreeCursorSyntaxNode) => {
      const position = CstVisitor.toPosition(node);
      const tag = CstVisitor.kindNodeToYamlTag(node);
      const anchor = CstVisitor.kindNodeToYamlAnchor(node);
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

  public double_quote_scalar = {
    enter: (node: TreeCursorSyntaxNode) => {
      const position = CstVisitor.toPosition(node);
      const tag = CstVisitor.kindNodeToYamlTag(node);
      const anchor = CstVisitor.kindNodeToYamlAnchor(node);
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

  public block_scalar = {
    enter: (node: TreeCursorSyntaxNode) => {
      const position = CstVisitor.toPosition(node);
      const tag = CstVisitor.kindNodeToYamlTag(node);
      const anchor = CstVisitor.kindNodeToYamlAnchor(node);
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

  public comment = {
    enter(node: TreeCursorSyntaxNode): YamlComment {
      return YamlComment({ content: node.text });
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(schema?: any) {
    this.schema = schema;
  }

  // eslint-disable-next-line class-methods-use-this
  public enter(node: TreeCursorSyntaxNode): Literal | undefined {
    // missing anonymous literals from CST transformed into AST literal nodes
    if (node instanceof TreeCursorSyntaxNode && !node.isNamed) {
      const position = CstVisitor.toPosition(node);
      const value = node.type || node.text;
      const { isMissing } = node;

      return Literal({ value, position, isMissing });
    }

    return undefined;
  }

  // eslint-disable-next-line class-methods-use-this
  public ERROR(
    node: TreeCursorSyntaxNode,
    key: unknown,
    parent: unknown,
    path: string[],
  ): Error | ParseResult {
    const position = CstVisitor.toPosition(node);
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
  }
}

export default CstVisitor;
