import { Attributes, Meta } from '@swagger-api/apidom-core';
import ExternalDocumentationElement from './ExternalDocumentation.ts';
import ReferenceElement from './Reference.ts';
import { TagElement } from '@swagger-api/apidom-ns-asyncapi-2';

/**
 * @public
 */
class Tag extends TagElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'tag';
  }

  get externalDocs(): ExternalDocumentationElement | ReferenceElement | undefined | any {
    return this.get('externalDocs');
  }

  set externalDocs(externalDocs: ExternalDocumentationElement | ReferenceElement | undefined | any) {
    this.set('externalDocs', externalDocs);
  }
}

export default Tag;
