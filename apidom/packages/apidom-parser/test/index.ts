import 'mocha';
import fs from 'fs';
import path from 'path';
import * as apiDOM from 'apidom';
/* @ts-ignore */
import openapi3 from 'apidom-ns-openapi3';
/* @ts-ignore */
import * as openapi3adapter from 'apidom-parser-adapter-openapi3';
import ApiDOMParser from '../src/parser';

const parser = ApiDOMParser().use(openapi3adapter);
const spec = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample-api.json')).toString();
const namespace = apiDOM.createNamespace(openapi3);

describe('apidom-parser', function () {
  it('test', async function () {
    const parseResult = await parser.parse(spec);
    console.log(parseResult);
    console.log(apiDOM.toJSON(namespace, parseResult));
  });
});
