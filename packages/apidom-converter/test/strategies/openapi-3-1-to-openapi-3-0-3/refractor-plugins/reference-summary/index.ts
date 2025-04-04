import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, assert } from 'chai';
import { mediaTypes as openAPI31MediaTypes } from '@swagger-api/apidom-parser-adapter-openapi-json-3-1';
import { mediaTypes as openAPI30MediaTypes } from '@swagger-api/apidom-parser-adapter-openapi-json-3-0';
import {
  AnnotationElement,
  ParseResultElement,
  toJSON,
  includesClasses,
} from '@swagger-api/apidom-core';

import convert from '../../../../../src/index.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('converter', function () {
  context('strategies', function () {
    context('openapi-3-1-to-openapi-3-0-3', function () {
      context('reference-summary', function () {
        const fixturePath = path.join(__dirname, 'fixtures', 'reference-summary.json');
        let convertedParseResult: ParseResultElement;

        beforeEach(async function () {
          convertedParseResult = await convert(fixturePath, {
            convert: {
              sourceMediaType: openAPI31MediaTypes.findBy('3.1.0', 'json'),
              targetMediaType: openAPI30MediaTypes.findBy('3.0.3', 'json'),
            },
          });
        });

        specify('should remove Reference.summary field', async function () {
          expect(toJSON(convertedParseResult.api!, undefined, 2)).toMatchSnapshot();
        });

        specify('should create WARNING annotation for summary field', async function () {
          const annotations = Array.from(convertedParseResult.annotations);
          const annotation = annotations.find((a: AnnotationElement) =>
            a.code?.equals('reference-summary'),
          );

          assert.isDefined(annotation);
          assert.isTrue(includesClasses(['warning'], annotation));
        });
      });
    });
  });
});
