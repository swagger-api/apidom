import {
  specificationObj as AsyncApi2Specification,
  MessageExampleVisitorOptions,
  MessageExampleVisitor as MessageExampleVisitorType,
} from '@swagger-api/apidom-ns-asyncapi-2';

import MessageExampleElement from '../../../../elements/MessageExample.ts';

export const BaseMessageExampleVisitor: typeof MessageExampleVisitorType =
  AsyncApi2Specification.visitors.document.objects.MessageExample.$visitor;

export type { MessageExampleVisitorOptions };

/**
 * @public
 */
class MessageExampleVisitor extends BaseMessageExampleVisitor {
  declare public readonly element: MessageExampleElement;

  constructor(options: MessageExampleVisitorOptions) {
    super(options);
    this.element = new MessageExampleElement();
  }
}

export default MessageExampleVisitor;