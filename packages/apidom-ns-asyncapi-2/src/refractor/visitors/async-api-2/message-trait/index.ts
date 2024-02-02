import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MessageTraitElement from '../../../../elements/MessageTrait';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';

class MessageTraitVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: MessageTraitElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'MessageTrait']>;

  protected declare readonly canSupportSpecificationExtensions: true;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new MessageTraitElement();
    this.specPath = always(['document', 'objects', 'MessageTrait']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default MessageTraitVisitor;
