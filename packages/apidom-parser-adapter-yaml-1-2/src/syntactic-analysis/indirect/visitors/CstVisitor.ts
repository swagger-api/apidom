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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: any;

  /**
   * Private API.
   */

  // eslint-disable-next-line class-methods-use-this
  private toPosition(node: TreeCursorSyntaxNode): Position {
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

  private kindNodeToYamlTag(node: TreeCursorSyntaxNode): YamlTag {
    const { tag: tagNode } = node;
    const explicitName = tagNode?.text || (node.type === 'plain_scalar' ? '?' : '!');
    const kind = node.type.endsWith('mapping')
      ? YamlNodeKind.Mapping
      : node.type.endsWith('sequence')
        ? YamlNodeKind.Sequence
        : YamlNodeKind.Scalar;
    const position = tagNode ? this.toPosition(tagNode) : null;

    return YamlTag({ explicitName, kind, position });
  }

  private kindNodeToYamlAnchor(node: TreeCursorSyntaxNode): YamlAnchor | null {
    const { anchor: anchorNode } = node;

    if (typeof anchorNode === 'undefined') return null;

    return YamlAnchor({ name: anchorNode.text, position: this.toPosition(anchorNode) });
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any
  private isKind = (ending: string) => (node: any) =>
    typeof node?.type === 'string' && node.type.endsWith(ending);

  private isScalar = this.isKind('scalar');

  private isMapping = this.isKind('mapping');

  private isSequence = this.isKind('sequence');

  // eslint-disable-next-line class-methods-use-this
  private hasKeyValuePairEmptyKey(node: TreeCursorSyntaxNode): boolean {
    if (node.type !== 'block_mapping_pair' && node.type !== 'flow_pair') {
      return false;
    }
    // keyNode was not explicitly provided; tag and anchor are missing too
    return typeof node.keyNode === 'undefined';
  }

  // eslint-disable-next-line class-methods-use-this
  private hasKeyValuePairEmptyValue(node: TreeCursorSyntaxNode): boolean {
    if (node.type !== 'block_mapping_pair' && node.type !== 'flow_pair') {
      return false;
    }
    // valueNode was not explicitly provided; tag and anchor are missing too
    return typeof node.valueNode === 'undefined';
  }

  private createKeyValuePairEmptyKey(node: TreeCursorSyntaxNode): YamlScalar {
    const emptyPoint = Point({
      row: node.startPosition.row,
      column: node.startPosition.column,
      char: node.startIndex,
    });
    const { keyNode } = node;
    const children = keyNode?.children || [];
    const tagNode = children.find(this.isKind('tag'));
    const anchorNode = children.find(this.isKind('anchor'));
    const tag =
      typeof tagNode !== 'undefined'
        ? YamlTag({
            explicitName: tagNode.text,
            kind: YamlNodeKind.Scalar,
            position: this.toPosition(tagNode),
          })
        : YamlTag({
            explicitName: '?',
            kind: YamlNodeKind.Scalar,
          });
    const anchor =
      typeof anchorNode !== 'undefined'
        ? YamlAnchor({ name: anchorNode.text, position: this.toPosition(anchorNode) })
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

  private createKeyValuePairEmptyValue(node: TreeCursorSyntaxNode): YamlScalar {
    const emptyPoint = Point({
      row: node.endPosition.row,
      column: node.endPosition.column,
      char: node.endIndex,
    });
    const { valueNode } = node;
    const children = valueNode?.children || [];
    const tagNode = children.find(this.isKind('tag'));
    const anchorNode = children.find(this.isKind('anchor'));
    const tag =
      typeof tagNode !== 'undefined'
        ? YamlTag({
            explicitName: tagNode.text,
            kind: YamlNodeKind.Scalar,
            position: this.toPosition(tagNode),
          })
        : YamlTag({
            explicitName: '?',
            kind: YamlNodeKind.Scalar,
          });
    const anchor =
      typeof anchorNode !== 'undefined'
        ? YamlAnchor({ name: anchorNode.text, position: this.toPosition(anchorNode) })
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

  /**
   * Public API.
   */

  enter(node: TreeCursorSyntaxNode): Literal | undefined {
    // missing anonymous literals from CST transformed into AST literal nodes
    if (node instanceof TreeCursorSyntaxNode && !node.isNamed) {
      const position = this.toPosition(node);
      const value = node.type || node.text;
      const { isMissing } = node;

      return Literal({ value, position, isMissing });
    }

    return undefined;
  }

  stream = {
    enter: (node: TreeCursorSyntaxNode): YamlStream => {
      const position = this.toPosition(node);

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

  yaml_directive = {
    enter: (node: TreeCursorSyntaxNode): YamlDirective => {
      const position = this.toPosition(node);
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

  tag_directive = {
    enter: (node: TreeCursorSyntaxNode): YamlDirective => {
      const position = this.toPosition(node);
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

  reserved_directive = {
    enter: (node: TreeCursorSyntaxNode): YamlDirective => {
      const position = this.toPosition(node);
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

  document = {
    enter: (node: TreeCursorSyntaxNode): YamlDocument => {
      const position = this.toPosition(node);

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

  block_node = {
    enter(node: TreeCursorSyntaxNode): TreeCursorSyntaxNode[] {
      return node.children;
    },
  };

  flow_node = {
    enter: (node: TreeCursorSyntaxNode): (TreeCursorSyntaxNode | YamlScalar)[] => {
      const [kindCandidate] = node.children.slice(-1);

      // kind node is present in flow node
      if (
        this.isScalar(kindCandidate) ||
        this.isMapping(kindCandidate) ||
        this.isSequence(kindCandidate)
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
        anchor: this.kindNodeToYamlAnchor(kindCandidate),
        tag: this.kindNodeToYamlTag(kindCandidate),
        position: Position({ start: emptyPoint, end: emptyPoint }),
        styleGroup: YamlStyleGroup.Flow,
        style: YamlStyle.Plain,
      });

      return [...node.children, emptyScalarNode];
    },
  };

  tag = {
    enter(): null {
      return null;
    },
  };

  anchor = {
    enter(): null {
      return null;
    },
  };

  block_mapping = {
    enter: (node: TreeCursorSyntaxNode) => {
      const position = this.toPosition(node);
      const tag = this.kindNodeToYamlTag(node);
      const anchor = this.kindNodeToYamlAnchor(node);
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

  block_mapping_pair = {
    enter: (node: TreeCursorSyntaxNode): YamlKeyValuePair => {
      const position = this.toPosition(node);
      const children: Array<TreeCursorSyntaxNode | YamlScalar> = [...node.children];

      if (this.hasKeyValuePairEmptyKey(node)) {
        const keyNode = this.createKeyValuePairEmptyKey(node);
        children.unshift(keyNode);
      }
      if (this.hasKeyValuePairEmptyValue(node)) {
        const valueNode = this.createKeyValuePairEmptyValue(node);
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

  flow_mapping = {
    enter: (node: TreeCursorSyntaxNode) => {
      const position = this.toPosition(node);
      const tag = this.kindNodeToYamlTag(node);
      const anchor = this.kindNodeToYamlAnchor(node);
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

  flow_pair = {
    enter: (node: TreeCursorSyntaxNode): YamlKeyValuePair => {
      const position = this.toPosition(node);
      const children: Array<TreeCursorSyntaxNode | YamlScalar> = [...node.children];

      if (this.hasKeyValuePairEmptyKey(node)) {
        const keyNode = this.createKeyValuePairEmptyKey(node);
        children.unshift(keyNode);
      }
      if (this.hasKeyValuePairEmptyValue(node)) {
        const valueNode = this.createKeyValuePairEmptyValue(node);
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

  keyValuePair = {
    leave(node: YamlKeyValuePair): void {
      node.children = node.children.flat();
    },
  };

  block_sequence = {
    enter: (node: TreeCursorSyntaxNode) => {
      const position = this.toPosition(node);
      const tag = this.kindNodeToYamlTag(node);
      const anchor = this.kindNodeToYamlAnchor(node);
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

  block_sequence_item = {
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

  flow_sequence = {
    enter: (node: TreeCursorSyntaxNode) => {
      const position = this.toPosition(node);
      const tag = this.kindNodeToYamlTag(node);
      const anchor = this.kindNodeToYamlAnchor(node);
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

  sequence = {
    leave(node: YamlSequence): void {
      node.children = node.children.flat(+Infinity);
    },
  };

  plain_scalar = {
    enter: (node: TreeCursorSyntaxNode) => {
      const position = this.toPosition(node);
      const tag = this.kindNodeToYamlTag(node);
      const anchor = this.kindNodeToYamlAnchor(node);
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

  single_quote_scalar = {
    enter: (node: TreeCursorSyntaxNode) => {
      const position = this.toPosition(node);
      const tag = this.kindNodeToYamlTag(node);
      const anchor = this.kindNodeToYamlAnchor(node);
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

  double_quote_scalar = {
    enter: (node: TreeCursorSyntaxNode) => {
      const position = this.toPosition(node);
      const tag = this.kindNodeToYamlTag(node);
      const anchor = this.kindNodeToYamlAnchor(node);
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

  block_scalar = {
    enter: (node: TreeCursorSyntaxNode) => {
      const position = this.toPosition(node);
      const tag = this.kindNodeToYamlTag(node);
      const anchor = this.kindNodeToYamlAnchor(node);
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

  comment = {
    enter(node: TreeCursorSyntaxNode): YamlComment {
      return YamlComment({ content: node.text });
    },
  };

  ERROR(
    node: TreeCursorSyntaxNode,
    key: unknown,
    parent: unknown,
    path: string[],
  ): Error | ParseResult {
    const position = this.toPosition(node);
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
