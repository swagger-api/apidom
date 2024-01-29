import { Element } from '@swagger-api/apidom-core';

export interface ParentSchemaAwareVisitorOptions {
  readonly parent: Element;
}

class ParentSchemaAwareVisitor {
  public parent: Element;

  constructor({ parent }: ParentSchemaAwareVisitorOptions) {
    this.parent = parent;
  }
}

export default ParentSchemaAwareVisitor;
