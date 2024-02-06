import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import SchemaElement from '../../../../elements/Schema';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';

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
