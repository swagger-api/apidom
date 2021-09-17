import { expect } from 'chai';
import { sexprs } from 'apidom';

import { ServerElement } from '../../../../src';

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
