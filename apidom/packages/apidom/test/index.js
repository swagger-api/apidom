'use strict';

const fs = require('fs');
const path = require('path');
const apiDOM = require('../src');
const openapi3 = require('apidom-ns-openapi3');
const ApiDOMParser = require('apidom-parser');
const openapi3Parser = require('apidom-parser-adapter-openapi3');

const parser = ApiDOMParser().use(openapi3Parser);
const spec = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample-api.json')).toString();
const namespace = apiDOM.createNamespace(openapi3);

(async () => {
    const parseResult = await parser.parse(spec);
    console.log(apiDOM.toJSON(namespace, parseResult));
})();
