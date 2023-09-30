import fs from 'node:fs';
import path from 'node:path';
import { assert } from 'chai';
import { toValue } from '@swagger-api/apidom-core';
import { parse } from '@swagger-api/apidom-parser-adapter-json';
import { OpenApi3_1Element } from '@swagger-api/apidom-ns-openapi-3-1';

import {
  refractPluginOpenApi3_1StandardIdentifierSelectors,
  refractPluginOpenApi3_1StandardIdentifierAccessors,
  StandardIdentifierElement,
} from '../../../src';
import select from '../../../src/validator/openapi-3-1/selector';
import access from '../../../src/validator/openapi-3-1/accessor';

const definition = fs.readFileSync(path.join(__dirname, 'fixtures', 'openapi-3-1.json')).toString();

describe('given OpenAPI 3.1 definition with Standard Identifier plugin applied', function () {
  let openapiElement: any;

  beforeEach(async function () {
    const apiDOM = await parse(definition);
    openapiElement = OpenApi3_1Element.refract(apiDOM.result, {
      plugins: [
        refractPluginOpenApi3_1StandardIdentifierSelectors(),
        refractPluginOpenApi3_1StandardIdentifierAccessors(),
      ],
    });
  });

  context('given StandardIdentifier([http, request, method])', function () {
    specify('should access value', function () {
      const selectorStandardIdentifier = new StandardIdentifierElement(['http', 'transaction']);
      const accessorStandardIdentifier = new StandardIdentifierElement([
        'http',
        'request',
        'method',
      ]);
      const [operationElement] = select(openapiElement, selectorStandardIdentifier);
      const value = access(operationElement, accessorStandardIdentifier);

      assert.deepEqual(toValue(value), ['get']);
    });
  });
});
