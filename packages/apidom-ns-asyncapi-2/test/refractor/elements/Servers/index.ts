import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { ServersElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('ServersElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const serversElement = ServersElement.refract({
          dev: {},
          staging: {},
          production: {
            $ref: '#/path/to/production/server',
          },
        });

        expect(sexprs(serversElement)).toMatchSnapshot();
      });
    });
  });
});
