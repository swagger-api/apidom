import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import SnsMessageBindingElement from '../../../../../../elements/bindings/sns/SnsMessageBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor';

export interface SnsMessageBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class SnsMessageBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: SnsMessageBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'sns', 'MessageBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: SnsMessageBindingVisitorOptions) {
    super(options);
    this.element = new SnsMessageBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'sns', 'MessageBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default SnsMessageBindingVisitor;
