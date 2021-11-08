import {
  Element,
  ObjectElement,
  MemberElement,
  ArrayElement,
  StringElement,
  NumberElement,
  BooleanElement,
  isMemberElement,
  isObjectElement,
  isArrayElement,
  isStringElement,
  isNumberElement,
  isBooleanElement,
  find,
} from '@swagger-api/apidom-core';

import { MetadataMaps } from '../apidom-language-types';

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

export const isString = (element: Element): element is StringElement => {
  return isStringElement(element);
};

export const isNumber = (element: Element): element is NumberElement => {
  return isNumberElement(element);
};

export const isBoolean = (element: Element): element is BooleanElement => {
  return isBooleanElement(element);
};

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

export function getSpecVersion(root: Element): string {
  const el = find((e) => e.getMetaProperty('classes', []).toValue().includes('spec-version'), root);
  return el ? el.toValue() : '';
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

export function logJson(label: string, message: unknown): void {
  // eslint-disable-next-line no-console
  console.log(label, JSON.stringify(message, null, 2));
}
