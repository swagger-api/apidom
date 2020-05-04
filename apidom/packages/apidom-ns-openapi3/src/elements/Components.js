'use strict';

const { ObjectElement } = require('minim');

/**
 * @class Components
 *
 * @param {object} content
 * @param meta
 * @param attributes
 * @extends ObjectElement
 */
class Components extends ObjectElement {
    constructor(...args) {
        super(...args);
        this.element = 'components';
    }

    get schemas() {
        return this.get('schemas');
    }
}

module.exports = Components;
