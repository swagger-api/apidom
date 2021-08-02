import { expect } from 'chai';
import { sexprs } from 'apidom';

import { WebSocketOperationBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('WebSocketOperationBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const webSocketOperationBindingElement = WebSocketOperationBindingElement.refract({});

        expect(sexprs(webSocketOperationBindingElement)).toMatchSnapshot();
      });
    });
  });
});
