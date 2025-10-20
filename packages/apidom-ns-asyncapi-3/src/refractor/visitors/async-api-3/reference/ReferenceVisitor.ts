import { ObjectElement } from '@swagger-api/apidom-core';

import Visitor from '../../Visitor.ts';

class ReferenceVisitor extends Visitor {
  enter(node: any) {
    const el = new ObjectElement();
    el.element = 'reference';
    if (node.$ref) el.set('$ref', node.$ref);
    this.element = el;
  }
}

export default ReferenceVisitor;
