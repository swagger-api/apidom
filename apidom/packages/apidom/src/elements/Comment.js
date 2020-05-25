'use strict';

const {StringElement} = require('minim');

/**
 * @class Comment
 *
 * @param {string} content
 * @param meta
 * @param attributes
 * @extends StringElement
 */
class Comment extends StringElement {
  constructor(...args) {
    super(...args);
    this.element = 'comment';
  }
}

module.exports = Comment;
