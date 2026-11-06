import { Element, toValue } from '@swagger-api/apidom-core';
import { isReferenceElement, isSchemaElement } from '@swagger-api/apidom-ns-openapi-3-0';

import { forEachElement } from './downgrade/document.ts';

const isSchemaPosition = (element: Element): boolean =>
  isSchemaElement(element) ||
  (isReferenceElement(element) && toValue(element.meta.get('referenced-element')) === 'schema');

/**
 * JSON Pointer tokens of every outermost schema in an OpenAPI 3.0 element tree
 * (`components.schemas.X`, a Media Type's, Parameter's or Header's `schema`, …).
 */
const findSchemaPositions = (element: Element): string[][] => {
  const positions: string[][] = [];
  const inside = new Set<string>();

  forEachElement(element, (current, tokens) => {
    const pointer = tokens.join('/');
    const parentPointer = [...inside].find((prefix) => pointer.startsWith(`${prefix}/`));
    if (parentPointer !== undefined) return;
    if (tokens.length > 0 && isSchemaPosition(current)) {
      positions.push([...tokens]);
      inside.add(pointer);
    }
  });

  return positions;
};

export default findSchemaPositions;
