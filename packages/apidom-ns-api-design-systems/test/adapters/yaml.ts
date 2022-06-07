import fs from 'fs';
import path from 'path';
import { expect } from 'chai';

import { parse as parseYAML } from '../../src/adapters/yaml/adapter';

describe('adapters', function () {
  it('should parse YAML API Design Systems definition', async function () {
    const apiDesignSystemsString = fs
      .readFileSync(path.join(__dirname, 'fixtures', 'api-design-systems.yaml'))
      .toString();
    const parseResult = await parseYAML(apiDesignSystemsString);

    expect(parseResult.result).toMatchSnapshot();
  });
});
