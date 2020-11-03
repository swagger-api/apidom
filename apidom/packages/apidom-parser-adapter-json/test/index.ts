import fs from 'fs';
import path from 'path';
import * as apiDOM from 'apidom';

import * as adapter from '../src/adapter-node';

const spec = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample-data.json')).toString();

describe('apidom-parser-adapter-json', function () {
  it('test', async function () {
    console.log(adapter.detect(spec));
    console.log(adapter.mediaTypes);

    const parseResult = await adapter.parse(spec, { sourceMap: true });
    console.log(JSON.stringify(apiDOM.toValue(parseResult), null, 2));
    // console.log(JSON.stringify(apiDOM.toJSON(adapter.namespace, parseResult), null, null));
  });
});
