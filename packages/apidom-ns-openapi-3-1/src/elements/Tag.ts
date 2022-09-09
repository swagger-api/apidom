import { ObjectElement, StringElement, Attributes, Meta } from '@swagger-api/apidom-core';
import { ExternalDocumentationElement } from '@swagger-api/apidom-ns-openapi-3-0';

class Tag extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'tag';
  }

  get name(): StringElement {
    return this.get('name');
  }

  set name(name: StringElement) {
    this.set('name', name);
  }

  get description(): StringElement {
    return this.get('description');
  }

  set description(description: StringElement) {
    this.set('description', description);
  }

  get externalDocs(): ExternalDocumentationElement {
    return this.get('externalDocs');
  }

  set externalDocs(externalDocs: ExternalDocumentationElement) {
    this.set('externalDocs', externalDocs);
  }
}

export default Tag;
