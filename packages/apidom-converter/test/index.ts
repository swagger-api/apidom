import path from 'node:path';
import { expect } from 'chai';
import { toJSON } from '@swagger-api/apidom-core';
import { mediaTypes as openAPI30MediaTypes } from '@swagger-api/apidom-parser-adapter-openapi-json-3-0';
import { mediaTypes as openAPI31MediaTypes } from '@swagger-api/apidom-parser-adapter-openapi-json-3-1';
import { parse } from '@swagger-api/apidom-reference';

import convert, { convertApiDOM } from '../src';

describe('apidom-converter', function () {
  context('convert', function () {
    context('given URI', function () {
      specify('should convert', async function () {
        const fixturePath = path.join(
          __dirname,
          'strategies',
          'openapi-3-1-to-openapi-3-0-3',
          'refractor-plugins',
          'openapi-version',
          'fixtures',
          'openapi-version.json',
        );
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

  context('convertApiDOM', function () {
    context('given ApiDOM data', function () {
      specify('should convert', async function () {
        const fixturePath = path.join(
          __dirname,
          'strategies',
          'openapi-3-1-to-openapi-3-0-3',
          'refractor-plugins',
          'openapi-version',
          'fixtures',
          'openapi-version.json',
        );
        const parseResult = await parse(fixturePath);
        const convertedParseResult = await convertApiDOM(parseResult, {
          convert: {
            sourceMediaType: openAPI31MediaTypes.findBy('3.1.0', 'json'),
            targetMediaType: openAPI30MediaTypes.findBy('3.0.3', 'json'),
          },
          resolve: {
            baseURI: fixturePath,
          },
        });

        expect(toJSON(convertedParseResult.api!, undefined, 2)).toMatchSnapshot();
      });
    });
  });
});
