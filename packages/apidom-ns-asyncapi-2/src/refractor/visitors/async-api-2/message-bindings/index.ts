import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MessageBindingsElement from '../../../../elements/MessageBindings.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface MessageBindingsVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class MessageBindingsVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: MessageBindingsElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'MessageBindings']>;

  protected declare readonly canSupportSpecificationExtensions: true;

  constructor(options: MessageBindingsVisitorOptions) {
    super(options);
    this.element = new MessageBindingsElement();
    this.specPath = always(['document', 'objects', 'MessageBindings']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default MessageBindingsVisitor;
