import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import SchemaElement from '../../../../elements/Schema.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

export interface SchemaVisitorOptions extends FixedFieldsVisitorOptions, FallbackVisitorOptions {}

class SchemaVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: SchemaElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'Schema']>;

  protected declare readonly canSupportSpecificationExtensions: true;

  constructor(options: SchemaVisitorOptions) {
    super(options);
    this.element = new SchemaElement();
    this.specPath = always(['document', 'objects', 'Schema']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default SchemaVisitor;
