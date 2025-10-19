import { Element } from '@swagger-api/apidom-core';

export type VisitorOptions = unknown;

class Visitor {
  element?: Element;
  constructor(options?: VisitorOptions) {
    // placeholder
  }
  enter(_node: unknown): void {
    // default no-op
  }
  leave() {
    return this.element;
  }
}

export default Visitor;
