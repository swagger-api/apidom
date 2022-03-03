import { includes } from 'ramda';
import { Element, visit, BREAK } from '@swagger-api/apidom-core';
import { OperationElement, getNodeType, keyMap } from '@swagger-api/apidom-ns-openapi-3-1';

import StandardIdentifierElement from '../../elements/StandardIdentifier';

/**
 * This file contains logic for translating Standard Identifier to list of Operation Elements.
 */

const visitorOptions = { keyMap, nodeTypeGetter: getNodeType };

const makeStandardIdentifierVisitor = (standardIdentifier: StandardIdentifierElement) => ({
  hasMatch: false,
  enter(element: Element) {
    if (!element.meta.hasKey('ads-s-standard-identifier')) return undefined;

    const standardIdentifiers = element.meta.get('ads-s-standard-identifier').toValue();

    if (includes(standardIdentifier.toValue(), standardIdentifiers)) {
      this.hasMatch = true;
      return BREAK;
    }

    return undefined;
  },
});

const select = <T extends Element>(
  element: T,
  standardIdentifier: StandardIdentifierElement,
): OperationElement[] => {
  const selected: OperationElement[] = [];
  const visitor = {
    OperationElement(operationElement: OperationElement) {
      const standardIdentifierVisitor = makeStandardIdentifierVisitor(standardIdentifier);

      visit(operationElement, standardIdentifierVisitor, visitorOptions);

      if (standardIdentifierVisitor.hasMatch) {
        selected.push(operationElement);
      }

      return false;
    },
  };

  visit(element, visitor, visitorOptions);

  return selected;
};

export default select;
