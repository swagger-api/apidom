import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MercureMessageBindingElement from '../../../../../../elements/bindings/mercure/MercureMessageBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../../../FallbackVisitor';

class MercureMessageBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: MercureMessageBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'mercure', 'MessageBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new MercureMessageBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'mercure', 'MessageBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default MercureMessageBindingVisitor;
