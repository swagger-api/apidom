import Visitor from '../Visitor.ts';
import { ObjectElement } from '@swagger-api/apidom-core';

class ChannelVisitor extends Visitor {
  enter(node: any) {
    const el = new ObjectElement();
    el.element = 'channelItem';
    this.element = el;
  }
}

export default ChannelVisitor;
