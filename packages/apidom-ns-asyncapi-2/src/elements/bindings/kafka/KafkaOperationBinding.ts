import { StringElement, ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

import SchemaElement from '../../Schema';
import ReferenceElement from '../../Reference';

class KafkaOperationBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'kafkaOperationBinding';
    this.classes.push('operation-binding');
  }

  get groupId(): SchemaElement | ReferenceElement | undefined {
    return this.get('groupId');
  }

  set groupId(groupId: SchemaElement | ReferenceElement | undefined) {
    this.set('groupId', groupId);
  }

  get clientId(): SchemaElement | ReferenceElement | undefined {
    return this.get('clientId');
  }

  set clientId(clientId: SchemaElement | ReferenceElement | undefined) {
    this.set('clientId', clientId);
  }

  get bindingVersion(): StringElement | undefined {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement | undefined) {
    this.set('bindingVersion', bindingVersion);
  }
}

export default KafkaOperationBinding;
