import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { ServerElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('ServerElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const serverElement = ServerElement.refract({
          url: '{username}.gigantic-server.com',
          description: 'The production API server',
          variables: {
            username: {},
          },
        });

        expect(sexprs(serverElement)).toMatchSnapshot();
      });
    });
  });
});
