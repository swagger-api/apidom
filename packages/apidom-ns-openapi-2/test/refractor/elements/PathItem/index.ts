import { assert, expect } from 'chai';
import { includesClasses, sexprs } from '@swagger-api/apidom-core';

import { PathItemElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('PathItemElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const pathItemElement = PathItemElement.refract({
          $ref: 'https://example.com/PathItem1',
          get: {},
          put: {},
          post: {},
          delete: {},
          options: {},
          head: {},
          patch: {},
          parameters: [{}, { $ref: '#/components/parameters/Parameter1' }],
        });

        expect(sexprs(pathItemElement)).toMatchSnapshot();
      });

      specify('should support specification extensions', function () {
        const pathItemElement = PathItemElement.refract({
          get: {},
          'x-extension': 'extension',
        }) as PathItemElement;

        assert.isFalse(
          includesClasses(['specification-extension'], pathItemElement.getMember('get')),
        );
        assert.isTrue(
          includesClasses(['specification-extension'], pathItemElement.getMember('x-extension')),
        );
      });
    });
  });
});
