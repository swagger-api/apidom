// @ts-ignore
import { isMemberElement, isObjectElement, traverse } from 'apidom';
import { Element, ObjectElement, MemberElement } from 'minim';
import { isOpenApi3_1Element } from 'apidom-ns-openapi-3-1';
import { CompletionItem, CompletionItemKind, InsertTextFormat } from 'vscode-languageserver-types';

export class SourceMap {
  constructor(
    offset: number,
    length: number,
    line: number,
    column: number,
    endLine?: number,
    endColumn?: number,
    endOffset?: number,
  ) {
    this.length = length;
    this.offset = offset;
    this.line = line;
    this.column = column;
    this.endLine = endLine;
    this.endColumn = endColumn;
    this.endOffset = endOffset;
  }

  offset: number;

  length: number;

  line: number;

  column: number;

  endLine: number | undefined;

  endColumn: number | undefined;

  endOffset: number | undefined;
}

export function getSourceMap(element: Element): SourceMap {
  if (element && element.meta && element.meta.get('sourceMap')) {
    const sourceMap: [][number] = element.meta.get('sourceMap').toValue() as [][number];
    const offset = sourceMap[0][2];
    const length = sourceMap[1][2] - sourceMap[0][2];
    const line = sourceMap[0][0];
    const column = sourceMap[0][1];
    const endLine = sourceMap[1][0];
    const endColumn = sourceMap[1][1];
    const endOffset = sourceMap[1][2];
    return new SourceMap(offset, length, line, column, endLine, endColumn, endOffset); // TODO ???
  }
  return new SourceMap(1, 2, 0, 1); // TODO ???
}

export const isElementOfType = <T extends Element>(
  element: T,
  predicate: (el: Element) => boolean,
): element is T => {
  if (predicate(element)) {
    return true;
  }
  return false;
};

export const isObject = (element: Element): element is ObjectElement => {
  return isObjectElement(element);
};
export const isMember = (element: Element): element is MemberElement => {
  return isMemberElement(element);
};

export interface ElementMeta {
  completion?: CompletionItem[];
  validation?: string[];
}

export interface MetadataMap {
  [index: string]: ElementMeta;
}

export const metadataMap: MetadataMap = {
  'openApi3-1': {
    completion: [
      {
        label: 'info',
        kind: CompletionItemKind.Property,
        insertText: 'info: {$1}',
        insertTextFormat: InsertTextFormat.Snippet,
        documentation: 'TODO info docs in MD to retrieve from some submodule or whatever',
      },
      {
        label: 'openapi',
        kind: CompletionItemKind.Property,
        insertText: 'openapi: "$1"',
        insertTextFormat: InsertTextFormat.Snippet,
        documentation: 'TODO openapi docs in MD to retrieve from some submodule or whatever',
      },
      {
        label: 'paths',
        kind: CompletionItemKind.Property,
        insertText: '{$1:0}',
        insertTextFormat: InsertTextFormat.Snippet,
        documentation: 'TODO paths docs in MD to retrieve from some submodule or whatever',
      },
    ],
  },
  info: {
    completion: [
      {
        label: 'license',
        kind: CompletionItemKind.Property,
        insertText: 'license: {$1}',
        insertTextFormat: InsertTextFormat.Snippet,
        documentation: 'TODO license docs in MD to retrieve from some submodule or whatever',
      },
      {
        label: 'version',
        kind: CompletionItemKind.Property,
        insertText: 'version: "$1"',
        insertTextFormat: InsertTextFormat.Snippet,
        documentation: 'TODO version docs in MD to retrieve from some submodule or whatever',
      },
    ],
  },
};

export function addMetadataMapping(root: Element): void {
  // TODO retrieve from file, series of files with different metadata
  // TODO sanitize
  root.setMetaProperty('metadataMap', metadataMap);
}

export function addMetadata(element: Element): void {
  if (isOpenApi3_1Element(element)) {
    element.attributes.set('completion', ['info', 'paths']);
  }
}

export function traverseAndAddMetadata(root: Element): void {
  traverse(addMetadata, root);
}
