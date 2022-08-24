import { StringElement, ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class ExternalDocumentation extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'externalDocumentation';
  }

  get description(): StringElement | undefined {
    return this.get('description');
  }

  set description(description: StringElement | undefined) {
    this.set('description', description);
  }

  get url(): StringElement | undefined {
    return this.get('url');
  }

  set url(url: StringElement | undefined) {
    this.set('url', url);
  }
}

export default ExternalDocumentation;
