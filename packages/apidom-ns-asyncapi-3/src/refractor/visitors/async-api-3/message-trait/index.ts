import {
  specificationObj as AsyncApi2Specification,
  MessageTraitVisitorOptions,
  MessageTraitVisitor as MessageTraitVisitorType,
} from '@swagger-api/apidom-ns-asyncapi-2';

import MessageTraitElement from '../../../../elements/MessageTrait.ts';

export const BaseMessageTraitVisitor: typeof MessageTraitVisitorType =
  AsyncApi2Specification.visitors.document.objects. MessageTrait.$visitor;

export type { MessageTraitVisitorOptions };

class MessageTraitVisitor extends BaseMessageTraitVisitor {
  declare public readonly element: MessageTraitElement;

  constructor(options: MessageTraitVisitorOptions) {
    super(options);
    this.element = new MessageTraitElement();
  }
}

export default MessageTraitVisitor;