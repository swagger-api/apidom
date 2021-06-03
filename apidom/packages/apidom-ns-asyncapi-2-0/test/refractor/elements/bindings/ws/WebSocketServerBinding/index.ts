import { expect } from 'chai';
import { sexprs } from 'apidom';

import { WebSocketServerBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('WebSocketServerBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const webSocketServerBindingElement = WebSocketServerBindingElement.refract({});

        expect(sexprs(webSocketServerBindingElement)).toMatchSnapshot();
      });
    });
  });
});
