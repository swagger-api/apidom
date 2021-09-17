import fs from 'fs';
import path from 'path';
import * as apiDOM from 'apidom';

import * as adapter from '../src/adapter-node';

const spec = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample-data.json')).toString();

describe('apidom-parser-adapter-json', function () {
  it('test', async function () {
    console.log(await adapter.detect(spec));
    console.log(adapter.mediaTypes);

    const parseResult = await adapter.parse(spec, {
      syntacticAnalysis: 'direct',
      sourceMap: true,
    });
    console.log(JSON.stringify(apiDOM.toValue(parseResult), null, 2));
    // console.log(JSON.stringify(apiDOM.toJSON(parseResult, adapter.namespace), null, null));
  });
});
