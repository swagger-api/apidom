import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';
import { ComponentsElement } from '@swagger-api/apidom-ns-asyncapi-2';

import TagsElement from './Tags.ts';

/**
 * @public
 */
class Components extends ComponentsElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'components';
  }

  get operations(): ObjectElement | undefined {
    return this.get('operations');
  }

  set operations(operations: ObjectElement | undefined) {
    this.set('operations', operations);
  }

  get replies(): ObjectElement | undefined {
    return this.get('reply');
  }

  set replies(replies: ObjectElement | undefined) {
    this.set('reply', replies);
  }

  get replyAddresses(): ObjectElement | undefined {
    return this.get('replyAddresses');
  }

  set replyAddresses(replyAddresses: ObjectElement | undefined) {
    this.set('replyAddresses', replyAddresses);
  }

  get externalDocs(): ObjectElement | undefined {
    return this.get('externalDocs');
  }

  set externalDocs(externalDocs: ObjectElement | undefined) {
    this.set('externalDocs', externalDocs);
  }

  get tags(): TagsElement | undefined {
    return this.get('tags');
  }

  set tags(tags: TagsElement | undefined) {
    this.set('tags', tags);
  }
}

export default Components;
