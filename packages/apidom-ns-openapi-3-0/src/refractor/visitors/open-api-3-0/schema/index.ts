import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import SchemaElement from '../../../../elements/Schema.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface SchemaVisitorOptions extends FixedFieldsVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class SchemaVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: SchemaElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'Schema']>;

  declare protected readonly canSupportSpecificationExtensions: true;

  constructor(options: SchemaVisitorOptions) {
    super(options);
    this.element = new SchemaElement();
    this.specPath = always(['document', 'objects', 'Schema']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default SchemaVisitor;
