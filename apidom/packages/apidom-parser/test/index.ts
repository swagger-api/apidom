import 'mocha';
import fs from 'fs';
import path from 'path';
import * as apiDOM from 'apidom';
/* @ts-ignore */
import openapi3_1 from 'apidom-ns-openapi3-1';
/* @ts-ignore */
import * as openapi3_1Adapter from 'apidom-parser-adapter-openapi3-1-json';
import ApiDOMParser from '../src/parser';

const parser = ApiDOMParser().use(openapi3_1Adapter);
const spec = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample-api.json')).toString();
const namespace = apiDOM.createNamespace(openapi3_1);

describe('apidom-parser', function () {
  it('test', async function () {
    const parseResult = await parser.parse(spec);
    console.log(parseResult);
    console.log(apiDOM.toJSON(namespace, parseResult));
  });
});
