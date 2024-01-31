import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import SchemaElement from '../../../../elements/Schema';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';

class SchemaVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: SchemaElement;

  public declare readonly specPath: SpecPath<['document', 'objects', 'Schema']>;

  public declare readonly canSupportSpecificationExtensions: true;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new SchemaElement();
    this.specPath = always(['document', 'objects', 'Schema']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default SchemaVisitor;
