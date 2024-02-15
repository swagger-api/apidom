import path from 'node:path';
import { mediaTypes as openAPI31MediaTypes } from '@swagger-api/apidom-parser-adapter-openapi-json-3-1';
import { mediaTypes as openAPI30MediaTypes } from '@swagger-api/apidom-parser-adapter-openapi-json-3-0';
import { AnnotationElement, includesClasses, toJSON, toValue } from '@swagger-api/apidom-core';
import { assert, expect } from 'chai';

import convert from '../../../../../src';

describe('converter', function () {
  context('strategies', function () {
    context('openapi-3-1-to-openapi-3-0-3', function () {
      context('security-requirements-empty-roles', function () {
        specify(
          'should set SecurityRequirement object to an empty array if it has SecurityScheme object type other than "oauth2" and "openIdConnect"',
          async function () {
            const fixturePath = path.join(
              __dirname,
              'fixtures',
              'security-requirements-empty-roles.json',
            );
            const convertedParseResult = await convert(fixturePath, {
              convert: {
                sourceMediaType: openAPI31MediaTypes.findBy('3.1.0', 'json'),
                targetMediaType: openAPI30MediaTypes.findBy('3.0.3', 'json'),
              },
            });

            expect(toJSON(convertedParseResult.api!, undefined, 2)).toMatchSnapshot();
          },
        );

        specify('should create WARNING annotation', async function () {
          const fixturePath = path.join(
            __dirname,
            'fixtures',
            'security-requirements-empty-roles.json',
          );
          const convertedParseResult = await convert(fixturePath, {
            convert: {
              sourceMediaType: openAPI31MediaTypes.findBy('3.1.0', 'json'),
              targetMediaType: openAPI30MediaTypes.findBy('3.0.3', 'json'),
            },
          });
          const annotations = Array.from(convertedParseResult.annotations);
          const annotation = annotations.find((a: AnnotationElement) =>
            a.code?.equals('security-requirements-empty-roles'),
          );

          assert.isDefined(annotation);
          assert.lengthOf(annotations, 1);
          assert.isTrue(includesClasses(['warning'], annotation));
        });

        specify('should attach source map to annotation', async function () {
          const fixturePath = path.join(
            __dirname,
            'fixtures',
            'security-requirements-empty-roles.json',
          );
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
            a.code?.equals('security-requirements-empty-roles'),
          );
          const sourceMap = annotation.meta.get('sourceMap');
          const { positionStart, positionEnd } = sourceMap;
          const [startRow, startColumn, startChar] = toValue(positionStart);
          const [endRow, endColumn, endChar] = toValue(positionEnd);

          assert.isDefined(sourceMap);

          assert.strictEqual(startRow, 15);
          assert.strictEqual(startColumn, 29);
          assert.strictEqual(startChar, 299);

          assert.strictEqual(endRow, 18);
          assert.strictEqual(endColumn, 13);
          assert.strictEqual(endChar, 358);
        });
      });
    });
  });
});
