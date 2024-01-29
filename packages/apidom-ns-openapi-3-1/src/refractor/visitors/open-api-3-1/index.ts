import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { ObjectElement } from '@swagger-api/apidom-core';
import {
  FixedFieldsVisitor,
  FixedFieldsVisitorOptions,
  FallbackVisitor,
  SpecPath,
} from '@swagger-api/apidom-ns-openapi-3-0';

import OpenApi3_1Element from '../../../elements/OpenApi3-1';

// eslint-disable-next-line @typescript-eslint/naming-convention
class OpenApi3_1Visitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: OpenApi3_1Element;

  public declare readonly specPath: SpecPath<['document', 'objects', 'OpenApi']>;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new OpenApi3_1Element();
    this.specPath = always(['document', 'objects', 'OpenApi']);
    this.canSupportSpecificationExtensions = true;
    this.openApiSemanticElement = this.element;
  }

  ObjectElement(objectElement: ObjectElement) {
    this.openApiGenericElement = objectElement;

    return FixedFieldsVisitor.prototype.ObjectElement.call(this, objectElement);
  }
}

export default OpenApi3_1Visitor;
