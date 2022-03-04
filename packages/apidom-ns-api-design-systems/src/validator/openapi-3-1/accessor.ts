import { Element, visit, BREAK } from '@swagger-api/apidom-core';
import { OperationElement, getNodeType, keyMap } from '@swagger-api/apidom-ns-openapi-3-1';

import StandardIdentifierElement from '../../elements/StandardIdentifier';

/**
 * This file contains logic for translating Standard Identifier to value.
 */

const visitorOptions = { keyMap, nodeTypeGetter: getNodeType };

const access = <T extends Element>(
  operationElement: OperationElement,
  standardIdentifier: StandardIdentifierElement,
): T => {
  const strStandardIdentifier = String(standardIdentifier.toValue());
  let result: any = null;
  const visitor = {
    enter(element: Element) {
      if (!element.meta.hasKey('ads-a-standard-identifier')) return undefined;

      const accessorMappings = element.meta.get('ads-a-standard-identifier');
      const accessorMapping = accessorMappings.content.find((possibleAccessorMapping: any) => {
        return String(possibleAccessorMapping.get('subject').toValue()) === strStandardIdentifier;
      });

      if (typeof accessorMapping !== 'undefined') {
        result = accessorMapping.get('value');
        return BREAK;
      }

      return undefined;
    },
  };

  visit(operationElement, visitor, visitorOptions);

  return result;
};

export default access;
