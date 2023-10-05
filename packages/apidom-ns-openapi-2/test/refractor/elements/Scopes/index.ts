import { expect, assert } from 'chai';
import { sexprs, includesClasses } from '@swagger-api/apidom-core';

import { ScopesElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('ScopesElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const scopesElement = ScopesElement.refract({
          'write:pets': 'modify pets in your account',
          'read:pets': 'read your pets',
          'x-extension': 'extension',
        });

        expect(sexprs(scopesElement)).toMatchSnapshot();
      });

      specify('should support specification extensions', function () {
        const scopesElement = ScopesElement.refract({
          'write:pets': 'modify pets in your account',
          'read:pets': 'read your pets',
          'x-extension': 'extension',
        }) as ScopesElement;

        assert.isFalse(
          includesClasses(['specification-extension'], scopesElement.getMember('write:pets')),
        );
        assert.isTrue(
          includesClasses(['specification-extension'], scopesElement.getMember('x-extension')),
        );
      });
    });
  });
});
