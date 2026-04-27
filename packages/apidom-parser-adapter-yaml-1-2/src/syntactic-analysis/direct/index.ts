import type { TreeCursor as NodeTreeCursor, Tree as NodeTree } from 'tree-sitter';
import type { TreeCursor as WebTreeCursor, Tree as WebTree } from 'web-tree-sitter';
import {
  ParseResultElement,
  ObjectElement,
  ArrayElement,
  MemberElement,
  AnnotationElement,
  CommentElement,
  Element,
  isPrimitiveElement,
  createNamespace,
  type Namespace,
} from '@swagger-api/apidom-core';
import {
  formatFlowPlain,
  formatFlowSingleQuoted,
  formatFlowDoubleQuoted,
  formatBlockLiteral,
  formatBlockFolded,
} from '@swagger-api/apidom-ast';

/**
 * @public
 */
export type Tree = WebTree | NodeTree;
type Cursor = NodeTreeCursor | WebTreeCursor;

/**
 * Thrown when the direct analysis encounters a YAML feature (tag, anchor, alias)
 * that requires the full indirect two-pass analysis.
 * @public
 */
export class FallbackNeeded extends Error {
  public override name = 'FallbackNeeded';
}

// YAML 1.2 Core Schema type detection — matches apidom-ast/yaml/schemas/json/* order:
// Null → Integer → FloatingPoint → Boolean
const NULL_RE = /^null$/;
const INT_RE = /^-?(0|[1-9][0-9]*)$/;
const FLOAT_RE = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?([eE][-+]?[0-9]+)?$/;
const BOOL_RE = /^(true|false)$/;

function resolveScalarContent(s: string): null | boolean | number | string {
  if (NULL_RE.test(s)) return null;
  if (INT_RE.test(s)) return parseInt(s, 10);
  if (FLOAT_RE.test(s)) return parseFloat(s);
  if (BOOL_RE.test(s)) return s === 'true';
  return s;
}

interface DirectContext {
  sourceMap: boolean;
  namespace: Namespace;
  annotations: AnnotationElement[];
  documentCount: number;
}

function setSourceMap(element: Element, cursor: Cursor): void {
  // eslint-disable-next-line no-param-reassign
  element.startPositionRow = cursor.startPosition.row;
  // eslint-disable-next-line no-param-reassign
  element.startPositionColumn = cursor.startPosition.column;
  // eslint-disable-next-line no-param-reassign
  element.startIndex = cursor.startIndex;
  // eslint-disable-next-line no-param-reassign
  element.endPositionRow = cursor.endPosition.row;
  // eslint-disable-next-line no-param-reassign
  element.endPositionColumn = cursor.endPosition.column;
  // eslint-disable-next-line no-param-reassign
  element.endIndex = cursor.endIndex;
}

/**
 * Iterates named children of the current cursor node.
 * Adds warning annotations for missing unnamed (structural) nodes.
 * Restores cursor to parent when done.
 */
const forEachNamedChild = (
  cursor: Cursor,
  ctx: DirectContext,
  fn: (cursor: Cursor, fieldName: string | null) => void,
): void => {
  if (!cursor.gotoFirstChild()) return;

  do {
    if (!cursor.nodeIsNamed) {
      if (cursor.nodeIsMissing) {
        const ann = new AnnotationElement(`(Missing ${cursor.nodeType})`);
        ann.classes.push('warning');
        if (ctx.sourceMap) setSourceMap(ann, cursor);
        ctx.annotations.push(ann);
      }
    } else {
      fn(cursor, cursor.currentFieldName ?? null);
    }
  } while (cursor.gotoNextSibling());

  cursor.gotoParent();
};

const walkFunctions = {
  walkStream: (cursor: Cursor, ctx: DirectContext): ParseResultElement => {
    const parseResult = new ParseResultElement();
    if (ctx.sourceMap) setSourceMap(parseResult, cursor);

    forEachNamedChild(cursor, ctx, (child) => {
      const { nodeType } = child;
      if (nodeType === 'document') {
        const docContent = walkFunctions.walkDocument(child, ctx);
        if (docContent !== null) parseResult.push(docContent);
      } else if (nodeType === 'comment' && ctx.documentCount === 0) {
        const comment = new CommentElement(child.nodeText);
        if (ctx.sourceMap) setSourceMap(comment, child);
        parseResult.push(comment);
      } else if (nodeType === 'ERROR') {
        walkFunctions.walkError(child, ctx);
      }
    });

    // Mark the first content element as 'result' (matches YamlAstVisitor.stream.leave behaviour)
    // @ts-ignore
    const resultCandidates = parseResult.findElements(isPrimitiveElement);
    if (resultCandidates.length > 0) {
      resultCandidates[0].classes.push('result');
    }

    ctx.annotations.forEach((ann) => parseResult.push(ann));
    ctx.annotations = [];

    return parseResult;
  },
  walkDocument: (cursor: Cursor, ctx: DirectContext): Element | null => {
    if (ctx.documentCount >= 1) {
      if (ctx.documentCount === 1) {
        const ann = new AnnotationElement(
          'Only first document within YAML stream will be used. Rest will be discarded.',
        );
        ann.classes.push('warning');
        if (ctx.sourceMap) setSourceMap(ann, cursor);
        ctx.annotations.push(ann);
      }
      ctx.documentCount += 1;
      return null;
    }

    ctx.documentCount += 1;
    let content: Element | null = null;

    forEachNamedChild(cursor, ctx, (child) => {
      const { nodeType } = child;
      if (nodeType === 'tag' || nodeType === 'anchor' || nodeType === 'alias') {
        throw new FallbackNeeded();
      }
      if (nodeType.endsWith('_directive') || nodeType === 'comment') return;
      if (nodeType === 'ERROR') {
        walkFunctions.walkError(child, ctx);
        return;
      }
      const result = walkFunctions.walkNode(child, ctx);
      if (result !== null) content = result;
    });

    return content;
  },
  walkMapping: (cursor: Cursor, ctx: DirectContext): ObjectElement => {
    const element = new ObjectElement();
    if (ctx.sourceMap) setSourceMap(element, cursor);

    forEachNamedChild(cursor, ctx, (child) => {
      const { nodeType } = child;
      if (nodeType === 'tag' || nodeType === 'anchor' || nodeType === 'alias') {
        throw new FallbackNeeded();
      }
      if (nodeType === 'block_mapping_pair' || nodeType === 'flow_pair') {
        element.push(walkFunctions.walkPair(child, ctx));
      } else if (nodeType === 'ERROR') {
        walkFunctions.walkError(child, ctx);
      }
    });

    return element;
  },
  walkSequence: (cursor: Cursor, ctx: DirectContext): ArrayElement => {
    const element = new ArrayElement();
    if (ctx.sourceMap) setSourceMap(element, cursor);

    forEachNamedChild(cursor, ctx, (child) => {
      const { nodeType } = child;
      if (nodeType === 'tag' || nodeType === 'anchor' || nodeType === 'alias') {
        throw new FallbackNeeded();
      }
      if (nodeType === 'ERROR') {
        walkFunctions.walkError(child, ctx);
      } else if (nodeType === 'block_sequence_item') {
        const item = walkFunctions.walkSequenceItem(child, ctx);
        if (item !== null) element.push(item);
      } else {
        // flow_sequence items (flow_node, flow_pair, scalars) appear directly
        const item = walkFunctions.walkNode(child, ctx);
        if (item !== null) element.push(item);
      }
    });

    return element;
  },
  walkPair: (cursor: Cursor, ctx: DirectContext): MemberElement => {
    const pairStartRow = cursor.startPosition.row;
    const pairStartCol = cursor.startPosition.column;
    const pairStartIdx = cursor.startIndex;
    const pairEndRow = cursor.endPosition.row;
    const pairEndCol = cursor.endPosition.column;
    const pairEndIdx = cursor.endIndex;

    let keyElement: Element | null = null;
    let valueElement: Element | null = null;

    forEachNamedChild(cursor, ctx, (child, fieldName) => {
      const { nodeType } = child;
      if (nodeType === 'tag' || nodeType === 'anchor' || nodeType === 'alias') {
        throw new FallbackNeeded();
      }
      if (nodeType === 'ERROR') {
        walkFunctions.walkError(child, ctx);
      } else if (fieldName === 'key') {
        keyElement = walkFunctions.walkNode(child, ctx);
      } else if (fieldName === 'value') {
        valueElement = walkFunctions.walkNode(child, ctx);
      }
    });

    if (keyElement === null) {
      keyElement = ctx.namespace.toElement('');
      keyElement.classes.push('yaml-e-node');
      keyElement.classes.push('yaml-e-scalar');
      if (ctx.sourceMap) {
        keyElement.startPositionRow = pairStartRow;
        keyElement.startPositionColumn = pairStartCol;
        keyElement.startIndex = pairStartIdx;
        keyElement.endPositionRow = pairStartRow;
        keyElement.endPositionColumn = pairStartCol;
        keyElement.endIndex = pairStartIdx;
      }
    }

    if (valueElement === null) {
      valueElement = ctx.namespace.toElement('');
      valueElement.classes.push('yaml-e-node');
      valueElement.classes.push('yaml-e-scalar');
      if (ctx.sourceMap) {
        valueElement.startPositionRow = pairEndRow;
        valueElement.startPositionColumn = pairEndCol;
        valueElement.startIndex = pairEndIdx;
        valueElement.endPositionRow = pairEndRow;
        valueElement.endPositionColumn = pairEndCol;
        valueElement.endIndex = pairEndIdx;
      }
    }

    const member = new MemberElement();
    if (ctx.sourceMap) {
      member.startPositionRow = pairStartRow;
      member.startPositionColumn = pairStartCol;
      member.startIndex = pairStartIdx;
      member.endPositionRow = pairEndRow;
      member.endPositionColumn = pairEndCol;
      member.endIndex = pairEndIdx;
    }
    (member as any).content.key = keyElement;
    (member as any).content.value = valueElement;

    return member;
  },
  walkSequenceItem: (cursor: Cursor, ctx: DirectContext): Element => {
    const endRow = cursor.endPosition.row;
    const endCol = cursor.endPosition.column;
    const endIdx = cursor.endIndex;

    let content: Element | null = null;

    forEachNamedChild(cursor, ctx, (child) => {
      const { nodeType } = child;
      if (nodeType === 'tag' || nodeType === 'anchor' || nodeType === 'alias') {
        throw new FallbackNeeded();
      }
      const result = walkFunctions.walkNode(child, ctx);
      if (result !== null) content = result;
    });

    if (content === null) {
      // empty sequence item (just '-' with no value)
      content = ctx.namespace.toElement('');
      content.classes.push('yaml-e-node');
      content.classes.push('yaml-e-scalar');
      if (ctx.sourceMap) {
        content.startPositionRow = endRow;
        content.startPositionColumn = endCol;
        content.startIndex = endIdx;
        content.endPositionRow = endRow;
        content.endPositionColumn = endCol;
        content.endIndex = endIdx;
      }
    }

    return content;
  },
  walkBlockFlowNode: (cursor: Cursor, ctx: DirectContext): Element | null => {
    let content: Element | null = null;

    forEachNamedChild(cursor, ctx, (child) => {
      const { nodeType } = child;
      if (nodeType === 'tag' || nodeType === 'anchor' || nodeType === 'alias') {
        throw new FallbackNeeded();
      }
      if (nodeType === 'comment') return;
      const result = walkFunctions.walkNode(child, ctx);
      if (result !== null && content === null) {
        content = result;
      }
    });

    return content;
  },
  walkPlainScalar: (cursor: Cursor, ctx: DirectContext): Element => {
    const formatted = formatFlowPlain(cursor.nodeText);
    const element = ctx.namespace.toElement(resolveScalarContent(formatted));
    if (ctx.sourceMap) setSourceMap(element, cursor);
    if (formatted === '') {
      element.classes.push('yaml-e-node');
      element.classes.push('yaml-e-scalar');
    }
    return element;
  },
  walkSingleQuoteScalar: (cursor: Cursor, ctx: DirectContext): Element => {
    const formatted = formatFlowSingleQuoted(cursor.nodeText);
    const element = ctx.namespace.toElement(formatted);
    if (ctx.sourceMap) setSourceMap(element, cursor);
    return element;
  },
  walkDoubleQuoteScalar: (cursor: Cursor, ctx: DirectContext): Element => {
    const formatted = formatFlowDoubleQuoted(cursor.nodeText);
    const element = ctx.namespace.toElement(formatted);
    if (ctx.sourceMap) setSourceMap(element, cursor);
    return element;
  },
  walkBlockScalar: (cursor: Cursor, ctx: DirectContext): Element => {
    const raw = cursor.nodeText;
    const formatted = raw.trimStart().startsWith('>')
      ? formatBlockFolded(raw)
      : formatBlockLiteral(raw);
    const element = ctx.namespace.toElement(formatted);
    if (ctx.sourceMap) setSourceMap(element, cursor);
    return element;
  },
  walkError: (cursor: Cursor, ctx: DirectContext): null => {
    // @ts-ignore — currentNode exists on both cursor types
    const isUnexpected = !(cursor.currentNode as any).hasError;
    const message = isUnexpected ? '(Unexpected YAML syntax error)' : '(Error YAML syntax error)';
    const ann = new AnnotationElement(message);
    ann.classes.push('error');
    if (ctx.sourceMap) setSourceMap(ann, cursor);
    ctx.annotations.push(ann);
    return null;
  },
  walkNode: (cursor: Cursor, ctx: DirectContext): Element | null => {
    switch (cursor.nodeType) {
      case 'block_mapping':
      case 'flow_mapping':
        return walkFunctions.walkMapping(cursor, ctx);
      case 'block_sequence':
      case 'flow_sequence':
        return walkFunctions.walkSequence(cursor, ctx);
      case 'block_mapping_pair':
      case 'flow_pair':
        return walkFunctions.walkPair(cursor, ctx);
      case 'block_sequence_item':
        return walkFunctions.walkSequenceItem(cursor, ctx);
      case 'block_node':
      case 'flow_node':
        return walkFunctions.walkBlockFlowNode(cursor, ctx);
      case 'plain_scalar':
        return walkFunctions.walkPlainScalar(cursor, ctx);
      case 'single_quote_scalar':
        return walkFunctions.walkSingleQuoteScalar(cursor, ctx);
      case 'double_quote_scalar':
        return walkFunctions.walkDoubleQuoteScalar(cursor, ctx);
      case 'block_scalar':
        return walkFunctions.walkBlockScalar(cursor, ctx);
      case 'tag':
      case 'anchor':
      case 'alias':
        throw new FallbackNeeded();
      case 'ERROR':
        return walkFunctions.walkError(cursor, ctx);
      default:
        return null;
    }
  },
};

/**
 * Direct cursor-based syntactic analysis.
 * Walks the tree-sitter CST once and builds ApiDOM elements directly,
 * eliminating both the TreeCursorSyntaxNode pre-materialization and the
 * intermediate YAML AST passes used by the indirect analysis.
 *
 * Throws FallbackNeeded when the document uses YAML tags, anchors, or aliases,
 * which require the full two-pass indirect analysis to resolve correctly.
 * @public
 */
const analyze = (cst: Tree, { sourceMap = false } = {}): ParseResultElement => {
  const cursor = cst.walk();
  const ctx: DirectContext = {
    sourceMap,
    namespace: createNamespace(),
    annotations: [],
    documentCount: 0,
  };

  // When tree-sitter can't parse the input at all, the root node is ERROR rather than stream.
  // In that case return an empty ParseResultElement containing only the error annotation.
  if (cursor.nodeType !== 'stream') {
    const parseResult = new ParseResultElement();
    if (ctx.sourceMap) setSourceMap(parseResult, cursor);
    walkFunctions.walkError(cursor, ctx);
    ctx.annotations.forEach((ann) => parseResult.push(ann));
    return parseResult;
  }

  return walkFunctions.walkStream(cursor, ctx);
};

export default analyze;
