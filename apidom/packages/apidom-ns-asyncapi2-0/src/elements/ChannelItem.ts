import { Attributes, Meta, ObjectElement, StringElement } from 'minim';

class ChannelItem extends ObjectElement {
  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'channelItem';
  }

  get $ref(): StringElement {
    return this.get('$ref');
  }

  set $ref($ref: StringElement) {
    this.set('$ref', $ref);
  }

  get description(): StringElement {
    return this.get('description');
  }

  set description(description: StringElement) {
    this.set('description', description);
  }
}

export default ChannelItem;
