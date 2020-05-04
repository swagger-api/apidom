'use strict';

const fs = require('fs');
const path = require('path');
const apiDOM = require('apidom');
const openapi3 = require('apidom-ns-openapi3');
const adapter = require('../src/adapter');

const spec = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample-api.json')).toString();
const namespace = apiDOM.createNamespace(openapi3);

console.log(adapter.detect(spec));
console.log(adapter.mediaTypes);

const parseResult = adapter.parse(spec);
console.log(JSON.stringify(apiDOM.toValue(parseResult), null, 2));
console.log(JSON.stringify(apiDOM.toJSON(namespace, parseResult), null, null));