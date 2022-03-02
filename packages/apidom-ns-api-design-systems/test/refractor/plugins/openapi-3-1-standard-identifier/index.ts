import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import { parse } from '@swagger-api/apidom-parser-adapter-json';
import { OpenApi3_1Element } from '@swagger-api/apidom-ns-openapi-3-1';

import { refractPluginOpenApi3_1StandardIdentifier } from '../../../../src';

describe('given OpenAPI 3.1 definition', function () {
  it('should decorate with API Design Systems Standard Identifiers', async function () {
    const definition = fs
      .readFileSync(path.join(__dirname, 'fixtures', 'openapi-3-1.json'))
      .toString();
    const apiDOM = await parse(definition);
    const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
      plugins: [refractPluginOpenApi3_1StandardIdentifier()],
    });

    expect(openApiElement).toMatchSnapshot();
  });
});
