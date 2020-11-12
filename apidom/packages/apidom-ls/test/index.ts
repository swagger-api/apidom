// import fs from 'fs';
// import path from 'path';
// import * as apiDOM from 'apidom';

import { MyLicenseElement, doit } from '../src/index';

// const spec = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample-api.json')).toString();
// const namespace = apiDOM.createNamespace(openapi3);

describe('apidom-ls', function () {
  const a: MyLicenseElement = new MyLicenseElement();
  it('test', async function () {
    console.log(a);
    doit();
    // console.log(adapter.detect(spec));
    // console.log(adapter.mediaTypes);

    // const parseResult = await adapter.parse(spec, { sourceMap: true });
    // console.log(JSON.stringify(apiDOM.toValue(parseResult), null, 2));
    // console.log  (JSON.stringify(apiDOM.toJSON(namespace, parseResult), null, null));
  });
});
