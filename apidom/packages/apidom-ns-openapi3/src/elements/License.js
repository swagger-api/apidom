'use strict';

const {ObjectElement} = require('minim');

/**
 * @class License
 *
 * @param {object} content
 * @param meta
 * @param attributes
 * @extends ObjectElement
 */
class License extends ObjectElement {
  constructor(...args) {
    super(...args);
    this.element = 'license';
  }

  get name() {
    return this.get('name');
  }

  get url() {
    return this.get('url');
  }

  set name(name) {
    return this.set('name', name);
  }

  set url(url) {
    return this.set('url', url);
  }
}

module.exports = License;
