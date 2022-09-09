import { StringElement, ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';
import { ContactElement } from '@swagger-api/apidom-ns-openapi-3-0';

import LicenseElement from './License';

class Info extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'info';
    this.classes.push('info');
  }

  get title(): StringElement {
    return this.get('title');
  }

  set title(title: StringElement) {
    this.set('title', title);
  }

  get description(): StringElement {
    return this.get('description');
  }

  set description(description: StringElement) {
    this.set('description', description);
  }

  get summary(): StringElement {
    return this.get('summary');
  }

  set summary(description: StringElement) {
    this.set('summary', description);
  }

  get termsOfService(): StringElement {
    return this.get('termsOfService');
  }

  set termsOfService(tos: StringElement) {
    this.set('termsOfService', tos);
  }

  get version(): StringElement {
    return this.get('version');
  }

  set version(version: StringElement) {
    this.set('version', version);
  }

  get license(): LicenseElement {
    return this.get('license');
  }

  set license(licenseElement: LicenseElement) {
    this.set('license', licenseElement);
  }

  get contact(): ContactElement {
    return this.get('contact');
  }

  set contact(contactElement: ContactElement) {
    this.set('contact', contactElement);
  }
}

export default Info;
