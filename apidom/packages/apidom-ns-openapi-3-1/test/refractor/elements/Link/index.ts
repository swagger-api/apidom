import { expect } from 'chai';
import { sexprs } from 'apidom';

import { LinkElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('LinkElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const linkElement = LinkElement.refract({
          operationRef: './operation.json',
          operationId: 'op1',
          parameters: {
            userId: '$request.path.id',
          },
          requestBody: [],
          description: 'link-description',
          server: {},
        });

        expect(sexprs(linkElement)).toMatchSnapshot();
      });
    });
  });
});
