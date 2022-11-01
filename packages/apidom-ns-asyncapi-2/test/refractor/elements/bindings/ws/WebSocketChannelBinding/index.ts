import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { WebSocketChannelBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('WebSocketChannelBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const webSocketChannelBindingElement = WebSocketChannelBindingElement.refract({
          method: 'web-socket-channel-method',
          query: {},
          headers: {},
          bindingVersion: '0.1.0',
        });

        expect(sexprs(webSocketChannelBindingElement)).toMatchSnapshot();
      });

      context('given query and header fields of type ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const webSocketChannelBindingElement = WebSocketChannelBindingElement.refract({
            method: 'web-socket-channel-method',
            query: {
              $ref: '#/pointer',
            },
            headers: {
              $ref: '#/pointer',
            },
            bindingVersion: '0.1.0',
          });

          expect(sexprs(webSocketChannelBindingElement)).toMatchSnapshot();
        });
      });
    });
  });
});
