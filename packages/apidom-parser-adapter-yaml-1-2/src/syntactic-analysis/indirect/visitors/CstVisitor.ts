import {
  Error,
  isNode as isCSTNode,
  Literal,
  ParseResult,
  Point,
  Position,
  YamlNode,
  YamlAlias,
  YamlAnchor,
  YamlComment,
  YamlDirective,
  YamlDocument,
  YamlKeyValuePair,
  YamlMapping,
  YamlNodeKind,
  YamlReferenceManager,
  YamlScalar,
  YamlSequence,
  YamlStream,
  YamlStyle,
  YamlStyleGroup,
  YamlTag,
} from '@swagger-api/apidom-ast';

import TreeCursorSyntaxNode from '../../TreeCursorSyntaxNode.ts';

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

  // private static toPosition(node: TreeCursorSyntaxNode): Position {
  //   // return undefined;

  //   const start = new Point({
  //     row: node.startPosition.row,
  //     column: node.startPosition.column,
  //     char: node.startIndex,
  //   });
  //   const end = new Point({
  //     row: node.endPosition.row,
  //     column: node.endPosition.column,
  //     char: node.endIndex,
  //   });

  //   return new Position({ start, end });

  //   // return `${node.startPosition},${node.endPosition}`;

  //   // return `${node.startPositionRow},${node.startPositionColumn},${node.startIndex},${node.endPositionRow},${node.endPositionColumn},${node.endIndex}`;
  // }

  private static kindNodeToYamlAnchor(node: TreeCursorSyntaxNode): YamlAnchor | undefined {
    const { anchor: anchorNode } = node;

    if (typeof anchorNode === 'undefined') return undefined;

    return new YamlAnchor({
      name: anchorNode.text,
      // position: CstVisitor.toPosition(anchorNode),
      startPositionRow: anchorNode.startPositionRow,
      startPositionColumn: anchorNode.startPositionColumn,
      startIndex: anchorNode.startIndex,
      endPositionRow: anchorNode.endPositionRow,
      endPositionColumn: anchorNode.endPositionColumn,
      endIndex: anchorNode.endIndex,
    });
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
    // const position = tagNode ? CstVisitor.toPosition(tagNode) : undefined;

    return new YamlTag({
      explicitName,
      kind,
      // position,
      startPositionRow: tagNode?.startPositionRow,
      startPositionColumn: tagNode?.startPositionColumn,
      startIndex: tagNode?.startIndex,
      endPositionRow: tagNode?.endPositionRow,
      endPositionColumn: tagNode?.endPositionColumn,
      endIndex: tagNode?.endIndex,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public schema!: any;

  public referenceManager!: YamlReferenceManager;

  public readonly stream = {
    enter: (node: TreeCursorSyntaxNode): YamlStream => {
      // const position = CstVisitor.toPosition(node);

      return new YamlStream({
        children: node.children,
        // position,
        startPositionRow: node.startPositionRow,
        startPositionColumn: node.startPositionColumn,
        startIndex: node.startIndex,
        endPositionRow: node.endPositionRow,
        endPositionColumn: node.endPositionColumn,
        endIndex: node.endIndex,
        isMissing: node.isMissing,
      });
    },
    leave: (stream: YamlStream): ParseResult => {
      return new ParseResult({ children: [stream] });
    },
  };

  public readonly yaml_directive = {
    enter: (node: TreeCursorSyntaxNode): YamlDirective => {
      // const position = CstVisitor.toPosition(node);
      const version = node?.firstNamedChild?.text;

      return new YamlDirective({
        // position,
        startPositionRow: node.startPositionRow,
        startPositionColumn: node.startPositionColumn,
        startIndex: node.startIndex,
        endPositionRow: node.endPositionRow,
        endPositionColumn: node.endPositionColumn,
        endIndex: node.endIndex,
        name: '%YAML',
        parameters: {
          version,
        },
      });
    },
  };

  public readonly tag_directive = {
    enter: (node: TreeCursorSyntaxNode): YamlDirective => {
      // const position = CstVisitor.toPosition(node);
      const tagHandleNode = node.children[0];
      const tagPrefixNode = node.children[1];
      const tagDirective = new YamlDirective({
        // position,
        startPositionRow: node.startPositionRow,
        startPositionColumn: node.startPositionColumn,
        startIndex: node.startIndex,
        endPositionRow: node.endPositionRow,
        endPositionColumn: node.endPositionColumn,
        endIndex: node.endIndex,
        name: '%TAG',
        parameters: {
          handle: tagHandleNode?.text,
          prefix: tagPrefixNode?.text,
        },
      });

      this.schema.registerTagDirective(tagDirective);

      return tagDirective;
    },
  };

  public readonly reserved_directive = {
    enter: (node: TreeCursorSyntaxNode): YamlDirective => {
      // const position = CstVisitor.toPosition(node);
      const directiveNameNode = node.children[0];
      const directiveParameter1Node = node.children[1];
      const directiveParameter2Node = node.children[2];

      return new YamlDirective({
        // position,
        startPositionRow: node.startPositionRow,
        startPositionColumn: node.startPositionColumn,
        startIndex: node.startIndex,
        endPositionRow: node.endPositionRow,
        endPositionColumn: node.endPositionColumn,
        endIndex: node.endIndex,
        name: directiveNameNode?.text,
        parameters: {
          handle: directiveParameter1Node?.text,
          prefix: directiveParameter2Node?.text,
        },
      });
    },
  };

  public readonly document = {
    enter: (node: TreeCursorSyntaxNode): YamlDocument => {
      // const position = CstVisitor.toPosition(node);

      return new YamlDocument({
        children: node.children,
        // position,
        startPositionRow: node.startPositionRow,
        startPositionColumn: node.startPositionColumn,
        startIndex: node.startIndex,
        endPositionRow: node.endPositionRow,
        endPositionColumn: node.endPositionColumn,
        endIndex: node.endIndex,
        isMissing: node.isMissing,
      });
    },
    leave: (node: YamlDocument): void => {
      node.children = node.children.flat();
    },
  };

  public readonly block_node = {
    enter: (node: TreeCursorSyntaxNode): TreeCursorSyntaxNode[] => {
      return node.children;
    },
  };

  public readonly flow_node = {
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
      // // kind node not present in flow node, creating empty node
      // const emptyPoint = new Point({
      //   row: kindCandidate.endPosition.row,
      //   column: kindCandidate.endPosition.column,
      //   char: kindCandidate.endIndex,
      // });
      const emptyScalarNode = new YamlScalar({
        content: '',
        anchor: CstVisitor.kindNodeToYamlAnchor(kindCandidate),
        tag: CstVisitor.kindNodeToYamlTag(kindCandidate),
        // position: new Position({ start: emptyPoint, end: emptyPoint }),
        // position: `${kindCandidate.endPosition},${kindCandidate.endPosition}`,
        // position: `${kindCandidate.endPositionRow},${kindCandidate.endPositionColumn},${kindCandidate.endIndex},${kindCandidate.endPositionRow},${kindCandidate.endPositionColumn},${kindCandidate.endIndex}`,
        // position: undefined,
        startPositionRow: kindCandidate.endPositionRow,
        startPositionColumn: kindCandidate.endPositionColumn,
        startIndex: kindCandidate.endIndex,
        endPositionRow: kindCandidate.endPositionRow,
        endPositionColumn: kindCandidate.endPositionColumn,
        endIndex: kindCandidate.endIndex,
        styleGroup: YamlStyleGroup.Flow,
        style: YamlStyle.Plain,
      });

      this.registerAnchor(emptyScalarNode);

      return [...node.children, emptyScalarNode];
    },
  };

  public readonly tag = {
    enter: (): null => {
      return null;
    },
  };

  public readonly anchor = {
    enter: (): null => {
      return null;
    },
  };

  public readonly block_mapping = {
    enter: (node: TreeCursorSyntaxNode) => {
      // const position = CstVisitor.toPosition(node);
      const tag = CstVisitor.kindNodeToYamlTag(node);
      const anchor = CstVisitor.kindNodeToYamlAnchor(node);
      const mappingNode = new YamlMapping({
        children: node.children,
        // position,
        startPositionRow: node.startPositionRow,
        startPositionColumn: node.startPositionColumn,
        startIndex: node.startIndex,
        endPositionRow: node.endPositionRow,
        endPositionColumn: node.endPositionColumn,
        endIndex: node.endIndex,
        anchor,
        tag,
        styleGroup: YamlStyleGroup.Block,
        style: YamlStyle.NextLine,
        isMissing: node.isMissing,
      });

      this.registerAnchor(mappingNode);

      return this.schema.resolve(mappingNode);
    },
  };

  public readonly block_mapping_pair = {
    enter: (node: TreeCursorSyntaxNode): YamlKeyValuePair => {
      // const position = CstVisitor.toPosition(node);
      const children: Array<TreeCursorSyntaxNode | YamlScalar> = [...node.children];

      if (CstVisitor.hasKeyValuePairEmptyKey(node)) {
        const keyNode = this.createKeyValuePairEmptyKey(node);
        children.unshift(keyNode);
      }
      if (CstVisitor.hasKeyValuePairEmptyValue(node)) {
        const valueNode = this.createKeyValuePairEmptyValue(node);
        children.push(valueNode);
      }

      return new YamlKeyValuePair({
        children,
        // position,
        startPositionRow: node.startPositionRow,
        startPositionColumn: node.startPositionColumn,
        startIndex: node.startIndex,
        endPositionRow: node.endPositionRow,
        endPositionColumn: node.endPositionColumn,
        endIndex: node.endIndex,
        styleGroup: YamlStyleGroup.Block,
        isMissing: node.isMissing,
      });
    },
  };

  public readonly flow_mapping = {
    enter: (node: TreeCursorSyntaxNode) => {
      // const position = CstVisitor.toPosition(node);
      const tag = CstVisitor.kindNodeToYamlTag(node);
      const anchor = CstVisitor.kindNodeToYamlAnchor(node);
      const mappingNode = new YamlMapping({
        children: node.children,
        // position,
        startPositionRow: node.startPositionRow,
        startPositionColumn: node.startPositionColumn,
        startIndex: node.startIndex,
        endPositionRow: node.endPositionRow,
        endPositionColumn: node.endPositionColumn,
        endIndex: node.endIndex,
        anchor,
        tag,
        styleGroup: YamlStyleGroup.Flow,
        style: YamlStyle.Explicit,
        isMissing: node.isMissing,
      });

      this.registerAnchor(mappingNode);

      return this.schema.resolve(mappingNode);
    },
  };

  public readonly flow_pair = {
    enter: (node: TreeCursorSyntaxNode): YamlKeyValuePair => {
      // const position = CstVisitor.toPosition(node);
      const children: Array<TreeCursorSyntaxNode | YamlScalar> = [...node.children];

      if (CstVisitor.hasKeyValuePairEmptyKey(node)) {
        const keyNode = this.createKeyValuePairEmptyKey(node);
        children.unshift(keyNode);
      }
      if (CstVisitor.hasKeyValuePairEmptyValue(node)) {
        const valueNode = this.createKeyValuePairEmptyValue(node);
        children.push(valueNode);
      }

      return new YamlKeyValuePair({
        children,
        // position,
        startPositionRow: node.startPositionRow,
        startPositionColumn: node.startPositionColumn,
        startIndex: node.startIndex,
        endPositionRow: node.endPositionRow,
        endPositionColumn: node.endPositionColumn,
        endIndex: node.endIndex,
        styleGroup: YamlStyleGroup.Flow,
        isMissing: node.isMissing,
      });
    },
  };

  public readonly keyValuePair = {
    leave: (node: YamlKeyValuePair): void => {
      node.children = node.children.flat();
    },
  };

  public readonly block_sequence = {
    enter: (node: TreeCursorSyntaxNode) => {
      // const position = CstVisitor.toPosition(node);
      const tag = CstVisitor.kindNodeToYamlTag(node);
      const anchor = CstVisitor.kindNodeToYamlAnchor(node);
      const sequenceNode = new YamlSequence({
        children: node.children,
        // position,
        startPositionRow: node.startPositionRow,
        startPositionColumn: node.startPositionColumn,
        startIndex: node.startIndex,
        endPositionRow: node.endPositionRow,
        endPositionColumn: node.endPositionColumn,
        endIndex: node.endIndex,
        anchor,
        tag,
        styleGroup: YamlStyleGroup.Block,
        style: YamlStyle.NextLine,
      });

      this.registerAnchor(sequenceNode);

      return this.schema.resolve(sequenceNode);
    },
  };

  public readonly block_sequence_item = {
    enter: (node: TreeCursorSyntaxNode): TreeCursorSyntaxNode[] | YamlScalar[] => {
      // flow or block node present; first node is always `-` literal
      if (node.children.length > 1) {
        return node.children;
      }

      // create empty node
      // const emptyPoint = new Point({
      //   row: node.endPosition.row,
      //   column: node.endPosition.column,
      //   char: node.endIndex,
      // });
      const emptyScalarNode = new YamlScalar({
        content: '',
        tag: new YamlTag({
          explicitName: '?',
          kind: YamlNodeKind.Scalar,
        }),
        // position: undefined,
        // position: new Position({ start: emptyPoint, end: emptyPoint }),
        // position: `${node.endPosition},${node.endPosition}`,
        // position: `${node.endPositionRow},${node.endPositionColumn},${node.endIndex},${node.endPositionRow},${node.endPositionColumn},${node.endIndex}`,
        startPositionRow: node.endPositionRow,
        startPositionColumn: node.endPositionColumn,
        startIndex: node.endIndex,
        endPositionRow: node.endPositionRow,
        endPositionColumn: node.endPositionColumn,
        endIndex: node.endIndex,
        styleGroup: YamlStyleGroup.Flow,
        style: YamlStyle.Plain,
      });

      return [emptyScalarNode];
    },
  };

  public readonly flow_sequence = {
    enter: (node: TreeCursorSyntaxNode) => {
      // const position = CstVisitor.toPosition(node);
      const tag = CstVisitor.kindNodeToYamlTag(node);
      const anchor = CstVisitor.kindNodeToYamlAnchor(node);
      const sequenceNode = new YamlSequence({
        children: node.children.flat(),
        // position,
        startPositionRow: node.startPositionRow,
        startPositionColumn: node.startPositionColumn,
        startIndex: node.startIndex,
        endPositionRow: node.endPositionRow,
        endPositionColumn: node.endPositionColumn,
        endIndex: node.endIndex,
        anchor,
        tag,
        styleGroup: YamlStyleGroup.Flow,
        style: YamlStyle.Explicit,
      });

      this.registerAnchor(sequenceNode);

      return this.schema.resolve(sequenceNode);
    },
  };

  public readonly sequence = {
    leave: (node: YamlSequence): void => {
      node.children = node.children.flat(+Infinity);
    },
  };

  public readonly plain_scalar = {
    enter: (node: TreeCursorSyntaxNode) => {
      // const position = CstVisitor.toPosition(node);
      const tag = CstVisitor.kindNodeToYamlTag(node);
      const anchor = CstVisitor.kindNodeToYamlAnchor(node);
      const scalarNode = new YamlScalar({
        content: node.text,
        anchor,
        tag,
        // position,
        startPositionRow: node.startPositionRow,
        startPositionColumn: node.startPositionColumn,
        startIndex: node.startIndex,
        endPositionRow: node.endPositionRow,
        endPositionColumn: node.endPositionColumn,
        endIndex: node.endIndex,
        styleGroup: YamlStyleGroup.Flow,
        style: YamlStyle.Plain,
      });

      this.registerAnchor(scalarNode);

      return this.schema.resolve(scalarNode);
    },
  };

  public readonly single_quote_scalar = {
    enter: (node: TreeCursorSyntaxNode) => {
      // const position = CstVisitor.toPosition(node);
      const tag = CstVisitor.kindNodeToYamlTag(node);
      const anchor = CstVisitor.kindNodeToYamlAnchor(node);
      const scalarNode = new YamlScalar({
        content: node.text,
        anchor,
        tag,
        // position,
        startPositionRow: node.startPositionRow,
        startPositionColumn: node.startPositionColumn,
        startIndex: node.startIndex,
        endPositionRow: node.endPositionRow,
        endPositionColumn: node.endPositionColumn,
        endIndex: node.endIndex,
        styleGroup: YamlStyleGroup.Flow,
        style: YamlStyle.SingleQuoted,
      });

      this.registerAnchor(scalarNode);

      return this.schema.resolve(scalarNode);
    },
  };

  public readonly double_quote_scalar = {
    enter: (node: TreeCursorSyntaxNode) => {
      // const position = CstVisitor.toPosition(node);
      const tag = CstVisitor.kindNodeToYamlTag(node);
      const anchor = CstVisitor.kindNodeToYamlAnchor(node);
      const scalarNode = new YamlScalar({
        content: node.text,
        anchor,
        tag,
        // position,
        startPositionRow: node.startPositionRow,
        startPositionColumn: node.startPositionColumn,
        startIndex: node.startIndex,
        endPositionRow: node.endPositionRow,
        endPositionColumn: node.endPositionColumn,
        endIndex: node.endIndex,
        styleGroup: YamlStyleGroup.Flow,
        style: YamlStyle.DoubleQuoted,
      });

      this.registerAnchor(scalarNode);

      return this.schema.resolve(scalarNode);
    },
  };

  public readonly block_scalar = {
    enter: (node: TreeCursorSyntaxNode) => {
      // const position = CstVisitor.toPosition(node);
      const tag = CstVisitor.kindNodeToYamlTag(node);
      const anchor = CstVisitor.kindNodeToYamlAnchor(node);
      const style = node.text.startsWith('|')
        ? YamlStyle.Literal
        : node.text.startsWith('>')
          ? YamlStyle.Folded
          : YamlStyle.Plain;
      const scalarNode = new YamlScalar({
        content: node.text,
        anchor,
        tag,
        // position,
        startPositionRow: node.startPositionRow,
        startPositionColumn: node.startPositionColumn,
        startIndex: node.startIndex,
        endPositionRow: node.endPositionRow,
        endPositionColumn: node.endPositionColumn,
        endIndex: node.endIndex,
        styleGroup: YamlStyleGroup.Block,
        style,
      });

      this.registerAnchor(scalarNode);

      return this.schema.resolve(scalarNode);
    },
  };

  public readonly comment = {
    enter: (node: TreeCursorSyntaxNode): YamlComment => {
      return new YamlComment({ content: node.text });
    },
  };

  public readonly alias = {
    enter: (node: TreeCursorSyntaxNode) => {
      const alias = new YamlAlias({ content: node.text });

      return this.referenceManager.resolveAlias(alias);
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
      // const position = CstVisitor.toPosition(node);
      const value = node.type || node.text;
      const { isMissing } = node;

      return new Literal({
        value,
        // position,
        isMissing,
        startPositionRow: node.startPositionRow,
        startPositionColumn: node.startPositionColumn,
        startIndex: node.startIndex,
        endPositionRow: node.endPositionRow,
        endPositionColumn: node.endPositionColumn,
        endIndex: node.endIndex,
      });
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
    // const position = CstVisitor.toPosition(node);
    const errorNode = new Error({
      children: node.children,
      // position,
      startPositionRow: node.startPositionRow,
      startPositionColumn: node.startPositionColumn,
      startIndex: node.startIndex,
      endPositionRow: node.endPositionRow,
      endPositionColumn: node.endPositionColumn,
      endIndex: node.endIndex,
      isUnexpected: !node.hasError,
      isMissing: node.isMissing,
      value: node.text,
    });

    if (path.length === 0) {
      return new ParseResult({ children: [errorNode] });
    }

    return errorNode;
  }

  private registerAnchor<T extends YamlNode>(node: T) {
    if (node.anchor !== undefined) {
      this.referenceManager.addAnchor(node);
    }
  }

  private createKeyValuePairEmptyKey(node: TreeCursorSyntaxNode): YamlScalar {
    // const emptyPoint = new Point({
    //   row: node.startPosition.row,
    //   column: node.startPosition.column,
    //   char: node.startIndex,
    // });
    const { keyNode } = node;
    const children = keyNode?.children || [];
    const tagNode = children.find(CstVisitor.isKind('tag'));
    const anchorNode = children.find(CstVisitor.isKind('anchor'));
    const tag =
      typeof tagNode !== 'undefined'
        ? new YamlTag({
            explicitName: tagNode.text,
            kind: YamlNodeKind.Scalar,
            // position: CstVisitor.toPosition(tagNode),
            startPositionRow: tagNode.startPositionRow,
            startPositionColumn: tagNode.startPositionColumn,
            startIndex: tagNode.startIndex,
            endPositionRow: tagNode.endPositionRow,
            endPositionColumn: tagNode.endPositionColumn,
            endIndex: tagNode.endIndex,
          })
        : new YamlTag({
            explicitName: '?',
            kind: YamlNodeKind.Scalar,
          });
    const anchor =
      typeof anchorNode !== 'undefined'
        ? new YamlAnchor({
            name: anchorNode.text,
            // position: CstVisitor.toPosition(anchorNode),
            startPositionRow: anchorNode.startPositionRow,
            startPositionColumn: anchorNode.startPositionColumn,
            startIndex: anchorNode.startIndex,
            endPositionRow: anchorNode.endPositionRow,
            endPositionColumn: anchorNode.endPositionColumn,
            endIndex: anchorNode.endIndex,
          })
        : undefined;
    const scalarNode = new YamlScalar({
      content: '',
      // position: new Position({ start: emptyPoint, end: emptyPoint }),
      // position: undefined,
      // position: `${node.startPosition},${node.startPosition}`,
      // position: `${node.startPositionRow},${node.startPositionColumn},${node.startIndex},${node.startPositionRow},${node.startPositionColumn},${node.startIndex}`,
      startPositionRow: node.startPositionRow,
      startPositionColumn: node.startPositionColumn,
      startIndex: node.startIndex,
      endPositionRow: node.startPositionRow,
      endPositionColumn: node.startPositionColumn,
      endIndex: node.startIndex,
      tag,
      anchor,
      styleGroup: YamlStyleGroup.Flow,
      style: YamlStyle.Plain,
    });

    this.registerAnchor(scalarNode);

    return scalarNode;
  }

  private createKeyValuePairEmptyValue(node: TreeCursorSyntaxNode): YamlScalar {
    // const emptyPoint = new Point({
    //   row: node.endPosition.row,
    //   column: node.endPosition.column,
    //   char: node.endIndex,
    // });
    const { valueNode } = node;
    const children = valueNode?.children || [];
    const tagNode = children.find(CstVisitor.isKind('tag'));
    const anchorNode = children.find(CstVisitor.isKind('anchor'));
    const tag =
      typeof tagNode !== 'undefined'
        ? new YamlTag({
            explicitName: tagNode.text,
            kind: YamlNodeKind.Scalar,
            // position: CstVisitor.toPosition(tagNode),
            startPositionRow: tagNode.startPositionRow,
            startPositionColumn: tagNode.startPositionColumn,
            startIndex: tagNode.startIndex,
            endPositionRow: tagNode.endPositionRow,
            endPositionColumn: tagNode.endPositionColumn,
            endIndex: tagNode.endIndex,
          })
        : new YamlTag({
            explicitName: '?',
            kind: YamlNodeKind.Scalar,
          });
    const anchor =
      typeof anchorNode !== 'undefined'
        ? new YamlAnchor({
            name: anchorNode.text,
            // position: CstVisitor.toPosition(anchorNode),
            startPositionRow: anchorNode.startPositionRow,
            startPositionColumn: anchorNode.startPositionColumn,
            startIndex: anchorNode.startIndex,
            endPositionRow: anchorNode.endPositionRow,
            endPositionColumn: anchorNode.endPositionColumn,
            endIndex: anchorNode.endIndex,
          })
        : undefined;
    const scalarNode = new YamlScalar({
      content: '',
      // position: undefined,
      // position: new Position({ start: emptyPoint, end: emptyPoint }),
      // position: `${node.endPosition},${node.endPosition}`,
      // position: `${node.endPositionRow},${node.endPositionColumn},${node.endIndex},${node.endPositionRow},${node.endPositionColumn},${node.endIndex}`,
      startPositionRow: node.endPositionRow,
      startPositionColumn: node.endPositionColumn,
      startIndex: node.endIndex,
      endPositionRow: node.endPositionRow,
      endPositionColumn: node.endPositionColumn,
      endIndex: node.endIndex,
      tag,
      anchor,
      styleGroup: YamlStyleGroup.Flow,
      style: YamlStyle.Plain,
    });

    this.registerAnchor(scalarNode);

    return scalarNode;
  }
}

export default CstVisitor;
