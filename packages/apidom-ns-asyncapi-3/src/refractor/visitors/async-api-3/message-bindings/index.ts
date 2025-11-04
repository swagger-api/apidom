import {
  specificationObj as AsyncApi2Specification,
  MessageBindingsVisitorOptions,
  MessageBindingsVisitor as MessageBindingsVisitorType,
} from '@swagger-api/apidom-ns-asyncapi-2';

import MessageBindingsElement from '../../../../elements/MessageBindings.ts';

export const BaseMessageBindingsVisitor: typeof MessageBindingsVisitorType =
  AsyncApi2Specification.visitors.document.objects.MessageBindings.$visitor;

export type { MessageBindingsVisitorOptions };

/**
 * @public
 */
class MessageBindingsVisitor extends BaseMessageBindingsVisitor {
  declare public readonly element: MessageBindingsElement;

  constructor(options: MessageBindingsVisitorOptions) {
    super(options);
    this.element = new MessageBindingsElement();
  }
}

export default MessageBindingsVisitor;