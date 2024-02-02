import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MercureChannelBindingElement from '../../../../../../elements/bindings/mercure/MercureChannelBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../../../FallbackVisitor';

class MercureChannelBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: MercureChannelBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'mercure', 'ChannelBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new MercureChannelBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'mercure', 'ChannelBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default MercureChannelBindingVisitor;
