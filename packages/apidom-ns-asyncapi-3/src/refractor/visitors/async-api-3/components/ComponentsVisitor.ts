import { ObjectElement } from '@swagger-api/apidom-core';

import Visitor from '../../Visitor.ts';

class ComponentsVisitor extends Visitor {
  enter(node: any) {
    const el = new ObjectElement();
    el.element = 'components';

    this.element = el;
  }
}

export default ComponentsVisitor;
