import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { ObjectElement } from '@swagger-api/apidom-core';

import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor';
import OpenApi3_0Element from '../../../elements/OpenApi3-0';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface OpenApi3_0VisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

// eslint-disable-next-line @typescript-eslint/naming-convention
class OpenApi3_0Visitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: OpenApi3_0Element;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'OpenApi']>;

  protected declare readonly canSupportSpecificationExtensions: true;

  constructor(options: OpenApi3_0VisitorOptions) {
    super(options);
    this.element = new OpenApi3_0Element();
    this.specPath = always(['document', 'objects', 'OpenApi']);
    this.canSupportSpecificationExtensions = true;
  }

  ObjectElement(objectElement: ObjectElement) {
    return FixedFieldsVisitor.prototype.ObjectElement.call(this, objectElement);
  }
}

export default OpenApi3_0Visitor;
