'use strict';

const { ObjectElement } = require('minim');

/**
 * @class Schemas
 *
 * @param {object} content
 * @param meta
 * @param attributes
 * @extends ObjectElement
 */
class Schemas extends ObjectElement {
    constructor(...args) {
        super(...args);
        this.element = 'schemas';
    }
}

module.exports = Schemas;
