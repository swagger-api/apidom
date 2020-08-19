import fs from 'fs';
import path from 'path';
import * as apiDOM from 'apidom';

import * as adapter from '../src/adapter-node';

const spec = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample-api.json')).toString();
// const namespace = apiDOM.createNamespace(openapi3);

describe('apidom-parser-adapter-openapi3-1-json', function () {
  it('test', async function () {
    console.log(adapter.detect(spec));
    console.log(adapter.mediaTypes);

    const parseResult = await adapter.parse(spec, { sourceMap: true });
    console.log(JSON.stringify(apiDOM.toValue(parseResult), null, 2));
    // console.log  (JSON.stringify(apiDOM.toJSON(namespace, parseResult), null, null));
  });
});
