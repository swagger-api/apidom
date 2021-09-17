// @ts-ignore
import { isMemberElement, isObjectElement, isArrayElement } from 'apidom';
import { Element, ObjectElement, MemberElement, ArrayElement } from 'minim';
import { CompletionItem } from 'vscode-languageserver-types';

// TODO remove, keep for remote debugging
// import { appendFile } from 'fs';

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
export const isArray = (element: Element): element is ArrayElement => {
  return isArrayElement(element);
};

export interface ElementMeta {
  completion?: CompletionItem[];
  validation?: string[];
}

export interface QuickFixData {
  message: string;
  function?: string;
  functionParams?: [any];
  action: string;
  // TODO solve, validation meta also format based
  snippetYaml?: string;
  snippetJson?: string;
}
export interface LinterMetaData {
  quickFix?: QuickFixData;
}
export interface LinterMeta {
  code?: number;
  message?: string;
  source?: string;
  severity?: 1 | 2 | 3 | 4 | undefined;
  linterFunction?: string;
  linterParams?: [any];
  marker?: string;
  data?: LinterMetaData;
}

export interface FormatMeta {
  [index: string]: ElementMeta | string | LinterMeta[];
}

export interface MetadataMap {
  [index: string]: FormatMeta;
}

export interface MetadataMaps {
  [index: string]: MetadataMap;
}

export interface Metadata {
  metadataMaps: MetadataMaps;
  linterFunctions: LinterFunctionsMap;
}

export interface LinterFunctionsMap {
  [index: string]: LinterFunctions;
}

export interface LinterFunctions {
  [index: string]: (element: Element) => boolean;
}

export function setMetadataMap(
  root: Element,
  language: string,
  metadataMaps: MetadataMaps | undefined,
): void {
  // TODO sanitize
  if (metadataMaps && metadataMaps[language]) {
    root.setMetaProperty('metadataMap', metadataMaps[language]);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function log(label: string, message: unknown, toFile = false): void {
  // eslint-disable-next-line no-console
  console.log(label, message);
  /*  if (toFile) {
    appendFile('/tmp/lsp.log', `${label} - ${JSON.stringify(message)}`, (err) => {
      if (err) throw err;
    });
  } */
}
