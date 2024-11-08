import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { CallbackElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('CallbackElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const callbackElement = CallbackElement.refract({
          '{$request.query.queryUrl}': {},
          'http://notificationServer.com?transactionId={$request.body#/id}&email={$request.body#/email}':
            {
              $ref: '#/components/callbacks/Callback1',
            },
        });

        expect(sexprs(callbackElement)).toMatchSnapshot();
      });
    });
  });
});
