'use strict';

const {ObjectElement} = require('minim');

/**
 * @class OpenApi3
 *
 * @param {object} content
 * @param meta
 * @param attributes
 * @extends ObjectElement
 */
class OpenApi3 extends ObjectElement {
  constructor(...args) {
    super(...args);
    this.element = 'openapi3';
    this.classes.push('api');
  }

  get openapi() {
    return this.get('openapi');
  }

  get info() {
    return this.get('info');
  }
}

module.exports = OpenApi3;
