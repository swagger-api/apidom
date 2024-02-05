import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MercureChannelBindingElement from '../../../../../../elements/bindings/mercure/MercureChannelBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor';

export interface MercureChannelBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class MercureChannelBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: MercureChannelBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'mercure', 'ChannelBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: MercureChannelBindingVisitorOptions) {
    super(options);
    this.element = new MercureChannelBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'mercure', 'ChannelBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default MercureChannelBindingVisitor;
