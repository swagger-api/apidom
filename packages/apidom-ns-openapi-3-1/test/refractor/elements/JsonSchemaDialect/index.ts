import { expect } from 'chai';
import { sexprs } from 'apidom';

import { JsonSchemaDialectElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('JsonSchemaDialectElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const jsonSchemaDialectElement = JsonSchemaDialectElement.refract(
          'https://spec.openapis.org/oas/3.1/dialect/base',
        );

        expect(sexprs(jsonSchemaDialectElement)).toMatchSnapshot();
      });
    });
  });
});
