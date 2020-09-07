import { Attributes, Meta, ObjectElement, StringElement } from 'minim';
import ParameterElement from './Parameter';
import ReferenceElement from './Reference';

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

  get parameters(): ParameterElement | ReferenceElement {
    return this.get('parameters');
  }

  set parameters(parameters: ParameterElement | ReferenceElement) {
    this.set('parameters', parameters);
  }

  // TODO(vladimir.gorej@gmail.com): need to implement the rest of the fileds
}

export default Operation;
