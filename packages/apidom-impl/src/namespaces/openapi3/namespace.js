'use strict';

const minim = require('minim');

const OpenApi3 = require('./elements/OpenApi3');
const Openapi = require('./elements/Openapi');
const Info = require('./elements/Info');
const License = require('./elements/License');
const Contact = require('./elements/Contact');
const pojoParser = require('./parsers/pojo');

class Namespace extends minim.Namespace {
    constructor() {
        super();

        this.register('openApi3', OpenApi3);
        this.register('openapi', Openapi);
        this.register('info', Info);
        this.register('license', License);
        this.register('contact', Contact);
    }

    of(pojo) {
        return pojoParser.parse(this)(pojo);
    }
}

const namespace = new Namespace();

module.exports = namespace;
module.exports.Namespace = Namespace;
