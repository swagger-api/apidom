import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { isObjectElement, ObjectElement, StringElement, toValue } from '@swagger-api/apidom-core';

import EncodingElement from '../../../../elements/Encoding';
import HeaderElement from '../../../../elements/Header';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';
import { isHeaderElement } from '../../../../predicates';

export interface EncodingVisitorOptions extends FixedFieldsVisitorOptions, FallbackVisitorOptions {}
class EncodingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: EncodingElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'Encoding']>;

  protected declare readonly canSupportSpecificationExtensions: true;

  constructor(options: EncodingVisitorOptions) {
    super(options);
    this.element = new EncodingElement();
    this.specPath = always(['document', 'objects', 'Encoding']);
    this.canSupportSpecificationExtensions = true;
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = FixedFieldsVisitor.prototype.ObjectElement.call(this, objectElement);

    // decorate every Header with media type metadata
    if (isObjectElement(this.element.headers)) {
      this.element.headers
        .filter(isHeaderElement)
        // @ts-ignore
        .forEach((headerElement: HeaderElement, key: StringElement) => {
          headerElement.setMetaProperty('header-name', toValue(key));
        });
    }

    return result;
  }
}

export default EncodingVisitor;
