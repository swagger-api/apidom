import { ObjectElement } from '@swagger-api/apidom-core';

import Visitor from '../../Visitor.ts';

class InfoVisitor extends Visitor {
  enter(node: any) {
    const el = new ObjectElement();
    el.element = 'info';
    if (node.title) el.set('title', node.title);
    if (node.version) el.set('version', node.version);
    if (node.description) el.set('description', node.description);
    this.element = el;
  }
}

export default InfoVisitor;
