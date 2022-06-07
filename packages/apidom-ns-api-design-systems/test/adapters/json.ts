import fs from 'fs';
import path from 'path';
import { expect } from 'chai';

import { parse as parseJSON } from '../../src/adapters/json/adapter';

describe('adapters', function () {
  it('should parse JSON API Design Systems definition', async function () {
    const apiDesignSystemsString = fs
      .readFileSync(path.join(__dirname, 'fixtures', 'api-design-systems.json'))
      .toString();
    const parseResult = await parseJSON(apiDesignSystemsString);

    expect(parseResult.result).toMatchSnapshot();
  });
});
