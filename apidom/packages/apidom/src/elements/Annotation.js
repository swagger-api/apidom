'use strict';

const {StringElement} = require('minim');

/**
 * @class Annotation
 *
 * @param {string} content
 * @param meta
 * @param attributes
 * @extends StringElement
 */
class Annotation extends StringElement {
  constructor(...args) {
    super(...args);
    this.element = 'annotation';
  }

  get code() {
    return this.attributes.get('code');
  }

  set code(value) {
    return this.attributes.set('code', value);
  }
}

module.exports = Annotation;
