import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { isObjectElement, ObjectElement, StringElement, toValue } from '@swagger-api/apidom-core';

import ResponseElement from '../../../../elements/Response';
import MediaTypeElement from '../../../../elements/MediaType';
import HeaderElement from '../../../../elements/Header';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { isHeaderElement, isMediaTypeElement } from '../../../../predicates';

class ResponseVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: ResponseElement;

  public declare readonly specPath: SpecPath<['document', 'objects', 'Response']>;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new ResponseElement();
    this.specPath = always(['document', 'objects', 'Response']);
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = FixedFieldsVisitor.prototype.ObjectElement.call(this, objectElement);

    // decorate every MediaTypeElement with media type metadata
    if (isObjectElement(this.element.contentProp)) {
      this.element.contentProp
        .filter(isMediaTypeElement)
        // @ts-ignore
        .forEach((mediaTypeElement: MediaTypeElement, key: StringElement) => {
          mediaTypeElement.setMetaProperty('media-type', toValue(key));
        });
    }

    // decorate every MediaTypeElement with media type metadata
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

export default ResponseVisitor;
