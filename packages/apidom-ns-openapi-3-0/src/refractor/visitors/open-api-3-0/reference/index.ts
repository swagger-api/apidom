import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { ObjectElement, isStringElement } from '@swagger-api/apidom-core';

import ReferenceElement from '../../../../elements/Reference';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';

class ReferenceVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: ReferenceElement;

  public declare readonly specPath: SpecPath<['document', 'objects', 'Reference']>;

  public declare readonly canSupportSpecificationExtensions: false;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new ReferenceElement();
    this.specPath = always(['document', 'objects', 'Reference']);
    this.canSupportSpecificationExtensions = false;
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = FixedFieldsVisitor.prototype.ObjectElement.call(this, objectElement);

    // mark this ReferenceElement with reference metadata
    if (isStringElement(this.element.$ref)) {
      this.element.classes.push('reference-element');
    }

    return result;
  }
}

export default ReferenceVisitor;
