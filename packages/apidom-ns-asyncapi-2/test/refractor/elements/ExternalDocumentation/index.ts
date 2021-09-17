import { expect } from 'chai';
import { sexprs } from 'apidom';

import { ExternalDocumentationElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('ExternalDocumentationElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const externalDocumentationElement = ExternalDocumentationElement.refract({
          description: 'external-documentation-description',
          url: 'http://www.asyncapi.org/support',
        });

        expect(sexprs(externalDocumentationElement)).toMatchSnapshot();
      });
    });
  });
});
