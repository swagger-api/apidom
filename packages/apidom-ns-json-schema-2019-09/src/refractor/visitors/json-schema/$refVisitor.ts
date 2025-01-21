import { StringElement } from '@swagger-api/apidom-core';
import {
  FallbackVisitor,
  FallbackVisitorOptions,
} from '@swagger-api/apidom-ns-json-schema-draft-7';

export type { FallbackVisitorOptions as $refVisitorOptions };

/**
 * @public
 */
class $refVisitor extends FallbackVisitor {
  declare public readonly element: StringElement;

  StringElement(stringElement: StringElement) {
    const result = super.enter(stringElement);
    this.element.classes.push('reference-value');

    return result;
  }
}

export default $refVisitor;
