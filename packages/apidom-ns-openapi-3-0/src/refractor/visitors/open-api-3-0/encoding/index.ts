import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { isObjectElement, ObjectElement, StringElement, toValue } from '@swagger-api/apidom-core';

import EncodingElement from '../../../../elements/Encoding.ts';
import HeaderElement from '../../../../elements/Header.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import { isHeaderElement } from '../../../../predicates.ts';

/**
 * @public
 */
export interface EncodingVisitorOptions extends FixedFieldsVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class EncodingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: EncodingElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'Encoding']>;

  declare protected readonly canSupportSpecificationExtensions: true;

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
