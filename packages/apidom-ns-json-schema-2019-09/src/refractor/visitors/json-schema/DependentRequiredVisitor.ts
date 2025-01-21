import { ObjectElement } from '@swagger-api/apidom-core';
import {
  FallbackVisitor,
  FallbackVisitorOptions,
} from '@swagger-api/apidom-ns-json-schema-draft-7';

export type { FallbackVisitorOptions as DependentRequiredVisitorOptions };

/**
 * @public
 */
class DependentRequiredVisitor extends FallbackVisitor {
  declare public readonly element: ObjectElement;

  ObjectElement(objectElement: ObjectElement) {
    const result = super.enter(objectElement);
    this.element.classes.push('json-schema-dependentRequired');

    return result;
  }
}

export default DependentRequiredVisitor;
