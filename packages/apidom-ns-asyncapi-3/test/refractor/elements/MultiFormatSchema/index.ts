import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { MultiFormatSchemaElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('MultiFormatSchemaElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const multiFormatSchemaElement = MultiFormatSchemaElement.refract({
          schemaFormat: 'application/vnd.aai.asyncapi;version=3.0.0',
          schema: {},
        });

        expect(sexprs(multiFormatSchemaElement)).toMatchSnapshot();
      });

      context('given schema of type ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const multiFormatSchemaElement = MultiFormatSchemaElement.refract({
            schemaFormat: 'application/vnd.aai.asyncapi;version=3.0.0',
            schema: {
              $ref: '#/path/to/schema',
            },
          });

          expect(sexprs(multiFormatSchemaElement)).toMatchSnapshot();
        });
      });

      context('given unsupported schemaFormat', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const multiFormatSchemaElement = MultiFormatSchemaElement.refract({
            schemaFormat: 'application/vnd.apache.avro;version=1.9.0',
            schema: {},
          });

          expect(sexprs(multiFormatSchemaElement)).toMatchSnapshot();
        });
      });

      context('given unsupported schemaFormat with referenced schema', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const multiFormatSchemaElement = MultiFormatSchemaElement.refract({
            schemaFormat: 'application/vnd.apache.avro;version=1.9.0',
            schema: {
              $ref: '#/path/to/schema',
            },
          });

          expect(sexprs(multiFormatSchemaElement)).toMatchSnapshot();
        });
      });
    });
  });
});
