import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import SolaceMessageBindingElement from '../../../../../../elements/bindings/solace/SolaceMessageBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface SolaceMessageBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class SolaceMessageBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: SolaceMessageBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'solace', 'MessageBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: SolaceMessageBindingVisitor) {
    super(options);
    this.element = new SolaceMessageBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'solace', 'MessageBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default SolaceMessageBindingVisitor;
