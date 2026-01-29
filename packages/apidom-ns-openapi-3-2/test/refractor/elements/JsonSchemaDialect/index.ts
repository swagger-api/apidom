import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { JsonSchemaDialectElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('JsonSchemaDialectElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const jsonSchemaDialectElement = JsonSchemaDialectElement.refract(
          'https://spec.openapis.org/oas/3.2/dialect/base',
        );

        expect(sexprs(jsonSchemaDialectElement)).toMatchSnapshot();
      });
    });
  });
});
