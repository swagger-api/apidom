import { includes } from 'ramda';
import { visit } from '@swagger-api/apidom-core';
import {
  OperationElement,
  OpenApi3_1Element,
  ResponseElement,
  getNodeType,
  keyMap,
} from '@swagger-api/apidom-ns-openapi-3-1';

import StandardIdentifierElement from '../../elements/StandardIdentifier';

/**
 * This file contains logic for translating Standard Identifier to list of Operation Elements.
 */

const visitorOptions = { keyMap, nodeTypeGetter: getNodeType };

const select = (
  openAPIElement: OpenApi3_1Element,
  standardIdentifier: StandardIdentifierElement,
) => {
  const selected: (OperationElement | ResponseElement)[] = [];
  const visitor = {
    OperationElement(element: OperationElement) {
      if (!element.meta.hasKey('ads-s-standard-identifier')) return;

      const standardIdentifiers = element.meta.get('ads-s-standard-identifier').toValue();

      if (includes(standardIdentifier.toValue(), standardIdentifiers)) {
        selected.push(element);
      }
    },
    ResponseElement(element: ResponseElement) {
      if (!element.meta.hasKey('ads-s-standard-identifier')) return;

      const standardIdentifiers = element.meta.get('ads-s-standard-identifier').toValue();

      if (includes(standardIdentifier.toValue(), standardIdentifiers)) {
        selected.push(element);
      }
    },
  };

  visit(openAPIElement, visitor, visitorOptions);

  return selected;
};

export default select;
