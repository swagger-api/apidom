import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { MessageExampleElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('MessageExampleElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const messageExampleElement = MessageExampleElement.refract({
          headers: { 'Content-Type': 'application/json' },
          payload: '{"a":"b"}',
          name: 'example name',
          summary: 'example summary',
        });

        expect(sexprs(messageExampleElement)).toMatchSnapshot();
      });
    });
  });
});
