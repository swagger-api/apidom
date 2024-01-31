import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { ObjectElement, isStringElement } from '@swagger-api/apidom-core';

import ExampleElement from '../../../../elements/Example';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';

class ExampleVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: ExampleElement;

  public declare readonly specPath: SpecPath<['document', 'objects', 'Example']>;

  public declare readonly canSupportSpecificationExtensions: true;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new ExampleElement();
    this.specPath = always(['document', 'objects', 'Example']);
    this.canSupportSpecificationExtensions = true;
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = FixedFieldsVisitor.prototype.ObjectElement.call(this, objectElement);

    // mark this ExampleElement with reference metadata
    if (isStringElement(this.element.externalValue)) {
      this.element.classes.push('reference-element');
    }

    return result;
  }
}

export default ExampleVisitor;
