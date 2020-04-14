'use strict';

const { ObjectElement } = require('minim');

/**
 * @class Contact
 *
 * @param {object} content
 * @param meta
 * @param attributes
 * @extends ObjectElement
 */
class Contact extends ObjectElement {
    constructor(...args) {
        super(...args);
        this.element = 'contact';
    }

    get name() {
        return this.get('name');
    }

    get url() {
        return this.get('url');
    }

    get email() {
        return this.get('email');
    }

    set name(name) {
        return this.set('name', name);
    }

    set url(url) {
        return this.set('url', url);
    }

    set email(email) {
        return this.set('email', email);
    }
}

module.exports = Contact;
