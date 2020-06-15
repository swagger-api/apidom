import 'mocha';
import fs from 'fs';
import path from 'path';
/* @ts-ignore */
import openapi3 from 'apidom-ns-openapi3';
/* @ts-ignore */
import ApiDOMParser from 'apidom-parser';
/* @ts-ignore */
import * as openapi3Adapter from 'apidom-parser-adapter-openapi3';
import * as apiDOM from '../src';

const parser = ApiDOMParser().use(openapi3Adapter);
const spec = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample-api.json')).toString();
const namespace = apiDOM.createNamespace(openapi3);

describe('apidom', function () {
  it('test', async function () {
    const parseResult = await parser.parse(spec);

    console.dir(apiDOM.toJSON(namespace, parseResult));
  });
});
