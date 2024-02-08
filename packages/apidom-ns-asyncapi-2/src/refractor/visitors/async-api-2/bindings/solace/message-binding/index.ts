import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import SolaceMessageBindingElement from '../../../../../../elements/bindings/solace/SolaceMessageBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor';

export interface SolaceMessageBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class SolaceMessageBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: SolaceMessageBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'solace', 'MessageBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: SolaceMessageBindingVisitor) {
    super(options);
    this.element = new SolaceMessageBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'solace', 'MessageBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default SolaceMessageBindingVisitor;
