import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import OperationBindingsElement from '../../../../elements/OperationBindings.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface OperationBindingsVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class OperationBindingsVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: OperationBindingsElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'OperationBindings']>;

  declare protected readonly canSupportSpecificationExtensions: true;

  constructor(options: OperationBindingsVisitorOptions) {
    super(options);
    this.element = new OperationBindingsElement();
    this.specPath = always(['document', 'objects', 'OperationBindings']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default OperationBindingsVisitor;
