'use strict';

const {ObjectElement} = require('minim');

/**
 * @class Schema
 *
 * @param {object} content
 * @param meta
 * @param attributes
 * @extends ObjectElement
 */
class Schema extends ObjectElement {
  constructor(...args) {
    super(...args);
    this.element = 'schema';
  }
}

module.exports = Schema;
