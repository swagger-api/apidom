import { Attributes, BooleanElement, Meta, ObjectElement, StringElement } from 'minim';
import ParameterElement from './Parameter';
import ReferenceElement from './Reference';
import ServerElement from './Server';

class Operation extends ObjectElement {
  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'operation';
  }

  get tags(): StringElement[] {
    return this.get('tags');
  }

  set tags(tags: StringElement[]) {
    this.set('tags', tags);
  }

  get summary(): StringElement {
    return this.get('summary');
  }

  set summary(description: StringElement) {
    this.set('summary', description);
  }

  get description(): StringElement {
    return this.get('description');
  }

  set description(description: StringElement) {
    this.set('description', description);
  }

  get operationId(): StringElement {
    return this.get('operationId');
  }

  set operationId(operationId: StringElement) {
    this.set('operationId', operationId);
  }

  get deprecated(): BooleanElement {
    if (this.hasKey('deprecated')) {
      return this.get('deprecated');
    }
    return new BooleanElement(false);
  }

  set deprecated(deprecated: BooleanElement) {
    this.set('deprecated', deprecated);
  }

  get parameters(): ParameterElement | ReferenceElement {
    return this.get('parameters');
  }

  set parameters(parameters: ParameterElement | ReferenceElement) {
    this.set('parameters', parameters);
  }

  get servers(): ServerElement[] {
    return this.get('severs');
  }

  set servers(servers: ServerElement[]) {
    this.set('servers', servers);
  }

  // TODO(vladimir.gorej@gmail.com): need to implement the rest of the fileds
}

export default Operation;
