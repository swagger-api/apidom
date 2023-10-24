import { assert, expect } from 'chai';
import { includesClasses, sexprs } from '@swagger-api/apidom-core';

import { PathsElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('PathsElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const pathsElement = PathsElement.refract({
          '/path1': {},
          '/path2': {},
        });

        expect(sexprs(pathsElement)).toMatchSnapshot();
      });

      specify('should support specification extensions', function () {
        const pathsElement = PathsElement.refract({
          '/path1': {},
          'x-extension': 'extension',
        }) as PathsElement;

        assert.isFalse(
          includesClasses(['specification-extension'], pathsElement.getMember('/path1')),
        );
        assert.isTrue(
          includesClasses(['specification-extension'], pathsElement.getMember('x-extension')),
        );
      });
    });
  });
});
