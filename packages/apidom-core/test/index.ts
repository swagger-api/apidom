import 'mocha';
import * as fs from 'node:fs';
import * as path from 'node:path';
import openapi3_1 from '@swagger-api/apidom-ns-openapi-3-1';
import ApiDOMParser from '@swagger-api/apidom-parser';
import * as openapi3_1Adapter from '@swagger-api/apidom-parser-adapter-openapi-json-3-1';

import * as apiDOM from '../src';

const parser = ApiDOMParser().use(openapi3_1Adapter);
const spec = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample-api.json')).toString();
const namespace = apiDOM.createNamespace(openapi3_1);

describe('apidom', function () {
  it('test', async function () {
    const parseResult = await parser.parse(spec);

    console.dir(apiDOM.dehydrate(parseResult, namespace));
  });
});
