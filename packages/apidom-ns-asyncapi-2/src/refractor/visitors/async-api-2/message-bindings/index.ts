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
  declare public readonly element: MessageBindingsElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'MessageBindings']>;

  declare protected readonly canSupportSpecificationExtensions: true;

  constructor(options: MessageBindingsVisitorOptions) {
    super(options);
    this.element = new MessageBindingsElement();
    this.specPath = always(['document', 'objects', 'MessageBindings']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default MessageBindingsVisitor;
