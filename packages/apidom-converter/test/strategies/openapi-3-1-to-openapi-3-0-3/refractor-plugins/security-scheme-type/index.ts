import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mediaTypes as openAPI31MediaTypes } from '@swagger-api/apidom-parser-adapter-openapi-json-3-1';
import { mediaTypes as openAPI30MediaTypes } from '@swagger-api/apidom-parser-adapter-openapi-json-3-0';
import { AnnotationElement, includesClasses, toJSON } from '@swagger-api/apidom-core';
import { assert, expect } from 'chai';

import convert from '../../../../../src/index.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('converter', function () {
  context('strategies', function () {
    context('openapi-3-1-to-openapi-3-0-3', function () {
      context('security-scheme-type', function () {
        specify(
          'should remove SecurityScheme object if it has "mutualTLS" type',
          async function () {
            const fixturePath = path.join(__dirname, 'fixtures', 'security-scheme-type.json');
            const convertedParseResult = await convert(fixturePath, {
              convert: {
                sourceMediaType: openAPI31MediaTypes.findBy('3.1.0', 'json'),
                targetMediaType: openAPI30MediaTypes.findBy('3.0.3', 'json'),
              },
            });

            expect(toJSON(convertedParseResult.api!, undefined, 2)).toMatchSnapshot();
          },
        );

        specify('should create ERROR annotation', async function () {
          const fixturePath = path.join(__dirname, 'fixtures', 'security-scheme-type.json');
          const convertedParseResult = await convert(fixturePath, {
            convert: {
              sourceMediaType: openAPI31MediaTypes.findBy('3.1.0', 'json'),
              targetMediaType: openAPI30MediaTypes.findBy('3.0.3', 'json'),
            },
          });
          const annotations = Array.from(convertedParseResult.annotations);
          const annotation = annotations.find((a: AnnotationElement) =>
            a.code?.equals('mutualTLS'),
          );

          assert.isDefined(annotation);
          assert.lengthOf(annotations, 2);
          assert.isTrue(includesClasses(['error'], annotation));
        });

        specify('should attach source map to annotation', async function () {
          const fixturePath = path.join(__dirname, 'fixtures', 'security-scheme-type.json');
          const convertedParseResult = await convert(fixturePath, {
            parse: {
              parserOpts: { sourceMap: true },
            },
            convert: {
              sourceMediaType: openAPI31MediaTypes.findBy('3.1.0', 'json'),
              targetMediaType: openAPI30MediaTypes.findBy('3.0.3', 'json'),
            },
          });
          const annotations = Array.from(convertedParseResult.annotations);
          const annotation: AnnotationElement = annotations.find((a: AnnotationElement) =>
            a.code?.equals('mutualTLS'),
          );
          const {
            startPositionRow,
            startPositionColumn,
            startIndex,
            endPositionRow,
            endPositionColumn,
            endIndex,
          } = annotation;

          assert.strictEqual(startPositionRow, 9);
          assert.strictEqual(startPositionColumn, 32);
          assert.strictEqual(startIndex, 188);

          assert.strictEqual(endPositionRow, 12);
          assert.strictEqual(endPositionColumn, 13);
          assert.strictEqual(endIndex, 247);
        });

        specify(
          'should remove Reference Objects pointing to removable Security Scheme Objects',
          async function () {
            const fixturePath = path.join(__dirname, 'fixtures', 'reference-objects.json');
            const convertedParseResult = await convert(fixturePath, {
              convert: {
                sourceMediaType: openAPI31MediaTypes.findBy('3.1.0', 'json'),
                targetMediaType: openAPI30MediaTypes.findBy('3.0.3', 'json'),
              },
            });

            expect(toJSON(convertedParseResult.api!, undefined, 2)).toMatchSnapshot();
          },
        );
      });
    });
  });
});
