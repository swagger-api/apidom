import {
  StringElement,
  ObjectElement,
  ArrayElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

import InfoElement from './Info.ts';

class Main extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'main';
    this.classes.push('api');
  }

  get version(): StringElement | undefined {
    return this.get('version');
  }

  set version(version: StringElement | undefined) {
    this.set('version', version);
  }

  get info(): InfoElement | undefined {
    return this.get('info');
  }

  set info(info: InfoElement | undefined) {
    this.set('info', info);
  }

  get principles(): ArrayElement | undefined {
    return this.get('principles');
  }

  set principles(principles: ArrayElement | undefined) {
    this.set('principles', principles);
  }

  get standards(): ArrayElement | undefined {
    return this.get('standards');
  }

  set standards(standards: ArrayElement | undefined) {
    this.set('standards', standards);
  }

  get scenarios(): ArrayElement | undefined {
    return this.get('scenarios');
  }

  set scenarios(scenarios: ArrayElement | undefined) {
    this.set('scenarios', scenarios);
  }
}

export default Main;
