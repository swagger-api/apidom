import { expect } from 'chai';
import { sexprs } from 'apidom';

import { ChannelsElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('ChannelsElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const channelsElement = ChannelsElement.refract({
          'user/signedup': {},
          'user/loggedout': {},
        });

        expect(sexprs(channelsElement)).toMatchSnapshot();
      });
    });
  });
});
