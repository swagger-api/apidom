import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { XmlElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('XmlElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const xmlElement = XmlElement.refract({
          name: 'tag-name',
          namespace: 'https://example.com/schema/sample',
          prefix: 'sample',
          attribute: true,
          wrapped: false,
        });

        expect(sexprs(xmlElement)).toMatchSnapshot();
      });
    });
  });
});
