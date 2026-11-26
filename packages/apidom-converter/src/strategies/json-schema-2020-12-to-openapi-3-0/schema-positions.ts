import {
  Element,
  isArrayElement,
  isBooleanElement,
  isObjectElement,
  toValue,
} from '@swagger-api/apidom-core';
import {
  ComponentsSchemasElement,
  isHeaderElement,
  isMediaTypeElement,
  isParameterElement,
  isReferenceElement,
  isSchemaElement,
} from '@swagger-api/apidom-ns-openapi-3-0';

const isSchemaPosition = (element: Element): boolean =>
  isSchemaElement(element) ||
  (isReferenceElement(element) && toValue(element.meta.get('referenced-element')) === 'schema');

/**
 * A boolean schema is not refracted as a Schema Object, so it is found by the field it is in.
 */
const isBooleanSchemaPosition = (element: Element, parent: Element, key: string): boolean =>
  isBooleanElement(element) &&
  (parent.classes.includes(ComponentsSchemasElement.primaryClass) ||
    (key === 'schema' &&
      (isMediaTypeElement(parent) || isParameterElement(parent) || isHeaderElement(parent))));

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
      current.forEach((value: Element, key: Element) => {
        const name = String(toValue(key));
        if (isBooleanSchemaPosition(value, current, name)) {
          positions.push([...tokens, name]);
        } else {
          walk(value, [...tokens, name]);
        }
      });
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
