import { Element, visit, ArrayElement } from '@swagger-api/apidom-core';
import {
  OperationElement,
  ResponseElement,
  getNodeType,
  keyMap,
} from '@swagger-api/apidom-ns-openapi-3-1';

import StandardIdentifierElement from '../../elements/StandardIdentifier';

/**
 * This file contains logic for translating Standard Identifier to value.
 */

const visitorOptions = { keyMap, nodeTypeGetter: getNodeType };

const access = (
  selected: OperationElement | ResponseElement,
  standardIdentifier: StandardIdentifierElement,
): ArrayElement => {
  const strStandardIdentifier = String(standardIdentifier.toValue());
  const values = new ArrayElement();
  const visitor = {
    enter(element: Element) {
      if (!element.meta.hasKey('ads-a-standard-identifier')) return;

      element.meta
        .get('ads-a-standard-identifier')
        .content.filter((accessorMapping: any) => {
          return String(accessorMapping.get('subject').toValue()) === strStandardIdentifier;
        })
        .forEach((accessorMapping: any) => {
          values.push(accessorMapping.get('value'));
        });
    },
  };

  visit(selected, visitor, visitorOptions);

  return values;
};

export default access;
