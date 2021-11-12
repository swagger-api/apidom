import { Element, ArrayElement, MemberElement } from '@swagger-api/apidom-core';

import { isObject, isString, isArray, isNumber, isBoolean, isMember } from '../../utils/utils';

const apilintElementOrClass = (element: Element, elementsOrClasses: string[]): boolean => {
  if (element) {
    return (
      elementsOrClasses.includes(element.element) ||
      (element.getMetaProperty('referenced-element', '').toValue().length > 0 &&
        elementsOrClasses.includes(element.getMetaProperty('referenced-element').toValue())) ||
      (element.classes &&
        element.classes.toValue().some((v: string) => elementsOrClasses.includes(v)))
    );
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
export const standardLinterfunctions = [
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
    function: (element: Element, keys: string[]): boolean => {
      if (element && isObject(element)) {
        if (
          element.findElements(
            (e) => !keys.includes(((e.parent as MemberElement).key as Element).toValue()),
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
          if (!regex.test(element.get(key).toValue())) {
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
        if (!regex.test(element.toValue())) {
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
          if (!Number.isInteger(element.toValue())) {
            return false;
          }
        }
        if (positive && includesZero) {
          if (element.toValue() < 0) {
            return false;
          }
        } else if (positive && !includesZero) {
          if (element.toValue() <= 0) {
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
        const elValue = element.toValue();
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
    function: (element: Element, value: string): boolean => {
      if (element) {
        const elValue = element.toValue();
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
        const elValue = element.toValue();
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
          const elValue = element.get(key).toValue();
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
    functionName: 'apilintArrayOfElementsOrClasess',
    function: (element: Element, elementsOrClasses: string[]): boolean => {
      if (element) {
        const elValue = element.toValue();
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
      }
      return true;
    },
  },
  {
    functionName: 'apilintChildrenOfElementsOrClasess',
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
    functionName: 'apilintArrayOfType',
    function: (element: Element, type: string): boolean => {
      if (element) {
        const elValue = element.toValue();
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
      }
      return true;
    },
  },
  {
    functionName: 'apilintKeyIsRegex',
    function: (element: Element): boolean => {
      if (element && element.parent && isMember(element.parent)) {
        const elKey = (element.parent.key as Element).toValue();
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
    functionName: 'apilintValidURI',
    function: (element: Element): boolean => {
      if (element) {
        if (!isString(element)) {
          return false;
        }
        try {
          // eslint-disable-next-line no-new
          new URL(element.toValue(), 'http://example.com');
        } catch (e) {
          return false;
        }
      }
      return true;
    },
  },
];
