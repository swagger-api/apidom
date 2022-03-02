import { Attributes, Meta } from 'minim';
import { StringElement, ObjectElement, ArrayElement } from '@swagger-api/apidom-core';

import ServerElement from './Server';
import OperationElement from './Operation';

class PathItem extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'pathItem';
  }

  get $ref(): StringElement {
    return this.get('$ref');
  }

  get summary(): StringElement {
    return this.get('summary');
  }

  get description(): StringElement {
    return this.get('description');
  }

  get GET(): OperationElement {
    return this.get('get');
  }

  get PUT(): OperationElement {
    return this.get('put');
  }

  get POST(): OperationElement {
    return this.get('post');
  }

  get DELETE(): OperationElement {
    return this.get('delete');
  }

  get OPTIONS(): OperationElement {
    return this.get('options');
  }

  get HEAD(): OperationElement {
    return this.get('head');
  }

  get PATCH(): OperationElement {
    return this.get('patch');
  }

  get TRACE(): OperationElement {
    return this.get('trace');
  }

  get servers(): ServerElement[] {
    return this.get('servers');
  }

  get parameters(): ArrayElement {
    return this.get('parameters');
  }
}
export default PathItem;
