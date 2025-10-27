import {
  specificationObj as AsyncApi2Specification,
  ChannelsVisitorOptions,
  ChannelsVisitor as ChannelsVisitorType,
} from '@swagger-api/apidom-ns-asyncapi-2';

import ChannelsElement from '../../../../elements/Channels.ts';

export const BaseChannelsVisitor: typeof ChannelsVisitorType =
  AsyncApi2Specification.visitors.document.objects.Channels.$visitor;

export type { ChannelsVisitorOptions };

class ChannelsVisitor extends BaseChannelsVisitor {
  declare public readonly element: ChannelsElement;

  constructor(options: ChannelsVisitorOptions) {
    super(options);
    this.element = new ChannelsElement();
  }
}

export default ChannelsVisitor;
