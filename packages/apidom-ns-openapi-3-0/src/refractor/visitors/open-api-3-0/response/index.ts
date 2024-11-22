import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { isObjectElement, ObjectElement, StringElement, toValue } from '@swagger-api/apidom-core';

import ResponseElement from '../../../../elements/Response.ts';
import MediaTypeElement from '../../../../elements/MediaType.ts';
import HeaderElement from '../../../../elements/Header.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import { isHeaderElement, isMediaTypeElement } from '../../../../predicates.ts';

/**
 * @public
 */
export interface ResponseVisitorOptions extends FixedFieldsVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class ResponseVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: ResponseElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'Response']>;

  constructor(options: ResponseVisitorOptions) {
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
