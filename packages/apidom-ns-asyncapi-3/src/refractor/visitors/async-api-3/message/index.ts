import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MessageElement from '../../../../elements/Message.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface MessageVisitorOptions extends FixedFieldsVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class MessageVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: MessageElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'Message']>;

  declare protected readonly canSupportSpecificationExtensions: true;

  constructor(options: MessageVisitorOptions) {
    super(options);
    this.element = new MessageElement();
    this.specPath = always(['document', 'objects', 'Message']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default MessageVisitor;
