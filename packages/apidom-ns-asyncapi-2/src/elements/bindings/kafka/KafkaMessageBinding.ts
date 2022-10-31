import { StringElement, ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

import SchemaElement from '../../Schema';
import ReferenceElement from '../../Reference';

class KafkaMessageBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'kafkaMessageBinding';
    this.classes.push('message-binding');
  }

  get key(): SchemaElement | ReferenceElement | undefined {
    return this.get('key');
  }

  set key(key: SchemaElement | ReferenceElement | undefined) {
    this.set('key', key);
  }

  get bindingVersion(): StringElement | undefined {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement | undefined) {
    this.set('bindingVersion', bindingVersion);
  }
}

export default KafkaMessageBinding;
