import path from 'node:path';
import { expect } from 'chai';
import { mediaTypes as openAPI31MediaTypes } from '@swagger-api/apidom-parser-adapter-openapi-json-3-1';
import { mediaTypes as openAPI30MediaTypes } from '@swagger-api/apidom-parser-adapter-openapi-json-3-0';
import { toJSON } from '@swagger-api/apidom-core';

import convert from '../../../../../src';

describe('converter', function () {
  context('strategies', function () {
    context('openapi-3-1-to-openapi-3-0-3', function () {
      context('openapi-version', function () {
        specify('should convert OpenAPI version', async function () {
          const fixturePath = path.join(__dirname, 'fixtures', 'openapi-version.json');
          const convertedParseResult = await convert(fixturePath, {
            convert: {
              sourceMediaType: openAPI31MediaTypes.findBy('3.1.0', 'json'),
              targetMediaType: openAPI30MediaTypes.findBy('3.0.3', 'json'),
            },
          });

          expect(toJSON(convertedParseResult.api!, undefined, 2)).toMatchSnapshot();
        });
      });
    });
  });
});
