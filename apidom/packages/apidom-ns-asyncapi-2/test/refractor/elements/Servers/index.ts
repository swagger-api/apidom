import { expect } from 'chai';
import { sexprs } from 'apidom';

import { ServersElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('ServersElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const serversElement = ServersElement.refract({
          dev: {},
          staging: {},
          production: {},
        });

        expect(sexprs(serversElement)).toMatchSnapshot();
      });
    });
  });
});
