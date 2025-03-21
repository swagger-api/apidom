import { ObjectElement, ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';

import ArazzoSpecElement from './ArazzoSpec.ts';
import InfoElement from './Info.ts';
import ComponentsElement from './Components.ts';

/**
 * @public
 */
class ArazzoSpecification1 extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'arazzoSpecification1';
    this.classes.push('api');
    this.classes.push('arazzo');
  }

  get arazzoSpec(): ArazzoSpecElement | undefined {
    return this.get('arazzoSpec');
  }

  set arazzoSpec(arazzoSpec: ArazzoSpecElement | undefined) {
    this.set('arazzoSpec', arazzoSpec);
  }

  get info(): InfoElement | undefined {
    return this.get('info');
  }

  set info(info: InfoElement | undefined) {
    this.set('info', info);
  }

  get sourceDescriptions(): ArrayElement | undefined {
    return this.get('sourceDescriptions');
  }

  set sourceDescriptions(sourceDescriptions: ArrayElement | undefined) {
    this.set('sourceDescriptions', sourceDescriptions);
  }

  get workflows(): ArrayElement | undefined {
    return this.get('workflows');
  }

  set workflows(workflows: ArrayElement | undefined) {
    this.set('workflows', workflows);
  }

  get components(): ComponentsElement | undefined {
    return this.get('components');
  }

  set components(components: ComponentsElement | undefined) {
    this.set('components', components);
  }
}

export default ArazzoSpecification1;
