import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MercureMessageBindingElement from '../../../../../../elements/bindings/mercure/MercureMessageBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor';

export interface MercureMessageBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class MercureMessageBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: MercureMessageBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'mercure', 'MessageBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: MercureMessageBindingVisitorOptions) {
    super(options);
    this.element = new MercureMessageBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'mercure', 'MessageBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default MercureMessageBindingVisitor;
