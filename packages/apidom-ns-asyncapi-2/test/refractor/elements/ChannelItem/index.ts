import { expect } from 'chai';
import { sexprs } from 'apidom';

import { ChannelItemElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('ChannelItemElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const channelItemElement = ChannelItemElement.refract({
          $ref: '#/path/to/channel-item',
          description: 'channel-item-description',
          subscribe: {},
          publish: {},
          parameters: {},
        });

        expect(sexprs(channelItemElement)).toMatchSnapshot();
      });

      context('given bindings field of type ChannelBindingsElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const channelItemElement = ChannelItemElement.refract({
            bindings: {},
          });

          expect(sexprs(channelItemElement)).toMatchSnapshot();
        });
      });

      context('given bindings field of type ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const channelItemElement = ChannelItemElement.refract({
            bindings: {
              $ref: '#/path/to/bindings',
            },
          });

          expect(sexprs(channelItemElement)).toMatchSnapshot();
        });
      });
    });
  });
});
