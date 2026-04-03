import {
  StringElement,
  ObjectElement,
  NumberElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

import SchemaElement from '../../Schema.ts';
import ReferenceElement from '../../Reference.ts';

/**
 * @public
 */
class MqttMessageBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'mqttMessageBinding';
    this.classes.push('message-binding');
  }

  get payloadFormatIndicator(): NumberElement | undefined {
    return this.get('payloadFormatIndicator');
  }

  set payloadFormatIndicator(payloadFormatIndicator: NumberElement | undefined) {
    this.set('payloadFormatIndicator', payloadFormatIndicator);
  }

  get correlationData(): SchemaElement | ReferenceElement | undefined {
    return this.get('correlationData');
  }

  set correlationData(correlationData: SchemaElement | ReferenceElement | undefined) {
    this.set('correlationData', correlationData);
  }

  get contentType(): StringElement | undefined {
    return this.get('contentType');
  }

  set contentType(contentType: StringElement | undefined) {
    this.set('contentType', contentType);
  }

  get responseTopic(): StringElement | SchemaElement | ReferenceElement | undefined {
    return this.get('responseTopic');
  }

  set responseTopic(responseTopic: StringElement | SchemaElement | ReferenceElement | undefined) {
    this.set('responseTopic', responseTopic);
  }

  get bindingVersion(): StringElement | undefined {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement | undefined) {
    this.set('bindingVersion', bindingVersion);
  }
}

export default MqttMessageBinding;
