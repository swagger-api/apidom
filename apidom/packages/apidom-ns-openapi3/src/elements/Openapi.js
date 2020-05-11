'use strict';

const {StringElement} = require('minim');

/**
 * @class Openapi *
 * @param {string} content
 * @param meta
 * @param attributes
 *
 * @extends StringElement
 */
class Openapi extends StringElement {
  constructor(...args) {
    super(...args);
    this.element = 'openapi';
  }
}

module.exports = Openapi;
