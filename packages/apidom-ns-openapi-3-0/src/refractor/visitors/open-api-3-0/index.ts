import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { ObjectElement } from '@swagger-api/apidom-core';

import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor.ts';
import OpenApi3_0Element from '../../../elements/OpenApi3-0.ts';

/**
 * @public
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export interface OpenApi3_0VisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
class OpenApi3_0Visitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: OpenApi3_0Element;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'OpenApi']>;

  declare protected readonly canSupportSpecificationExtensions: true;

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
