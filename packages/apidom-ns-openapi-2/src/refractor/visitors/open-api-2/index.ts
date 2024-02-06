import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import SwaggerElement from '../../../elements/Swagger';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor';

export interface SwaggerVisitorOptions extends FixedFieldsVisitorOptions, FallbackVisitorOptions {}

class SwaggerVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: SwaggerElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'Swagger']>;

  protected declare readonly canSupportSpecificationExtensions: true;

  constructor(options: SwaggerVisitorOptions) {
    super(options);
    this.element = new SwaggerElement();
    this.specPath = always(['document', 'objects', 'Swagger']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default SwaggerVisitor;
