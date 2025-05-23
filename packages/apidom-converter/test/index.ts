import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert, expect } from 'chai';
import { toJSON } from '@swagger-api/apidom-core';
import { mediaTypes as openAPI30MediaTypes } from '@swagger-api/apidom-parser-adapter-openapi-json-3-0';
import { mediaTypes as openAPI31MediaTypes } from '@swagger-api/apidom-parser-adapter-openapi-json-3-1';
import { parse } from '@swagger-api/apidom-reference';

import convert, { convertApiDOM, ConvertError } from '../src/index.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

    context('given convert strategy throws error', function () {
      specify('should throw ConvertError', async function () {
        const fixturePath = path.join(
          __dirname,
          'strategies',
          'openapi-3-1-to-openapi-3-0-3',
          'refractor-plugins',
          'openapi-version',
          'fixtures',
          'openapi-version.json',
        );

        try {
          await convert(fixturePath, {
            convert: {
              strategies: [
                {
                  canConvert: () => true,
                  convert: () => {
                    throw new Error('test');
                  },
                },
              ],
            },
          });
          assert.fail('should throw ConvertError');
        } catch (error: unknown) {
          assert.instanceOf(error, ConvertError);
          assert.strictEqual(((error as ConvertError).cause as Error).message, 'test');
        }
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
