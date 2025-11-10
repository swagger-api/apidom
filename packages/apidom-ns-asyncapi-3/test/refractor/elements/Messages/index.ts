import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { MessagesElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('MessagesElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const messagesElement = MessagesElement.refract({
          userMessage: {},
          orderMessage: {},
        });

        expect(sexprs(messagesElement)).toMatchSnapshot();
      });
    });

    context('given field is of type ReferenceElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const messagesElement = MessagesElement.refract({
          userMessage: {},
          orderMessage: {
            $ref: '#/path/to/message',
          },
        });

        expect(sexprs(messagesElement)).toMatchSnapshot();
      });
    });
  });
});
