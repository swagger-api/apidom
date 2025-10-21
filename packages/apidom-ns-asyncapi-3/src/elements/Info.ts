import { Attributes, Meta } from '@swagger-api/apidom-core';
import { InfoElement } from '@swagger-api/apidom-ns-asyncapi-2';
import TagsElement from './Tags.ts';
import ExternalDocumentationElement from './ExternalDocumentation.ts';
import ReferenceElement from './Reference.ts';

/**
 * @public
 */
class Info extends InfoElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'info';
  }

  get tags(): TagsElement | undefined {
    return this.get('tags');
  }

  set tags(tags: TagsElement | undefined) {
    this.set('tags', tags);
  }

  get externalDocs(): ExternalDocumentationElement | ReferenceElement |  undefined {
    return this.get('externalDocs');
  }

  set externalDocs(externalDocs: ExternalDocumentationElement | ReferenceElement | undefined) {
    this.set('externalDocs', externalDocs);
  }
}

export default Info;
