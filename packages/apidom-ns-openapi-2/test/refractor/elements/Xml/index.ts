import { expect, assert } from 'chai';
import { sexprs, includesClasses } from '@swagger-api/apidom-core';

import { XmlElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('XmlElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const xmlElement = XmlElement.refract({
          name: 'animal',
          namespace: 'http://swagger.io/schema/sample',
          prefix: 'sample',
          attribute: true,
          wrapped: false,
        });

        expect(sexprs(xmlElement)).toMatchSnapshot();
      });

      specify('should support specification extensions', function () {
        const xmlElement = XmlElement.refract({
          name: 'animal',
          'x-extension': 'extension',
        }) as XmlElement;

        assert.isFalse(includesClasses(['specification-extension'], xmlElement.getMember('name')));
        assert.isTrue(
          includesClasses(['specification-extension'], xmlElement.getMember('x-extension')),
        );
      });
    });
  });
});
