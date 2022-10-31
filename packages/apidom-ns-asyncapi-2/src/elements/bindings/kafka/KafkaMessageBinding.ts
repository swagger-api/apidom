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

  get schemaIdLocation(): StringElement | undefined {
    return this.get('schemaIdLocation');
  }

  set schemaIdLocation(schemaIdLocation: StringElement | undefined) {
    this.set('schemaIdLocation', schemaIdLocation);
  }

  get schemaIdPayloadEncoding(): StringElement | undefined {
    return this.get('schemaIdPayloadEncoding');
  }

  set schemaIdPayloadEncoding(schemaIdPayloadEncoding: StringElement | undefined) {
    this.set('schemaIdPayloadEncoding', schemaIdPayloadEncoding);
  }

  get schemaLookupStrategy(): StringElement | undefined {
    return this.get('schemaLookupStrategy');
  }

  set schemaLookupStrategy(schemaLookupStrategy: StringElement | undefined) {
    this.set('schemaLookupStrategy', schemaLookupStrategy);
  }

  get bindingVersion(): StringElement | undefined {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement | undefined) {
    this.set('bindingVersion', bindingVersion);
  }
}

export default KafkaMessageBinding;
