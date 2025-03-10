import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { ObjectElement } from '@swagger-api/apidom-core';
import {
  FixedFieldsVisitor,
  FixedFieldsVisitorOptions,
  FallbackVisitor,
  FallbackVisitorOptions,
  SpecPath,
} from '@swagger-api/apidom-ns-openapi-3-0';

import OpenApi3_1Element from '../../../elements/OpenApi3-1.ts';

/**
 * @public
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export interface OpenApi3_1VisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
class OpenApi3_1Visitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: OpenApi3_1Element;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'OpenApi']>;

  declare protected readonly canSupportSpecificationExtensions: true;

  declare protected readonly openApiSemanticElement: OpenApi3_1Element;

  constructor(options: OpenApi3_1VisitorOptions) {
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
