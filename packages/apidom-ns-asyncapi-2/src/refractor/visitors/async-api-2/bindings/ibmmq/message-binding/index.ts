import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import IbmmqMessageBindingElement from '../../../../../../elements/bindings/ibmmq/IbmmqMessageBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../../../FallbackVisitor';

class IbmmqMessageBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: IbmmqMessageBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'ibmmq', 'MessageBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new IbmmqMessageBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'ibmmq', 'MessageBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default IbmmqMessageBindingVisitor;
