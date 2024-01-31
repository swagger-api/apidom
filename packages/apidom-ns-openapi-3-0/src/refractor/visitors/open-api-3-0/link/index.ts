import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { isStringElement, ObjectElement } from '@swagger-api/apidom-core';

import LinkElement from '../../../../elements/Link';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';

class LinkVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: LinkElement;

  public declare readonly specPath: SpecPath<['document', 'objects', 'Link']>;

  public declare readonly canSupportSpecificationExtensions: true;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new LinkElement();
    this.specPath = always(['document', 'objects', 'Link']);
    this.canSupportSpecificationExtensions = true;
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = FixedFieldsVisitor.prototype.ObjectElement.call(this, objectElement);

    // mark this LinkElement with reference metadata
    if (isStringElement(this.element.operationId) || isStringElement(this.element.operationRef)) {
      this.element.classes.push('reference-element');
    }

    return result;
  }
}

export default LinkVisitor;
