import { Attributes, Meta, ObjectElement } from 'minim';
import ContactElement from './Contact';
import LicenseElement from './License';

class Info extends ObjectElement {
  constructor(content: Array<unknown>, meta: Meta, attributes: Attributes) {
    super(content, meta, attributes);
    this.element = 'info';
  }

  get title(): string {
    return this.get('title');
  }

  set title(title: string) {
    this.set('title', title);
  }

  get description(): string {
    return this.get('description');
  }

  set description(description: string) {
    this.set('description', description);
  }

  get summary(): string {
    return this.get('summary');
  }

  set summary(description: string) {
    this.set('summary', description);
  }

  get termsOfService(): string {
    return this.get('termsOfService');
  }

  set termsOfService(tos: string) {
    this.set('termsOfService', tos);
  }

  get version(): string {
    return this.get('version');
  }

  set version(version: string) {
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
