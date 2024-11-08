import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { PathItemElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('PathItemElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const pathItemElement = PathItemElement.refract({
          $ref: '#/components/pathsItems/PathItem1',
          summary: 'path item summary',
          description: 'path item description',
          get: {},
          put: {},
          post: {},
          delete: {},
          options: {},
          head: {},
          patch: {},
          trace: {},
          servers: [{}],
          parameters: [{}, { $ref: '#/components/parameters/Parameter1' }],
        });

        expect(sexprs(pathItemElement)).toMatchSnapshot();
      });
    });
  });
});
