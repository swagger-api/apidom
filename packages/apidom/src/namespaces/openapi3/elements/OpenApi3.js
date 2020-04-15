'use strict';

const { ObjectElement } = require('minim');

/**
 * @class Openapi3
 *
 * @param {object} content
 * @param meta
 * @param attributes
 * @extends ObjectElement
 */
class Openapi3 extends ObjectElement {
    constructor(...args) {
        super(...args);
        this.element = 'openapi3';
    }

    get openapi() {
        return this.get('openapi');
    }

    get info() {
        return this.get('info');
    }
}

module.exports = Openapi3;
