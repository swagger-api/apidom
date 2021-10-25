import { Element } from '@swagger-api/apidom-core';

import { isObject } from '../../utils/utils';

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
    function: (element: Element, regexString: string): boolean => {
      if (element) {
        const regex = new RegExp(regexString);
        if (!regex.test(element.toValue())) {
          return false;
        }
      }
      return true;
    },
  },
];
