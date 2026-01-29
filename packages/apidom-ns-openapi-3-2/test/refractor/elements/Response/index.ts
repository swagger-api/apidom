import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { ResponseElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('ResponseElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const responseElement = ResponseElement.refract({
          description: 'response-description',
          headers: {
            Header1: {},
            Header2: { $ref: '#/components/headers/Header1' },
          },
          content: {
            'application/json': {},
          },
          links: {
            Link1: {},
            Link2: { $ref: '#/components/links/Link1' },
          },
        });

        expect(sexprs(responseElement)).toMatchSnapshot();
      });
    });
  });
});
