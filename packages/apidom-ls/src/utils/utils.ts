import * as openapi2AdapterJson from '@swagger-api/apidom-parser-adapter-openapi-json-2';
import * as openapi2AdapterYaml from '@swagger-api/apidom-parser-adapter-openapi-yaml-2';
import * as openapi3_0AdapterJson from '@swagger-api/apidom-parser-adapter-openapi-json-3-0';
import * as openapi3_0AdapterYaml from '@swagger-api/apidom-parser-adapter-openapi-yaml-3-0';
import * as openapi3_1AdapterJson from '@swagger-api/apidom-parser-adapter-openapi-json-3-1';
import * as openapi3_1AdapterYaml from '@swagger-api/apidom-parser-adapter-openapi-yaml-3-1';
import * as asyncapi2AdapterJson from '@swagger-api/apidom-parser-adapter-asyncapi-json-2';
import * as asyncapi2AdapterYaml from '@swagger-api/apidom-parser-adapter-asyncapi-yaml-2';
import * as adsAdapterJson from '@swagger-api/apidom-parser-adapter-api-design-systems-json';
import * as adsAdapterYaml from '@swagger-api/apidom-parser-adapter-api-design-systems-yaml';
import * as adapterJson from '@swagger-api/apidom-parser-adapter-json';
import * as adapterYaml from '@swagger-api/apidom-parser-adapter-yaml-1-2';
import {
  ArrayElement,
  BooleanElement,
  Element,
  find,
  isArrayElement,
  isBooleanElement,
  isMemberElement,
  isNumberElement,
  isObjectElement,
  isStringElement,
  MemberElement,
  NumberElement,
  ObjectElement,
  ParseResultElement,
  StringElement,
  traverse,
  toValue,
} from '@swagger-api/apidom-core';
import { compile } from '@swagger-api/apidom-json-pointer';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Range } from 'vscode-languageserver-types';

import {
  ApidomCompletionItem,
  ContentLanguage,
  LanguageSettings,
  LinterMeta,
  LogLevel,
  Metadata,
  MetadataMaps,
  Pointer,
} from '../apidom-language-types';
// eslint-disable-next-line import/no-cycle
import { standardLinterfunctions } from '../services/validation/linter-functions';

let performanceLogs = false;
let logLevel = LogLevel.WARN;
const perfLabels: Record<string, string> = {};

export function togglePerformanceLogs(status: boolean) {
  performanceLogs = status;
}

export function toggleLogs(level: LogLevel) {
  logLevel = level;
}

export function trace(...args: unknown[]) {
  if (logLevel <= LogLevel.TRACE) console.log.apply(null, args);
}
export function debug(...args: unknown[]) {
  if (logLevel <= LogLevel.DEBUG) console.debug.apply(null, args);
}
export function info(...args: unknown[]) {
  if (logLevel <= LogLevel.INFO) console.info.apply(null, args);
}
export function warn(...args: unknown[]) {
  if (logLevel <= LogLevel.WARN) console.warn.apply(null, args);
}
export function error(...args: unknown[]) {
  if (logLevel <= LogLevel.ERROR) console.error.apply(null, args);
}

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
    const sourceMap: [][number] = toValue(element.meta.get('sourceMap')) as [][number];
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
  const el = find((e) => toValue(e.getMetaProperty('classes', []).includes('spec-version')), root);
  return el ? toValue(el) : '';
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

export function buildJsonPointer(path: string[]): string {
  const jsonPointer = compile(path);
  return `#${jsonPointer}`;
}

interface FoundNode {
  element: Element;
  isRef: boolean;
}

export function localReferencePointers(
  doc: Element,
  nodeElement: string,
  includeRefs: boolean,
): Pointer[] {
  const pointers: Pointer[] = [];
  // traverse all doc to find nodes of the same type which are not a ref
  const foundNodes: FoundNode[] = [];
  let nodePath: string[] = [];
  function buildPointer(traverseNode: Element): void {
    if (!traverseNode) return;
    if (traverseNode.parent && isMember(traverseNode.parent)) {
      nodePath.unshift(toValue(traverseNode.parent.key as Element));
      buildPointer(traverseNode.parent?.parent);
    }
  }

  // TODO check for reference-element class or type instead
  function findRefNodes(traversedNode: Element): void {
    if (includeRefs) {
      const isRef =
        nodeElement === toValue(traversedNode.getMetaProperty('referenced-element', ''));
      if (isRef || traversedNode.element === nodeElement) {
        foundNodes.push({ element: traversedNode, isRef });
      }
    } else if (traversedNode.element === nodeElement) {
      if (
        !(
          isObject(traversedNode) &&
          traversedNode.get('$ref') &&
          toValue(traversedNode.get('$ref')).length > 0
        )
      ) {
        foundNodes.push({ element: traversedNode, isRef: false });
      }
    }
  }
  traverse(findRefNodes, doc);
  for (const foundNode of foundNodes) {
    nodePath = [];
    buildPointer(foundNode.element);
    pointers.push({
      node: foundNode.element,
      ref: buildJsonPointer(nodePath),
      isRef: foundNode.isRef,
    });
  }
  // TODO better sorting, NS plugin..
  pointers.sort((a, b) => (a.ref.split('/').length > b.ref.split('/').length ? 1 : -1));
  return pointers;
}

export function checkConditions(
  meta: ApidomCompletionItem | LinterMeta,
  docNs: string,
  element: Element,
  api: Element,
  settings: LanguageSettings | undefined,
): boolean {
  // check conditions and run them, proceed only when conditions are met
  let conditionsSuccess = true;
  if (meta.conditions && meta.conditions.length > 0) {
    for (const condition of meta.conditions) {
      if (!conditionsSuccess) {
        break;
      }
      const conditionFuncName = condition.function;
      // first check if it is a standard function and exists.
      let conditionFunc = standardLinterfunctions.find(
        (e) => e.functionName === conditionFuncName,
      )?.function;
      // else get it from configuration
      if (!conditionFunc) {
        conditionFunc = settings?.metadata?.linterFunctions[docNs][conditionFuncName];
      }
      if (conditionFunc) {
        let conditionTargetEl = element;
        if (condition.targets && condition.targets.length > 0) {
          for (const target of condition.targets) {
            conditionTargetEl = element;
            if (target.path) {
              // parse path
              const pathAr = target.path.split('.');
              for (const pathSegment of pathAr) {
                if (pathSegment === 'parent') {
                  if (!conditionTargetEl.parent.parent) {
                    conditionsSuccess = false;
                    break;
                  }
                  conditionTargetEl = conditionTargetEl.parent.parent;
                } else if (pathSegment === 'root') {
                  conditionTargetEl = api;
                } else {
                  // key
                  if (!isObject(conditionTargetEl) || !conditionTargetEl.hasKey(pathSegment)) {
                    conditionsSuccess = false;
                    break;
                  }
                  conditionTargetEl = conditionTargetEl.get(pathSegment);
                }
              }
              if (!conditionsSuccess) {
                break;
              }
              let conditionRes = true;
              if (
                condition.params &&
                Array.isArray(condition.params) &&
                condition.params.length > 0
              ) {
                const params = [conditionTargetEl].concat(condition.params);
                conditionRes = conditionFunc(...params) as boolean;
              } else {
                conditionRes = conditionFunc(conditionTargetEl) as boolean;
              }
              if (condition.negate) conditionRes = !conditionRes;
              if (!conditionRes) {
                conditionsSuccess = false;
                break;
              }
            }
          }
        } else {
          let conditionRes = true;
          if (condition.params && Array.isArray(condition.params) && condition.params.length > 0) {
            const params = [conditionTargetEl].concat(condition.params);
            conditionRes = conditionFunc(...params) as boolean;
          } else {
            conditionRes = conditionFunc(conditionTargetEl) as boolean;
          }
          if (condition.negate) conditionRes = !conditionRes;
          if (!conditionRes) {
            conditionsSuccess = false;
            break;
          }
        }
      }
    }
  }
  return conditionsSuccess;
}

export function processPath(element: Element, path: string, api: Element): Element | undefined {
  let targetEl: Element = element;
  const pathAr = path.split('.');
  for (const pathSegment of pathAr) {
    if (pathSegment === 'parent') {
      if (!targetEl.parent.parent) {
        return undefined;
      }
      targetEl = targetEl.parent.parent;
    } else if (pathSegment === 'root') {
      targetEl = api;
    } else {
      // key
      if (!isObject(targetEl) || !targetEl.hasKey(pathSegment)) {
        return undefined;
      }
      targetEl = targetEl.get(pathSegment);
    }
  }
  return targetEl;
}

export function buildPath(element: Element): string {
  try {
    const path: string[] = [];
    if (!element.parent) return '';
    let targetEl = element;
    while (isArray(targetEl.parent)) {
      path.unshift('[]');
      targetEl = targetEl.parent;
    }

    if (targetEl.parent && isMember(targetEl.parent)) {
      // @ts-ignore
      path.unshift(toValue(targetEl.parent.key) as string);
    }

    while (targetEl.parent?.parent) {
      targetEl = targetEl.parent.parent;
      while (isArray(targetEl.parent)) {
        path.unshift('[]');
        targetEl = targetEl.parent;
      }
      if (targetEl.parent && isMember(targetEl.parent)) {
        // @ts-ignore
        path.unshift(toValue(targetEl.parent.key) as string);
      }
    }
    return `/${path.join('/')}`;
  } catch (e) {
    return '';
  }
}

export function getCurrentWord(document: TextDocument | string, offset: number) {
  let i = offset - 1;
  const text = typeof document === 'string' ? document : document.getText();
  while (i >= 0 && ' \t\n\r\v"\':{[,]}'.indexOf(text.charAt(i)) === -1) {
    i -= 1;
  }
  return text.substring(i + 1, offset);
}

export function getRightAfterColonOffset(
  document: TextDocument | string,
  offset: number,
  mustBeEmpty: boolean,
): number {
  const text = typeof document === 'string' ? document : document.getText();
  let i = offset - 1;
  while (i >= 0 && ':'.indexOf(text.charAt(i)) === -1) {
    i -= 1;
  }
  const rightAfterColon = i + 1;
  if (text.substring(i + 1, offset).trim().length > 0) {
    return -1;
  }
  if (!mustBeEmpty) {
    return rightAfterColon;
  }
  i = offset;
  while (text.charAt(i).length > 0 && '\n\r'.indexOf(text.charAt(i)) === -1) {
    i += 1;
  }
  if (text.substring(offset, i + 1).trim().length > 0) {
    return -1;
  }
  return rightAfterColon;
}

export function isValueNode(document: TextDocument | string, offset: number): boolean {
  const text = typeof document === 'string' ? document : document.getText();
  let i = offset - 1;
  while (i >= 0 && ':\r\n'.indexOf(text.charAt(i)) === -1) {
    i -= 1;
  }
  if ('\r\n'.indexOf(text.charAt(i)) === -1) {
    return true;
  }
  return false;
}

export function getRightAfterDashOffset(
  document: TextDocument | string,
  offset: number,
  mustBeEmpty: boolean,
): number {
  const text = typeof document === 'string' ? document : document.getText();
  let i = offset - 1;
  while (i >= 0 && '-'.indexOf(text.charAt(i)) === -1) {
    i -= 1;
  }
  const rightAfterDash = i + 1;
  if (text.substring(i + 1, offset).trim().length > 0) {
    return -1;
  }
  if (!mustBeEmpty) {
    return rightAfterDash;
  }
  i = offset;
  while (text.charAt(i).length > 0 && '\n\r'.indexOf(text.charAt(i)) === -1) {
    i += 1;
  }
  if (text.substring(offset, i + 1).trim().length > 0) {
    return -1;
  }
  return rightAfterDash;
}

export function getLine(document: TextDocument | string, offset: number): string {
  const text = typeof document === 'string' ? document : document.getText();
  let i = offset - 1;
  while (i >= 0 && '\r\n'.indexOf(text.charAt(i)) === -1) {
    i -= 1;
  }
  const start = i;
  i = offset;
  while (text.charAt(i).length > 0 && '\n\r'.indexOf(text.charAt(i)) === -1) {
    i += 1;
  }
  const end = i;
  return text.substring(start + 1, end);
}

export function getLineAfterOffset(document: TextDocument | string, offset: number): string {
  const text = typeof document === 'string' ? document : document.getText();
  let i = offset;
  while (text.charAt(i).length > 0 && '\n\r'.indexOf(text.charAt(i)) === -1) {
    i += 1;
  }
  const end = i;
  return text.substring(offset, end);
}

export function getNonEmptyContentRange(
  document: TextDocument | string,
  offset: number,
): Range | undefined {
  if (offset < 0) {
    return undefined;
  }
  const text = typeof document === 'string' ? document : document.getText();
  const doc =
    typeof document === 'string'
      ? TextDocument.create('foo://bar/spec.yaml', 'json', 0, document)
      : document;
  let i = offset - 1;
  // go to beginning of line
  while (i >= 0 && '\r\n'.indexOf(text.charAt(i)) === -1) {
    i -= 1;
  }
  // go to the first non space
  while (i < text.length && ' \t\n\r\v'.indexOf(text.charAt(i)) !== -1) {
    i += 1;
  }
  const start = i;
  // go to the end of line
  i = offset;
  while (i < text.length && '\r\n'.indexOf(text.charAt(i)) === -1) {
    i += 1;
  }
  // go back to the first non space
  while (i > start && ' \t\n\r\v'.indexOf(text.charAt(i)) !== -1) {
    i -= 1;
  }
  const end = i + 1;
  if (end - start < 1) {
    return undefined;
  }
  const result = Range.create(doc.positionAt(start), doc.positionAt(end));
  return result;
}

export function getPreviousLineOffset(document: TextDocument | string, offset: number): number {
  const text = typeof document === 'string' ? document : document.getText();
  let i = offset - 1;
  while (i >= 0 && '\r\n'.indexOf(text.charAt(i)) === -1) {
    i -= 1;
  }
  if (i === 0) {
    return -1;
  }
  return i;
}

export function getNextLineOffset(document: TextDocument | string, offset: number): number {
  const text = typeof document === 'string' ? document : document.getText();
  let i = offset;
  while (i < text.length && '\r\n'.indexOf(text.charAt(i)) === -1) {
    i += 1;
  }
  if (i >= text.length - 1) {
    return -1;
  }
  // consider \r\n
  if ('\r\n'.indexOf(text.charAt(i + 1)) !== -1 && i + 2 < text.length) {
    return i + 2;
  }
  return i + 1;
}

export function isLastField(document: TextDocument | string, offset: number): boolean {
  const text = typeof document === 'string' ? document : document.getText();
  const doc =
    typeof document === 'string'
      ? TextDocument.create('foo://bar/spec.yaml', 'json', 0, document)
      : document;
  let i = offset;
  while (i < text.length && '}]'.indexOf(text.charAt(i)) === -1) {
    i += 1;
  }
  const after = doc.getText(Range.create(doc.positionAt(offset), doc.positionAt(offset + i)));
  if (after.trim().length === 0) {
    return true;
  }
  return false;
}

export function isEmptyLine(document: TextDocument | string, offset: number): boolean {
  return getLine(document, offset).trim().length === 0;
}

export function isEmptyOrCommaValue(document: TextDocument | string, offset: number): boolean {
  const line = getLineAfterOffset(document, offset).trim();
  if (line.length === 0) {
    return true;
  }
  if (line.endsWith(',')) {
    return true;
  }
  return false;
}

export function getIndentation(
  lineContent: string,
  position?: number,
  considerArrayItem = true,
): number {
  if (position && lineContent.length < position) {
    return 0;
  }

  if (!position) {
    // eslint-disable-next-line no-param-reassign
    position = lineContent.length;
  }

  let result = -1;
  for (let i = 0; i < position; i += 1) {
    const char = lineContent.charCodeAt(i);
    if (char !== 32 && char !== 9) {
      result = i;
      break;
    }
  }
  if (considerArrayItem && result) {
    if (lineContent.charAt(result) === '-') {
      result += 1;
      if (
        result < position &&
        (lineContent.charCodeAt(result) === 32 || lineContent.charCodeAt(result) === 9)
      ) {
        result += 1;
      }
    }
  }
  // assuming that current position is indentation
  return result > -1 ? result : position;
}

export function isPartialKey(textDocument: TextDocument, offset: number): number | undefined {
  const lineContentRange = getNonEmptyContentRange(textDocument, offset);
  const lineNonEmptyContent = lineContentRange ? textDocument.getText(lineContentRange) : '';
  const lineContent = lineContentRange ? getLine(textDocument, offset) : '';
  const lineIndent = getIndentation(lineContent);

  const prevLineOffset = getPreviousLineOffset(textDocument, offset);
  const prevLineContent = getLine(textDocument, prevLineOffset);
  const prevIndent = getIndentation(prevLineContent);
  const nextLineOffset = getNextLineOffset(textDocument, offset);
  const nextLineContent = getLine(textDocument, nextLineOffset);
  const nextIndent = getIndentation(nextLineContent);
  // must not be an array item AND not end with `:`
  const valueNode = isValueNode(textDocument, offset);
  if (
    !valueNode &&
    lineNonEmptyContent &&
    lineNonEmptyContent.length > 0 &&
    !lineNonEmptyContent.startsWith('-') &&
    !lineNonEmptyContent.endsWith(':') &&
    !(lineNonEmptyContent.indexOf(':') > -1 && !lineNonEmptyContent.endsWith(':')) && // must not be a correct key/value
    (prevIndent < lineIndent || nextIndent < prevIndent)
  ) {
    return lineContentRange ? textDocument.offsetAt(lineContentRange.end) : undefined;
  }
  return undefined;
}

export function correctPartialKeys(
  result: ParseResultElement,
  textDocument: TextDocument,
  isJson: boolean,
): string | undefined {
  let processedText;
  if (result.annotations && !isJson) {
    const syntaxErrorLineOffsets = new Set<number>();
    for (const annotation of result.annotations) {
      const nodeSourceMap = getSourceMap(annotation);
      for (let i = nodeSourceMap.line; i <= nodeSourceMap.endLine!; i += 1) {
        syntaxErrorLineOffsets.add(textDocument.offsetAt({ line: i, character: 0 }));
      }
    }
    if (syntaxErrorLineOffsets.size > 0) {
      for (const errorOffset of syntaxErrorLineOffsets) {
        if (!isJson) {
          const partialKeyOffset = isPartialKey(textDocument, errorOffset);
          if (partialKeyOffset) {
            if (!processedText) {
              processedText = textDocument.getText();
            }
            processedText = `${processedText.slice(0, partialKeyOffset - 1)}:${processedText.slice(
              partialKeyOffset,
            )}`;
          }
        }
      }
    }
  }
  return processedText;
}

export function perfStart(label: string, force = false): string {
  if (force || performanceLogs) {
    const random = ` _R_${Math.random() * 100}`;
    const realLabel = label + random;
    try {
      // console.time(realLabel);
      performance.mark(realLabel);
      console.info(
        'performance: mark',
        label,
        `[${(performance.getEntriesByName(realLabel, 'mark')[0].startTime / 1000).toFixed(2)}]`,
      );
      perfLabels[label] = realLabel;
      return realLabel;
    } catch (e) {
      // console.error('error in perfStart', label, realLabel, perfLabels[label], e);
    }
  }
  return '';
}

export function perfEnd(label: string, force = false) {
  if (force || performanceLogs) {
    const realLabel = perfLabels[label];
    let endMark = '';
    try {
      // console.timeEnd(label);
      endMark = `${realLabel}${Date.now()}`;
      performance.mark(endMark);
      performance.measure(realLabel, realLabel, endMark);
      const perf = performance.getEntriesByName(realLabel)[1];
      console.info(
        'performance: MEAS',
        realLabel ? realLabel.substring(0, realLabel.indexOf('_R_')) : `NO LABEL: ${label}`,
        `${perf.duration.toFixed(2)}ms`,
        `[${(perf.startTime / 1000).toFixed(2)} - ${(
          (perf.startTime + perf.duration) /
          1000
        ).toFixed(2)}]`,
      );
    } catch (e) {
      // console.error('error in perfEnd', label, realLabel, e);
    } finally {
      performance.clearMarks(endMark);
      performance.clearMarks(realLabel);
      performance.clearMeasures(realLabel);
    }
  }
}

export function deepCopyMetadata(meta: Metadata): Metadata {
  return {
    metadataMaps: meta.metadataMaps ? JSON.parse(JSON.stringify(meta.metadataMaps)) : undefined,
    rules: meta.rules ? JSON.parse(JSON.stringify(meta.rules)) : undefined,
    tokens: meta.tokens ? JSON.parse(JSON.stringify(meta.tokens)) : undefined,
    symbols: meta.symbols ? JSON.parse(JSON.stringify(meta.symbols)) : undefined,
    linterFunctions: meta.linterFunctions,
  };
}
export interface RegexMap {
  [key: string]: RegExp;
}

export function getText(document: TextDocument | string, trim = false): string {
  let text = '';
  if (typeof document === 'string') {
    text = document;
  } else {
    text = document.getText();
  }
  if (trim) text = text.trim();
  return text;
}

export async function isJsonDoc(document: TextDocument | string): Promise<boolean> {
  const text = getText(document, true);
  return await adapterJson.detect(text);
}

export function isJsonDocSync(document: TextDocument | string): boolean {
  const text = getText(document, true);
  return adapterJson.detectionRegExp.test(text);
}

export async function isYamlDoc(document: TextDocument | string): Promise<boolean> {
  const text = getText(document, true);
  return (await adapterYaml.detect(text)) && !(await isJsonDoc(document));
}

export async function findNamespace(
  document: TextDocument | string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultContentLanguage?: ContentLanguage,
): Promise<ContentLanguage> {
  const text = getText(document, true);
  const json = await isJsonDoc(text);
  if (await asyncapi2AdapterJson.detect(text)) {
    const versionMatch = text.match(asyncapi2AdapterJson.detectionRegExp);
    const version = versionMatch?.groups?.version_json
      ? versionMatch?.groups?.version_json
      : '2.6.0';
    return {
      namespace: 'asyncapi',
      version,
      format: 'JSON',
      mediaType: `application/vnd.aai.asyncapi+json;version=${version}`,
    };
  }
  if (await asyncapi2AdapterYaml.detect(text)) {
    const versionMatch = text.match(asyncapi2AdapterYaml.detectionRegExp);
    const version = versionMatch?.groups?.version_yaml
      ? versionMatch?.groups?.version_yaml
      : '2.6.0';
    return {
      namespace: 'asyncapi',
      version,
      format: 'YAML',
      mediaType: `application/vnd.aai.asyncapi+yaml;version=${version}`,
    };
  }
  if (await openapi2AdapterJson.detect(text)) {
    const versionMatch = text.match(openapi2AdapterJson.detectionRegExp);
    const version = versionMatch?.groups?.version_json ? versionMatch?.groups?.version_json : '2.0';

    return {
      namespace: 'openapi',
      version,
      format: 'JSON',
      mediaType: `application/vnd.oai.openapi+json;version=${version}`,
    };
  }
  if (await openapi2AdapterYaml.detect(text)) {
    const versionMatch = text.match(openapi2AdapterYaml.detectionRegExp);
    const version = versionMatch?.groups?.version_yaml
      ? versionMatch?.groups?.version_yaml
      : versionMatch?.groups?.version_json
        ? versionMatch?.groups?.version_json
        : '2.0';
    return {
      namespace: 'openapi',
      version,
      format: 'YAML',
      mediaType: `application/vnd.oai.openapi+yaml;version=${version}`,
    };
  }
  if (await openapi3_0AdapterJson.detect(text)) {
    const versionMatch = text.match(openapi3_0AdapterJson.detectionRegExp);
    const version = versionMatch?.groups?.version_json
      ? versionMatch?.groups?.version_json
      : '3.0.3';
    return {
      namespace: 'openapi',
      version,
      format: 'JSON',
      mediaType: `application/vnd.oai.openapi+json;version=${version}`,
    };
  }
  if (await openapi3_0AdapterYaml.detect(text)) {
    const versionMatch = text.match(openapi3_0AdapterYaml.detectionRegExp);
    const version = versionMatch?.groups?.version_yaml
      ? versionMatch?.groups?.version_yaml
      : versionMatch?.groups?.version_json
        ? versionMatch?.groups?.version_json
        : '3.0.3';
    return {
      namespace: 'openapi',
      version,
      format: 'YAML',
      mediaType: `application/vnd.oai.openapi+yaml;version=${version}`,
    };
  }
  if (await openapi3_1AdapterJson.detect(text)) {
    const versionMatch = text.match(openapi3_1AdapterJson.detectionRegExp);
    const version = versionMatch?.groups?.version_json
      ? versionMatch?.groups?.version_json
      : '3.1.0';
    return {
      namespace: 'openapi',
      version,
      format: 'JSON',
      admitsRefsSiblings: true,
      mediaType: `application/vnd.oai.openapi+json;version=${version}`,
    };
  }
  if (await openapi3_1AdapterYaml.detect(text)) {
    const versionMatch = text.match(openapi3_1AdapterYaml.detectionRegExp);
    const version = versionMatch?.groups?.version_yaml
      ? versionMatch?.groups?.version_yaml
      : versionMatch?.groups?.version_json
        ? versionMatch?.groups?.version_json
        : '3.1.0';
    return {
      namespace: 'openapi',
      version,
      format: 'YAML',
      admitsRefsSiblings: true,
      mediaType: `application/vnd.oai.openapi+yaml;version=${version}`,
    };
  }
  if (await adsAdapterJson.detect(text)) {
    return {
      namespace: 'ads',
      format: 'JSON',
      mediaType: 'application/vnd.aai.apidesignsystems+json;version=2021-05-07',
    };
  }
  if (await adsAdapterYaml.detect(text)) {
    return {
      namespace: 'ads',
      format: 'YAML',
      mediaType: 'application/vnd.aai.apidesignsystems+yaml;version=2021-05-07',
    };
  }
  if (await adapterJson.detect(text)) {
    return defaultContentLanguage
      ? {
          namespace: defaultContentLanguage.namespace,
          version: defaultContentLanguage.version,
          format: 'JSON',
          admitsRefsSiblings: defaultContentLanguage.admitsRefsSiblings,
          mediaType: defaultContentLanguage.mediaType,
        }
      : {
          namespace: 'apidom',
          format: 'JSON',
          mediaType: 'application/json',
        };
  }
  if (await adapterYaml.detect(text)) {
    return defaultContentLanguage
      ? {
          namespace: defaultContentLanguage.namespace,
          version: defaultContentLanguage.version,
          format: 'YAML',
          admitsRefsSiblings: defaultContentLanguage.admitsRefsSiblings,
          mediaType: defaultContentLanguage.mediaType,
        }
      : {
          namespace: 'apidom',
          format: 'YAML',
          mediaType: 'application/yaml',
        };
  }
  return defaultContentLanguage
    ? {
        namespace: defaultContentLanguage.namespace,
        version: defaultContentLanguage.version,
        format: json ? 'JSON' : 'YAML',
        admitsRefsSiblings: defaultContentLanguage.admitsRefsSiblings,
        mediaType: defaultContentLanguage.mediaType,
      }
    : {
        namespace: 'apidom',
        format: json ? 'JSON' : 'YAML',
        mediaType: json ? 'application/json' : 'application/yaml',
      };
}
