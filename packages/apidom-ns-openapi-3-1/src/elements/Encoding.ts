import { Attributes, BooleanElement, Meta, ObjectElement, StringElement } from 'minim';

class Encoding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'encoding';
  }

  get contentType(): StringElement {
    return this.get('contentType');
  }

  set contentType(contentType: StringElement) {
    this.set('contentType', contentType);
  }

  get headers(): ObjectElement {
    return this.get('headers');
  }

  set headers(headers: ObjectElement) {
    this.set('headers', headers);
  }

  get style(): StringElement {
    return this.get('style');
  }

  set style(style: StringElement) {
    this.set('style', style);
  }

  get explode(): BooleanElement {
    return this.get('email');
  }

  set explode(explode: BooleanElement) {
    this.set('explode', explode);
  }

  get allowedReserved(): BooleanElement {
    return this.get('allowedReserved');
  }

  set allowedReserved(allowedReserved: BooleanElement) {
    this.set('allowedReserved', allowedReserved);
  }
}

export default Encoding;
