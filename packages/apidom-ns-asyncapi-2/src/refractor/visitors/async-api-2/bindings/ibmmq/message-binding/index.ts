import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import IbmmqMessageBindingElement from '../../../../../../elements/bindings/ibmmq/IbmmqMessageBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor';

export interface IbmmqMessageBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class IbmmqMessageBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: IbmmqMessageBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'ibmmq', 'MessageBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: IbmmqMessageBindingVisitorOptions) {
    super(options);
    this.element = new IbmmqMessageBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'ibmmq', 'MessageBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default IbmmqMessageBindingVisitor;
