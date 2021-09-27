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
];
