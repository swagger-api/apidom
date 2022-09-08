import { StringElement } from '@swagger-api/apidom-core';
import { ReferenceElement } from '@swagger-api/apidom-ns-openapi-3-0';

class Reference extends ReferenceElement {}

Object.defineProperty(Reference.prototype, 'description', {
  get(): StringElement | undefined {
    return this.get('description');
  },
  set(description: StringElement | undefined) {
    this.set('description', description);
  },
  enumerable: true,
});

Object.defineProperty(Reference.prototype, 'summary', {
  get(): StringElement | undefined {
    return this.get('summary');
  },
  set(description: StringElement | undefined) {
    this.set('summary', description);
  },
  enumerable: true,
});

export default Reference;
