import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import IbmmqChannelBindingElement from '../../../../../../elements/bindings/ibmmq/IbmmqChannelBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../../../FallbackVisitor';

class IbmmqChannelBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: IbmmqChannelBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'ibmmq', 'ChannelBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new IbmmqChannelBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'ibmmq', 'ChannelBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default IbmmqChannelBindingVisitor;
