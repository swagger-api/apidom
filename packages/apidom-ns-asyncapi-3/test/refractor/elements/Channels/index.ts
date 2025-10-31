import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { ChannelsElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('ChannelsElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const channelsElement = ChannelsElement.refract({
          'user/signedup': {},
          'user/loggedout': {},
          'user/ref': {
            $ref: '#/path/to/channel',
          },
        });

        expect(sexprs(channelsElement)).toMatchSnapshot();
      });
    });
  });
});
