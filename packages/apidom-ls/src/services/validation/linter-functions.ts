import { escapeRegExp } from 'ramda-adjunct';
import {
  Element,
  ArrayElement,
  MemberElement,
  isStringElement,
  filter,
  toValue,
  ArraySlice,
  ObjectElement,
  isArrayElement,
  includesClasses,
} from '@swagger-api/apidom-core';
import { CompletionItem } from 'vscode-languageserver-types';
import { test, resolve, parse } from 'openapi-path-templating';

// eslint-disable-next-line import/no-cycle
import {
  isObject,
  isString,
  isArray,
  isNumber,
  isBoolean,
  isMember,
  processPath,
} from '../../utils/utils';
import { FunctionItem } from '../../apidom-language-types';

const root = (el: Element): Element => {
  const rootElementTypes = ['swagger', 'openApi3_0', 'openApi3_1', 'asyncApi2'];
  let node = el;

  while (node.parent && !rootElementTypes.includes(node.parent.element)) {
    node = node.parent;
  }

  return node.parent;
};

const apilintElementOrClass = (element: Element, elementsOrClasses: string[]): boolean => {
  if (element) {
    return (
      elementsOrClasses.includes(element.element) ||
      (toValue(element.getMetaProperty('referenced-element', '')).length > 0 &&
        elementsOrClasses.includes(toValue(element.getMetaProperty('referenced-element')))) ||
      (element.classes &&
        toValue(element.classes).some((v: string) => elementsOrClasses.includes(v)))
    );
  }
  return true;
};

const CASES: Record<string, string> = {
  camel: '[a-z][a-z{0-9}]*(?:[A-Z{0-9}](?:[a-z{0-9}]+|$))*',
  cobol: '[A-Z][A-Z{0-9}]*(?:-[A-Z{0-9}]+)*',
  flat: '[a-z][a-z{0-9}]*',
  kebab: '[a-z][a-z{0-9}]*(?:-[a-z{0-9}]+)*',
  macro: '[A-Z][A-Z{0-9}]*(?:_[A-Z{0-9}]+)*',
  pascal: '[A-Z][a-z{0-9}]*(?:[A-Z{0-9}](?:[a-z{0-9}]+|$))*',
  snake: '[a-z][a-z{0-9}]*(?:_[a-z{0-9}]+)*',
};

const CASES_NO_NUMBERS: Record<string, string> = {
  camel: '[a-z][a-z{}]*(?:[A-Z{}](?:[a-z{}]+|$))*',
  cobol: '[A-Z][A-Z{}]*(?:-[A-Z{}]+)*',
  flat: '[a-z][a-z{}]*',
  kebab: '[a-z][a-z{}]*(?:-[a-z{}]+)*',
  macro: '[A-Z][A-Z{}]*(?:_[A-Z{}]+)*',
  pascal: '[A-Z][a-z{}]*(?:[A-Z{}](?:[a-z{}]+|$))*',
  snake: '[a-z][a-z{}]*(?:_[a-z{}]+)*',
};

const casing = (
  value: string,
  casingStyle: string,
  noNumbers?: boolean,
  separatorChar?: string,
  separatorAsFirstChar?: boolean,
): boolean => {
  if (value.length === 1 && separatorAsFirstChar && value === separatorChar) {
    return true;
  }
  const casingRegexString = noNumbers ? CASES_NO_NUMBERS[casingStyle] : CASES[casingStyle];
  if (!casingRegexString) {
    return true;
  }
  let regex = new RegExp(`^${casingRegexString}$`);
  if (separatorChar) {
    const separatorRegexString = `[${escapeRegExp(separatorChar)}]`;
    const separatorFirstCharString = separatorAsFirstChar ? `${separatorRegexString}?` : '';
    regex = new RegExp(
      `^${separatorFirstCharString}${casingRegexString}(?:${separatorRegexString}${casingRegexString})*$`,
    );
  }
  if (!regex.test(value)) {
    return false;
  }

  return true;
};

const isType = (element: Element, elementType: string): boolean => {
  switch (elementType) {
    case 'object':
      if (!isObject(element)) return false;
      break;
    case 'string':
      if (!isString(element)) return false;
      break;
    case 'number':
      if (!isNumber(element)) return false;
      break;
    case 'boolean':
      if (!isBoolean(element)) return false;
      break;
    case 'array':
      if (!isArray(element)) return false;
      break;
    default:
    //
  }
  return true;
};

// eslint-disable-next-line import/prefer-default-export
export const standardLinterfunctions: FunctionItem[] = [
  {
    functionName: 'hasRequiredField',
    function: (element: Element, key: string): boolean => {
      if (element && isObject(element)) {
        if (!element.get(key)) {
          return false;
        }
      }
      return true;
    },
  },
  {
    functionName: 'missingField',
    function: (element: Element, key: string): boolean => {
      if (element && isObject(element)) {
        if (element.hasKey(key)) {
          return false;
        }
      }
      return true;
    },
  },
  {
    functionName: 'missingFields',
    function: (element: Element, keys: string[]): boolean => {
      if (element && isObject(element)) {
        for (const key of keys) {
          if (element.hasKey(key)) {
            return false;
          }
        }
      }
      return true;
    },
  },
  {
    functionName: 'existFields',
    function: (element: Element, keys: string[]): boolean => {
      if (element && isObject(element)) {
        for (const key of keys) {
          if (!element.hasKey(key)) {
            return false;
          }
        }
      }
      return true;
    },
  },
  {
    functionName: 'allowedFields',
    function: (
      element: Element,
      keys: string[],
      allowExtensionPrefix: string | undefined,
    ): boolean => {
      if (element && isObject(element)) {
        if (
          element.findElements(
            (e) => {
              const included = keys.includes(toValue((e.parent as MemberElement).key));
              const isExtension =
                allowExtensionPrefix !== undefined &&
                toValue((e.parent as MemberElement).key as Element).startsWith(
                  allowExtensionPrefix,
                );
              return !included && (allowExtensionPrefix === undefined || !isExtension);
            },
            {
              recursive: false,
            },
          ).length > 0
        ) {
          return false;
        }
      }
      return true;
    },
  },
  {
    functionName: 'apilintFieldValueRegex',
    function: (element: Element, key: string, regexString: string): boolean => {
      if (element && isObject(element)) {
        if (element.get(key)) {
          const regex = new RegExp(regexString);
          if (!regex.test(toValue(element.get(key)))) {
            return false;
          }
        }
      }
      return true;
    },
  },
  {
    functionName: 'apilintValueRegex',
    function: (element: Element, regexString: string, elementType?: string): boolean => {
      if (element) {
        const regex = new RegExp(regexString);
        if (!regex.test(toValue(element))) {
          return false;
        }
        if (elementType) {
          if (!isType(element, elementType)) {
            return false;
          }
        }
      }
      return true;
    },
  },
  {
    functionName: 'apilintKeyRegex',
    function: (element: Element, regexString: string): boolean => {
      if (element && element.parent && isMember(element.parent)) {
        const elKey = toValue(element.parent.key as Element);
        const regex = new RegExp(regexString);
        if (!regex.test(elKey)) {
          return false;
        }
      }
      return true;
    },
  },
  {
    functionName: 'apilintNumber',
    function: (
      element: Element,
      integer?: boolean,
      positive?: boolean,
      includesZero?: boolean,
    ): boolean => {
      if (element) {
        if (!isNumber(element)) {
          return false;
        }
        if (integer) {
          if (!Number.isInteger(toValue(element))) {
            return false;
          }
        }
        if (positive && includesZero) {
          if (toValue(element) < 0) {
            return false;
          }
        } else if (positive && !includesZero) {
          if (toValue(element) <= 0) {
            return false;
          }
        }
      }
      return true;
    },
  },
  {
    functionName: 'apilintValueOrArray',
    function: (element: Element, values: string[], unique?: boolean): boolean => {
      if (element) {
        const elValue = toValue(element);
        const isArrayVal = Array.isArray(elValue);
        if (!isArrayVal && !values.includes(elValue)) {
          return false;
        }
        if (isArrayVal && !elValue.every((v) => values.includes(v))) {
          return false;
        }
        if (unique && isArrayVal && new Set(elValue).size !== elValue.length) {
          return false;
        }
      }
      return true;
    },
  },
  {
    functionName: 'apilintContainsValue',
    function: (element: Element, value: unknown): boolean => {
      if (element) {
        const elValue = toValue(element);
        const isArrayVal = Array.isArray(elValue);
        if (!isArrayVal && value !== elValue) {
          return false;
        }
        if (isArrayVal && !elValue.includes(value)) {
          return false;
        }
      }
      return true;
    },
  },
  {
    functionName: 'apilintUniqueArray',
    function: (element: Element): boolean => {
      if (element) {
        const elValue = toValue(element);
        const isArrayVal = Array.isArray(elValue);
        if (!isArrayVal || new Set(elValue).size !== elValue.length) {
          return false;
        }
      }
      return true;
    },
  },
  {
    functionName: 'apilintFieldValueOrArray',
    function: (element: Element, key: string, values: string[]): boolean => {
      if (element && isObject(element)) {
        if (element.get(key)) {
          const elValue = toValue(element.get(key));
          const isArrayVal = Array.isArray(elValue);
          if (!isArrayVal && !values.includes(elValue)) {
            return false;
          }
          if (isArrayVal && !elValue.every((v) => values.includes(v))) {
            return false;
          }
        }
      }
      return true;
    },
  },
  {
    functionName: 'apilintType',
    function: (element: Element, elementType: string): boolean => {
      if (element) {
        if (!isType(element, elementType)) {
          return false;
        }
      }
      return true;
    },
  },
  {
    functionName: 'apilintElementOrClass',
    function: apilintElementOrClass,
  },
  {
    functionName: 'apilintArrayOfElementsOrClasses',
    function: (element: Element, elementsOrClasses: string[], nonEmpty?: boolean): boolean => {
      if (element) {
        const elValue = toValue(element);
        const isArrayVal = Array.isArray(elValue);
        if (!isArrayVal) {
          return false;
        }
        if (
          (element as ArrayElement).findElements(
            (e) => !apilintElementOrClass(e, elementsOrClasses),
            {
              recursive: false,
            },
          ).length > 0
        ) {
          return false;
        }
        if (nonEmpty && elValue.length === 0) {
          return false;
        }
      }
      return true;
    },
  },
  {
    functionName: 'apilintChildrenOfElementsOrClasses',
    function: (element: Element, elementsOrClasses: string[]): boolean => {
      if (element && !isObject(element)) {
        return false;
      }
      if (element && isObject(element)) {
        if (
          element.findElements((e) => !apilintElementOrClass(e, elementsOrClasses), {
            recursive: false,
          }).length > 0
        ) {
          return false;
        }
      }
      return true;
    },
  },
  {
    functionName: 'apilintArray',
    function: (element: Element): boolean => {
      if (element) {
        const elValue = toValue(element);
        const isArrayVal = Array.isArray(elValue);
        if (!isArrayVal) {
          return false;
        }
      }
      return true;
    },
  },
  {
    functionName: 'apilintArrayOfType',
    function: (element: Element, type: string, nonEmpty?: boolean): boolean => {
      if (element) {
        const elValue = toValue(element);
        const isArrayVal = Array.isArray(elValue);
        if (!isArrayVal) {
          return false;
        }
        if (
          (element as ArrayElement).findElements((e) => !isType(e, type), {
            recursive: false,
          }).length > 0
        ) {
          return false;
        }
        if (nonEmpty && elValue.length === 0) {
          return false;
        }
      }
      return true;
    },
  },
  {
    functionName: 'apilintArrayNotEmpty',
    function: (element: Element): boolean => {
      if (element) {
        const elValue = toValue(element);
        if (Array.isArray(elValue) && elValue.length === 0) {
          return false;
        }
      }
      return true;
    },
  },
  {
    functionName: 'apilintChildrenOfType',
    function: (element: Element, type: string, nonEmpty?: boolean): boolean => {
      if (element && isObject(element)) {
        if (
          element.findElements((e) => !isType(e, type), {
            recursive: false,
          }).length > 0
        ) {
          return false;
        }
        if (nonEmpty && element.keys().length === 0) {
          return false;
        }
      }
      return true;
    },
  },
  {
    functionName: 'apilintKeyIsRegex',
    function: (element: Element): boolean => {
      if (element && element.parent && isMember(element.parent)) {
        const elKey = toValue(element.parent.key as Element);
        try {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const regex = new RegExp(elKey);
        } catch (e) {
          return false;
        }
      }
      return true;
    },
  },
  {
    functionName: 'apilintMaxLength',
    function: (element: Element, maxLength: number): boolean => {
      if (element) {
        if (!isString(element)) {
          return false;
        }

        return toValue(element).length <= maxLength;
      }

      return true;
    },
  },
  {
    functionName: 'apilintMaximum',
    function: (element: Element, maximum: number): boolean => {
      if (element) {
        if (!isNumber(element)) {
          return false;
        }

        return toValue(element) <= maximum;
      }

      return true;
    },
  },
  {
    functionName: 'apilintMinimum',
    function: (element: Element, minimum: number): boolean => {
      if (element) {
        if (!isNumber(element)) {
          return false;
        }

        return toValue(element) <= minimum;
      }

      return true;
    },
  },
  {
    functionName: 'apilintValidURI',
    function: (element: Element, absolute = false): boolean => {
      if (element) {
        if (!isString(element)) {
          return false;
        }
        try {
          // eslint-disable-next-line no-new
          new URL(toValue(element), absolute ? undefined : 'http://example.com');
        } catch (e) {
          return false;
        }
      }
      return true;
    },
  },
  {
    functionName: 'apicompleteDiscriminator',
    function: (element: Element): CompletionItem[] => {
      const result: CompletionItem[] = [];
      if (element?.parent?.parent && isObject(element.parent.parent)) {
        const elParent = element.parent.parent;
        const elRequired: string[] = elParent.get('required')
          ? toValue(elParent.get('required'))
          : [];
        for (const key of elRequired) {
          const item: CompletionItem = {
            label: key,
            insertText: key,
            kind: 12,
            documentation: '',
            // detail: 'replace with',
            insertTextFormat: 2,
          };
          result.push(item);
        }
      }
      return result;
    },
  },
  {
    functionName: 'apicompleteRequired',
    function: (element: Element): CompletionItem[] => {
      /*
       TODO this is made to work specifically for required in JSON and YAML, where the element parameter
       is different: In YAML it's the string array item, while in JSON with no quotes it's the parent array.
       */
      let targetElement = element?.parent;
      if (isArray(element)) {
        targetElement = element;
      }
      const result: CompletionItem[] = [];
      const existing: string[] = [];
      if (targetElement && Array.isArray(toValue(targetElement))) {
        existing.push(...toValue(targetElement));
      }
      if (targetElement?.parent?.parent && isObject(targetElement.parent.parent)) {
        const elParent = targetElement.parent.parent;
        if (elParent.get('properties')) {
          for (const key of elParent.get('properties').keys()) {
            if (!existing.includes(key)) {
              const item: CompletionItem = {
                label: key,
                insertText: key,
                kind: 12,
                documentation: '',
                // detail: 'replace with',
                insertTextFormat: 2,
              };
              result.push(item);
            }
          }
        }
      }
      return result;
    },
  },
  {
    functionName: 'apicompleteSecurity',
    function: (element: Element): CompletionItem[] => {
      const result: CompletionItem[] = [];

      if (element.parent?.parent) {
        const existing: string[] = [];
        if (element.element === 'securityRequirement' && isObject(element)) {
          existing.push(...(element.keys() as string[]));
        }
        if (isArray(element.parent)) {
          const api = root(element);
          const schemes: ArraySlice = filter((el: Element) => {
            return el.element === 'securityScheme';
          }, api);

          for (const scheme of schemes) {
            const key = scheme.parent && isMember(scheme.parent) ? scheme.parent.key : undefined;
            if (key) {
              if (!existing.includes(toValue(key))) {
                const item: CompletionItem = {
                  label: toValue(key),
                  insertText: toValue(key),
                  kind: 12,
                  documentation: '',
                  // detail: 'replace with',
                  insertTextFormat: 2,
                };
                result.push(item);
              }
            }
          }
        }
      }

      return result;
    },
  },
  {
    functionName: 'apilintDiscriminator',
    function: (element: Element): boolean => {
      if (element) {
        if (!isString(element)) {
          return false;
        }
      }
      if (element?.parent?.parent && isObject(element.parent.parent)) {
        const elParent = element.parent.parent;
        const elRequired: string[] = elParent.get('required')
          ? toValue(elParent.get('required'))
          : [];
        return elRequired.includes(toValue(element));
      }
      return true;
    },
  },
  {
    functionName: 'apilintKeysIncluded',
    function: (element: Element, path: string): boolean => {
      if (element && (isObject(element) || isArray(element))) {
        const api = root(element);

        const targetEl = processPath(element, path, api);
        if (!targetEl) {
          return true;
        }

        if (isObject(element)) {
          return element.keys().every((v) => (targetEl as ObjectElement).keys().includes(v));
        }
        if (isArray(element)) {
          return (
            element.findElements(
              (e) => !(targetEl as ObjectElement).keys().includes(toValue(e)),
              {},
            ).length === 0
          );
        }
      }
      return true;
    },
  },
  {
    functionName: 'apilintElementKeysIncluded',
    function: (element: Element, elementOrClass: string): boolean => {
      if (isObject(element) || isArray(element)) {
        const api = root(element);

        const elements: ArraySlice = filter((el: Element) => {
          return (
            el.element === elementOrClass ||
            toValue(el.getMetaProperty('classes', [])).includes(elementOrClass)
          );
        }, api);
        const targetKeys: string[] = [];
        for (const targetEl of elements) {
          if (isObject(targetEl)) {
            // @ts-ignore
            targetKeys.push(...targetEl.keys());
          }
        }
        if (isObject(element)) {
          // @ts-ignore
          return element.keys().every((v) => targetKeys.includes(toValue(v)));
        }
        if (isArray(element)) {
          return (
            element.findElements((e) => {
              return !targetKeys.includes(toValue(e));
            }, {}).length === 0
          );
        }
      }
      return true;
    },
  },
  {
    functionName: 'apicompleteChannelServers',
    function: (element: Element): CompletionItem[] => {
      const result: CompletionItem[] = [];

      if (element.parent?.parent) {
        const existing: string[] = [];
        if (isArray(element.parent)) {
          existing.push(...(toValue(element.parent) as string[]));
          const api = root(element);
          const servers: ArraySlice = filter((el: Element) => {
            return el.element === 'server';
          }, api);

          for (const server of servers) {
            const key = server.parent && isMember(server.parent) ? server.parent.key : undefined;
            if (key) {
              if (!existing.includes(toValue(key))) {
                const item: CompletionItem = {
                  label: toValue(key),
                  insertText: toValue(key),
                  kind: 12,
                  documentation: '',
                  // detail: 'replace with',
                  insertTextFormat: 2,
                };
                result.push(item);
              }
            }
          }
        }
      }

      return result;
    },
  },
  {
    functionName: 'apilintPropertyUniqueValue',
    function: (element: Element, elementOrClasses: string[], key: string): boolean => {
      const api = root(element);
      const value = toValue(element);
      const elements: ArraySlice = filter((el: Element) => {
        const classes: string[] = toValue(el.getMetaProperty('classes', []));
        return (
          (elementOrClasses.includes(el.element) ||
            classes.every((v) => elementOrClasses.includes(v))) &&
          isObject(el) &&
          el.hasKey(key) &&
          toValue(el.get(key)) === value
        );
      }, api);
      if (elements.length > 1) {
        return false;
      }
      return true;
    },
  },
  {
    functionName: 'apilintChannelParameterExist',
    function: (element: Element): boolean => {
      const referencedElement = toValue(element.getMetaProperty('referenced-element', ''));
      // check ancestor to be a channelItem
      if (element.parent?.parent?.parent?.parent?.element !== 'channelItem') {
        return true;
      }
      if (element.element === 'parameter' || referencedElement === 'parameter') {
        const parameterName = toValue((element.parent as MemberElement)?.key as Element);
        const channelEl: Element = element.parent?.parent?.parent?.parent;
        const channelName: string = toValue((channelEl.parent as MemberElement)?.key as Element);
        if (channelName.indexOf(`{${parameterName}}`) === -1) {
          return false;
        }
      }
      return true;
    },
  },
  {
    functionName: 'apilintKeysRegex',
    function: (element: Element, regexString: string): boolean => {
      if (element && isObject(element)) {
        if (isObject(element)) {
          const regex = new RegExp(regexString);

          return (element.keys() as string[]).every((v) => {
            return regex.test(v);
          });
        }
      }
      return true;
    },
  },
  {
    functionName: 'apilintMembersKeysRegex',
    function: (element: Element, regexString: string): boolean => {
      if (element && isObject(element)) {
        if (isObject(element)) {
          const regex = new RegExp(regexString);
          for (const key of element.keys() as string[]) {
            if (isObject(element.get(key))) {
              const member = element.get(key);
              const ok = (member.keys() as string[]).every((v) => {
                return regex.test(v);
              });
              if (!ok) {
                return ok;
              }
            }
          }
        }
      }
      return true;
    },
  },
  {
    functionName: 'apilintNamedChildrenOfElementsOrClasess',
    function: (element: Element, keys: string[], elementsOrClasses: string[][]): boolean => {
      if (element && !isObject(element)) {
        return false;
      }
      if (element && isObject(element)) {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i++; i < keys.length) {
          if (!apilintElementOrClass(element.get(keys[i]), elementsOrClasses[i])) {
            return false;
          }
        }
      }
      return true;
    },
  },
  {
    functionName: 'apilintNoDuplicateKeys',
    function: (element: Element): boolean => {
      if (element && isObject(element)) {
        const keys = element.keys() as string[];
        if (keys.length !== new Set(keys).size) {
          return false;
        }
      }
      return true;
    },
  },
  {
    functionName: 'apilintRequiredDefinedInProperties',
    function: (element: Element): boolean => {
      if (element && element.parent?.parent && isObject(element.parent?.parent)) {
        const required = toValue(element) as string[];
        const properties = element.parent.parent.get('properties') as ObjectElement | undefined;
        if (required) {
          for (const r of required) {
            if (!properties?.hasKey(r)) {
              return false;
            }
          }
        }
      }
      return true;
    },
  },
  {
    functionName: 'apilintFieldsKeysCasing',
    function: (
      element: Element,
      casingStyle: string,
      noNumbers?: boolean,
      separatorChar?: string,
      separatorAsFirstChar?: boolean,
    ): boolean => {
      if (element && !isObject(element)) {
        return true;
      }
      if (element && isObject(element)) {
        return (element.keys() as string[]).every((k) =>
          casing(k, casingStyle, noNumbers, separatorChar, separatorAsFirstChar),
        );
      }
      return true;
    },
  },
  {
    functionName: 'apilintFieldsValuesCasing',
    function: (
      element: Element,
      casingStyle: string,
      noNumbers?: boolean,
      separatorChar?: string,
      separatorAsFirstChar?: boolean,
    ): boolean => {
      if (element && !isObject(element)) {
        return true;
      }
      if (element && isObject(element)) {
        return (element.keys() as string[]).every((k) =>
          casing(
            toValue(element.get(k)),
            casingStyle,
            noNumbers,
            separatorChar,
            separatorAsFirstChar,
          ),
        );
      }
      return true;
    },
  },
  {
    functionName: 'apilintValueCasing',
    function: (
      element: Element,
      casingStyle: string,
      noNumbers?: boolean,
      separatorChar?: string,
      separatorAsFirstChar?: boolean,
    ): boolean => {
      if (element) {
        return casing(
          toValue(element),
          casingStyle,
          noNumbers,
          separatorChar,
          separatorAsFirstChar,
        );
      }
      return true;
    },
  },
  {
    functionName: 'apilintKeyCasing',
    function: (
      element: Element,
      casingStyle: string,
      noNumbers?: boolean,
      separatorChar?: string,
      separatorAsFirstChar?: boolean,
    ): boolean => {
      if (element && (!element.parent || !isMember(element.parent))) {
        return true;
      }
      if (element && element.parent && isMember(element.parent)) {
        const elKey = toValue(element.parent.key as Element);
        return casing(elKey, casingStyle, noNumbers, separatorChar, separatorAsFirstChar);
      }
      return true;
    },
  },
  {
    functionName: 'apilintOperationRequestBodyAllowed',
    function: (element: Element, allowedHttpMethods: string[]): boolean => {
      const operationNode = element?.parent?.parent;
      if (!operationNode || operationNode.element !== 'operation') {
        return true;
      }
      const httpMethod = toValue(operationNode.getMetaProperty('http-method', ''));
      if (httpMethod && !allowedHttpMethods.includes(httpMethod)) {
        return false;
      }

      return true;
    },
  },
  {
    functionName: 'apilintIncludedInArray',
    function: (element: Element, path: string, arrayMustExist: boolean): boolean => {
      if (element && (isString(element) || isNumber(element))) {
        const api = root(element);

        const targetEl = processPath(element, path, api);
        if (!targetEl) {
          return !arrayMustExist;
        }
        const isIncluded =
          (targetEl as ArrayElement).findElements((e) => toValue(e) === toValue(element), {
            recursive: false,
          }).length > 0;
        return isIncluded;
      }
      return true;
    },
  },
  {
    functionName: 'apilintOpenAPIPathTemplateWellFormed',
    function: (element: Element, strict = false) => {
      if (isStringElement(element)) {
        const pathTemplate = toValue(element);
        return test(pathTemplate, { strict });
      }
      return true;
    },
  },
  {
    functionName: 'apilintOpenAPIPathTemplateValid',
    function: (element: Element) => {
      if (isStringElement(element)) {
        const pathItemElement = (element.parent as MemberElement).value as ObjectElement;

        if (pathItemElement.length === 0) {
          return true;
        }

        let oneOfParametersIsReferenceObject = false;
        const parameterElements: Element[] = [];
        const isParameterElement = (el: Element): boolean => el.element === 'parameter';
        const isReferenceElement = (el: Element): boolean => el.element === 'reference';

        const pathItemParameterElements = pathItemElement.get('parameters');
        if (isArrayElement(pathItemParameterElements)) {
          pathItemParameterElements.forEach((parameter) => {
            if (isReferenceElement(parameter) && !oneOfParametersIsReferenceObject) {
              oneOfParametersIsReferenceObject = true;
            }
            if (isParameterElement(parameter)) {
              parameterElements.push(parameter);
            }
          });
        }

        pathItemElement.forEach((el) => {
          if (el.element === 'operation') {
            const operationParameterElements = (el as ObjectElement).get('parameters');
            if (isArrayElement(operationParameterElements)) {
              operationParameterElements.forEach((parameter) => {
                if (isReferenceElement(parameter) && !oneOfParametersIsReferenceObject) {
                  oneOfParametersIsReferenceObject = true;
                }
                if (isParameterElement(parameter)) {
                  parameterElements.push(parameter);
                }
              });
            }
          }
        });

        const pathTemplateResolveParams: { [key: string]: 'placeholder' } = {};

        parameterElements.forEach((parameter) => {
          if (toValue((parameter as ObjectElement).get('in')) === 'path') {
            pathTemplateResolveParams[toValue((parameter as ObjectElement).get('name'))] =
              'placeholder';
          }
        });

        const pathTemplate = toValue(element);
        const resolvedPathTemplate = resolve(pathTemplate, pathTemplateResolveParams);
        const includesTemplateExpression = test(resolvedPathTemplate, { strict: true });

        return !includesTemplateExpression || oneOfParametersIsReferenceObject;
      }

      return true;
    },
  },
  {
    functionName: 'apilintOpenAPIParameterFieldIsDefinedWithinPathTemplate',
    function: (element: Element) => {
      if (element.element === 'parameter') {
        const parameterLocation = toValue((element as ObjectElement).get('in'));
        const isInPathItemElement =
          isArrayElement(element.parent) &&
          includesClasses(['path-item-parameters'], element.parent);

        if (!isInPathItemElement || parameterLocation !== 'path') {
          return true;
        }

        const pathItemElement = element.parent.parent.parent;
        const isPathItemPartOfPathTemplating = isStringElement(pathItemElement.meta.get('path'));

        if (!isPathItemPartOfPathTemplating) {
          return true;
        }

        const pathTemplate = toValue(pathItemElement.meta.get('path'));
        const parameterName = toValue((element as ObjectElement).get('name'));

        const parseResult = parse(pathTemplate);
        const parts: [string, string][] = [];
        parseResult.ast.translate(parts);

        const pathTemplateASTIncludesParameter = (ast: [string, string][]) =>
          ast.findIndex(
            ([name, value]) => name === 'template-expression-param-name' && value === parameterName,
          ) > -1;

        return pathTemplateASTIncludesParameter(parts);
      }
      return true;
    },
  },
];
