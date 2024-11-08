import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { StringElement, ObjectElement, isObjectElement, toValue } from '@swagger-api/apidom-core';

import RequestBodyElement from '../../../../elements/RequestBody.ts';
import MediaTypeElement from '../../../../elements/MediaType.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import { isMediaTypeElement } from '../../../../predicates.ts';

export interface RequestBodyVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class RequestBodyVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: RequestBodyElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'RequestBody']>;

  constructor(options: RequestBodyVisitorOptions) {
    super(options);
    this.element = new RequestBodyElement();
    this.specPath = always(['document', 'objects', 'RequestBody']);
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

    return result;
  }
}

export default RequestBodyVisitor;
