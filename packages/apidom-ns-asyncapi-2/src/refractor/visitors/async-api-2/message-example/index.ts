import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MessageExampleElement from '../../../../elements/MessageExample';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';

export interface MessageExampleVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class MessageExampleVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: MessageExampleElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'MessageExample']>;

  protected declare readonly canSupportSpecificationExtensions: true;

  constructor(options: MessageExampleVisitorOptions) {
    super(options);
    this.element = new MessageExampleElement();
    this.specPath = always(['document', 'objects', 'MessageExample']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default MessageExampleVisitor;
