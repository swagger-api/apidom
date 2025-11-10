import { ObjectElement, StringElement, ArrayElement } from '@swagger-api/apidom-core';

/**
 * @public
 */
class Parameter extends ObjectElement {
  constructor(content: any = {}, meta?: any, attributes?: any) {
    super(content, meta, attributes);
    this.element = 'parameter';
  }

  get enum(): ArrayElement | undefined {
    return this.get('enum');
  }

  set enum(value: ArrayElement | undefined) {
    this.set('enum', value);
  }

  get default(): StringElement | undefined {
    return this.get('default');
  }

  set default(value: StringElement | undefined) {
    this.set('default', value);
  }

  get description(): StringElement | undefined {
    return this.get('description');
  }

  set description(value: StringElement | undefined) {
    this.set('description', value);
  }

  get examples(): ArrayElement | undefined {
    return this.get('examples');
  }

  set examples(value: ArrayElement | undefined) {
    this.set('examples', value);
  }

  get location(): StringElement | undefined {
    return this.get('location');
  }

  set location(value: StringElement | undefined) {
    this.set('location', value);
  }
}
export default Parameter;
