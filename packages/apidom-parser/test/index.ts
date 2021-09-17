import { assert } from 'chai';
import fs from 'fs';
import path from 'path';
import * as apiDOM from 'apidom';
import { isOpenApi3_1Element } from 'apidom-ns-openapi-3-1';
import * as openapi3_1Adapter from 'apidom-parser-adapter-openapi-json-3-1';

import ApiDOMParser from '../src/parser';

const parser = ApiDOMParser().use(openapi3_1Adapter);
const spec = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample-api.json')).toString();

describe('apidom-parser', function () {
  it('should parse', async function () {
    const parseResult = await parser.parse(spec);

    assert.isTrue(apiDOM.isParseResultElement(parseResult));
    assert.isTrue(isOpenApi3_1Element(parseResult.api));
  });
});
