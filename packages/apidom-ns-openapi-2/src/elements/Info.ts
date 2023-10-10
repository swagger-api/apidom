import { StringElement, ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

import ContactElement from './Contact';
import LicenseElement from './License';

class Info extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'info';
    this.classes.push('info');
  }

  get title(): StringElement | undefined {
    return this.get('title');
  }

  set title(title: StringElement | undefined) {
    this.set('title', title);
  }

  get description(): StringElement | undefined {
    return this.get('description');
  }

  set description(description: StringElement | undefined) {
    this.set('description', description);
  }

  get termsOfService(): StringElement | undefined {
    return this.get('termsOfService');
  }

  set termsOfService(tos: StringElement | undefined) {
    this.set('termsOfService', tos);
  }

  get contact(): ContactElement | undefined {
    return this.get('contact');
  }

  set contact(contactElement: ContactElement | undefined) {
    this.set('contact', contactElement);
  }

  get license(): LicenseElement | undefined {
    return this.get('license');
  }

  set license(licenseElement: LicenseElement | undefined) {
    this.set('license', licenseElement);
  }

  get version(): StringElement | undefined {
    return this.get('version');
  }

  set version(version: StringElement | undefined) {
    this.set('version', version);
  }
}

export default Info;
