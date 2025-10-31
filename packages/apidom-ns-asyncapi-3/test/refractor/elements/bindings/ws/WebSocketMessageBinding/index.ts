import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { WebSocketMessageBindingElement } from '../../../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('WebSocketMessageBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const webSocketMessageBindingElement = WebSocketMessageBindingElement.refract({});

        expect(sexprs(webSocketMessageBindingElement)).toMatchSnapshot();
      });
    });
  });
});
