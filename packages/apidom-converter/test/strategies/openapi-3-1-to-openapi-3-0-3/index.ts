import path from 'node:path';
import { assert } from 'chai';
import {
  InfoElement as Info30Element,
  isOpenApi3_0Element,
  OpenApi3_0Element,
} from '@swagger-api/apidom-ns-openapi-3-0';
import {
  InfoElement as Info31Element,
  isOpenApi3_1Element,
} from '@swagger-api/apidom-ns-openapi-3-1';
import { mediaTypes as openAPI31MediaTypes } from '@swagger-api/apidom-parser-adapter-openapi-json-3-1';
import { mediaTypes as openAPI30MediaTypes } from '@swagger-api/apidom-parser-adapter-openapi-json-3-0';

import convert from '../../../src';

describe('converter', function () {
  context('strategies', function () {
    context('openapi-3-1-to-openapi-3-0-3', function () {
      specify(
        'should perform implicit semantic conversion from OpenAPI 3.1.0 to OpenAPI 3.0.3',
        async function () {
          const fixturePath = path.join(__dirname, 'fixtures', 'implicit-conversion.json');
          const convertedParseResult = await convert(fixturePath, {
            convert: {
              sourceMediaType: openAPI31MediaTypes.findBy('3.1.0', 'json'),
              targetMediaType: openAPI30MediaTypes.findBy('3.0.3', 'json'),
            },
          });

          const api = convertedParseResult.api as OpenApi3_0Element;

          assert.isTrue(isOpenApi3_0Element(api));
          assert.isTrue(api.info instanceof Info30Element);
          assert.isFalse(isOpenApi3_1Element(api));
          assert.isFalse(api.info instanceof Info31Element);
        },
      );
    });
  });
});
