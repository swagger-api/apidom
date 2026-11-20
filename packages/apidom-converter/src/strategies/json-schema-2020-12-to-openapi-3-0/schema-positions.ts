import { Element, isArrayElement, isObjectElement, toValue } from '@swagger-api/apidom-core';
import { isReferenceElement, isSchemaElement } from '@swagger-api/apidom-ns-openapi-3-0';

const isSchemaPosition = (element: Element): boolean =>
  isSchemaElement(element) ||
  (isReferenceElement(element) && toValue(element.meta.get('referenced-element')) === 'schema');

/**
 * JSON Pointer tokens of every outermost schema in an OpenAPI 3.0 element tree
 * (`components.schemas.X`, a Media Type's, Parameter's or Header's `schema`, …).
 */
const findSchemaPositions = (element: Element): string[][] => {
  const positions: string[][] = [];

  const walk = (current: Element, tokens: string[]): void => {
    if (tokens.length > 0 && isSchemaPosition(current)) {
      positions.push(tokens);
      return;
    }
    if (isObjectElement(current)) {
      current.forEach((value: Element, key: Element) =>
        walk(value, [...tokens, String(toValue(key))]),
      );
    } else if (isArrayElement(current)) {
      (current.content as Element[]).forEach((item, index) =>
        walk(item, [...tokens, String(index)]),
      );
    }
  };

  walk(element, []);

  return positions;
};

export default findSchemaPositions;
