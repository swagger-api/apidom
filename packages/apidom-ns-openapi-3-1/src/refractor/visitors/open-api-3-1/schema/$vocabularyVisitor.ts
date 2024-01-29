import { ObjectElement } from '@swagger-api/apidom-core';
import { FallbackVisitor } from '@swagger-api/apidom-ns-openapi-3-0';

class $vocabularyVisitor extends FallbackVisitor {
  public declare readonly element: ObjectElement;

  ObjectElement(objectElement: ObjectElement) {
    const result = super.enter(objectElement);
    this.element.classes.push('json-schema-$vocabulary');

    return result;
  }
}

export default $vocabularyVisitor;
