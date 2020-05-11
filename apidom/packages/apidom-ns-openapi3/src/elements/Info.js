'use strict';

const {ObjectElement} = require('minim');

/**
 * @class Info
 *
 * @param {object} content
 * @param meta
 * @param attributes
 * @extends ObjectElement
 */
class Info extends ObjectElement {
  constructor(...args) {
    super(...args);
    this.element = 'info';
  }

  get title() {
    return this.get('title');
  }

  get description() {
    return this.get('description');
  }

  get termsOfService() {
    return this.get('termsOfService');
  }

  get version() {
    return this.get('version');
  }

  get license() {
    return this.get('license');
  }

  get contact() {
    return this.get('contact');
  }

  set title(title) {
    return this.set('title', title);
  }

  set description(description) {
    return this.set('description', description);
  }

  set termsOfService(tos) {
    return this.set('termsOfService', tos);
  }

  set version(version) {
    return this.set('version', version);
  }

  set license(licenseElement) {
    return this.set('license', licenseElement);
  }

  set contact(contactElement) {
    return this.set('contact', contactElement);
  }
}

module.exports = Info;
