import { expect } from 'chai';
import { sexprs } from 'apidom';

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
    });
  });
});
