import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import SqsMessageBindingElement from '../../../../../../elements/bindings/sqs/SqsMessageBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor';

export interface SqsMessageBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class SqsMessageBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: SqsMessageBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'sqs', 'MessageBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: SqsMessageBindingVisitorOptions) {
    super(options);
    this.element = new SqsMessageBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'sqs', 'MessageBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default SqsMessageBindingVisitor;
