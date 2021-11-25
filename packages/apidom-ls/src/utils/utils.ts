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
  traverse,
} from '@swagger-api/apidom-core';

import {
  ApidomCompletionItem,
  LanguageSettings,
  LinterMeta,
  MetadataMaps,
  Pointer,
} from '../apidom-language-types';
// eslint-disable-next-line import/no-cycle
import { standardLinterfunctions } from '../services/validation/linter-functions';

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

export function buildJsonPointer(path: string[]): string {
  return `#/${path.join('/')}`;
}

export function localReferencePointers(doc: Element, nodeElement: string): Pointer[] {
  const pointers: Pointer[] = [];
  // traverse all doc to find nodes of the same type which are not a ref
  const foundNodes: Element[] = [];
  let nodePath: string[] = [];
  function buildPointer(traverseNode: Element): void {
    if (!traverseNode) return;
    if (traverseNode.parent && isMember(traverseNode.parent)) {
      nodePath.unshift((traverseNode.parent.key as Element).toValue());
      buildPointer(traverseNode.parent?.parent);
    }
  }

  // TODO check for reference-element class or type instead
  function findRefNodes(traversedNode: Element): void {
    if (traversedNode.element === nodeElement) {
      if (
        !(
          isObject(traversedNode) &&
          traversedNode.get('$ref') &&
          traversedNode.get('$ref').toValue().length > 0
        )
      ) {
        foundNodes.push(traversedNode);
      }
    }
  }
  traverse(findRefNodes, doc);
  for (const foundNode of foundNodes) {
    nodePath = [];
    buildPointer(foundNode);
    pointers.push({ node: foundNode, ref: buildJsonPointer(nodePath) });
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
