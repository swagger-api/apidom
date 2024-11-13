import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { ChannelItemElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('ChannelItemElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const channelItemElement = ChannelItemElement.refract({
          $ref: '#/path/to/channel-item',
          description: 'channel-item-description',
          servers: ['server1', 'server2'],
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
