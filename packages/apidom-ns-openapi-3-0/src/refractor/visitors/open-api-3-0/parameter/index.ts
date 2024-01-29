import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { isObjectElement, ObjectElement, StringElement, toValue } from '@swagger-api/apidom-core';

import ParameterElement from '../../../../elements/Parameter';
import MediaTypeElement from '../../../../elements/MediaType';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { isMediaTypeElement } from '../../../../predicates';

class ParameterVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: ParameterElement;

  public declare readonly specPath: SpecPath<['document', 'objects', 'Parameter']>;

  public declare readonly canSupportSpecificationExtensions: true;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new ParameterElement();
    this.specPath = always(['document', 'objects', 'Parameter']);
    this.canSupportSpecificationExtensions = true;
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

export default ParameterVisitor;
