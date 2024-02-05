import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import SolaceChannelBindingElement from '../../../../../../elements/bindings/solace/SolaceChannelBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor';

export interface SolaceChannelBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class SolaceChannelBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: SolaceChannelBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'solace', 'ChannelBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: SolaceChannelBindingVisitorOptions) {
    super(options);
    this.element = new SolaceChannelBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'solace', 'ChannelBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default SolaceChannelBindingVisitor;
