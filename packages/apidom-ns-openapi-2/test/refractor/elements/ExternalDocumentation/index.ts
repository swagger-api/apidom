import { expect, assert } from 'chai';
import { sexprs, includesClasses } from '@swagger-api/apidom-core';

import { ExternalDocumentationElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('ExternalDocumentationElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const externalDocumentationElement = ExternalDocumentationElement.refract({
          description: 'Find more info here',
          url: 'https://swagger.io',
        });

        expect(sexprs(externalDocumentationElement)).toMatchSnapshot();
      });

      specify('should support specification extensions', function () {
        const externalDocumentationElement = ExternalDocumentationElement.refract({
          description: 'Find more info here',
          'x-extension': 'extension',
        }) as ExternalDocumentationElement;

        assert.isFalse(
          includesClasses(
            ['specification-extension'],
            externalDocumentationElement.getMember('description'),
          ),
        );
        assert.isTrue(
          includesClasses(
            ['specification-extension'],
            externalDocumentationElement.getMember('x-extension'),
          ),
        );
      });
    });
  });
});
