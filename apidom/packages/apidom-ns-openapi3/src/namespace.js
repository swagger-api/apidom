'use strict';

const OpenApi3 = require('./elements/OpenApi3');
const Openapi = require('./elements/Openapi');
const Info = require('./elements/Info');
const License = require('./elements/License');
const Contact = require('./elements/Contact');
const Components = require('./elements/Components');
const Schemas = require('./elements/Schemas');
const Schema = require('./elements/Schema');

const openApi3 = {
    namespace: (options) => {
        const { base } = options;

        base.register('openApi3', OpenApi3);
        base.register('openapi', Openapi);
        base.register('info', Info);
        base.register('license', License);
        base.register('contact', Contact);
        base.register('components', Components);
        base.register('schemas', Schemas);
        base.register('schema', Schema);

        return base;
    },
}

module.exports = openApi3;