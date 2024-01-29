import { Element } from '@swagger-api/apidom-core';

export interface ParentSchemaAwareVisitorOptions {
  readonly parent: Element;
  readonly passingOptionsNames?: string[];
}

class ParentSchemaAwareVisitor {
  public parent!: Element;

  public passingOptionsNames: string[];

  constructor({ parent, passingOptionsNames = [] }: ParentSchemaAwareVisitorOptions) {
    this.parent = parent;
    this.passingOptionsNames = [...passingOptionsNames, 'parent'];
  }
}

export default ParentSchemaAwareVisitor;
