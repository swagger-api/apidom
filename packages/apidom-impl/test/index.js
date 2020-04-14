'use strict';

const fs = require('fs');
const path = require('path');
const apiDOM = require('../src');

const spec = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures', 'openapi.json')).toString());

const namespace = new apiDOM.openApi3.Namespace();
const openApi3 = namespace.of(spec)


console.dir(openApi3.info.contact.toValue())

// const fs = require('fs');
// const JsonRefs = require('json-refs');
// const minim = require('minim').namespace();
//
// const spec = JSON.parse(fs.readFileSync('../openapi.json').toString());
//
// const apiDOM = minim.toElement(spec);
// apiDOM.get('openapi').id = 'openapi-version'
// const ref = apiDOM.get('openapi').toRef('#/openapi');
// // console.dir(minim.toRefract(ref));
// // console.dir(JSON.stringify(minim.toRefract(apiDOM), null, 2));
//
// const refs = JsonRefs.findRefs(spec); // .then(o => o.refs['#/paths/~1users/get/responses/201/content/application~1json/schema'].value).then(console.dir);
// const ref1 = refs['#/paths/~1users/get/responses/201/content/application~1json/schema'];
// console.dir(JsonRefs.getRefDetails(ref1.def))