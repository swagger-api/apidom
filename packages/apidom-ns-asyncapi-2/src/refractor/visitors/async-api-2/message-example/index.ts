import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MessageExampleElement from '../../../../elements/MessageExample.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface MessageExampleVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class MessageExampleVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: MessageExampleElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'MessageExample']>;

  declare protected readonly canSupportSpecificationExtensions: true;

  constructor(options: MessageExampleVisitorOptions) {
    super(options);
    this.element = new MessageExampleElement();
    this.specPath = always(['document', 'objects', 'MessageExample']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default MessageExampleVisitor;
