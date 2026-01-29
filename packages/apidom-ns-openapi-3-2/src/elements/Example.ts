import { Element, StringElement } from '@swagger-api/apidom-core';
import { ExampleElement } from '@swagger-api/apidom-ns-openapi-3-1';

/**
 * @public
 */
class Example extends ExampleElement {
  /**
   * OpenAPI 3.2: Structured example data as an ApiDOM Element.
   */
  get dataValue(): Element | undefined {
    return this.get('dataValue');
  }

  set dataValue(dataValue: Element | undefined) {
    this.set('dataValue', dataValue);
  }

  /**
   * OpenAPI 3.2: Serialized example value as a string.
   */
  get serializedValue(): StringElement | undefined {
    return this.get('serializedValue');
  }

  set serializedValue(serializedValue: StringElement | undefined) {
    this.set('serializedValue', serializedValue);
  }
}

export default Example;
