import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { OperationReplyElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('OperationReplyElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const operationReplyElement = OperationReplyElement.refract({
          address: {},
          channel: {
            $ref: '#/path/to/channel',
          },
          messages: [
            {
              $ref: '#/path/to/message',
            },
          ],
        });

        expect(sexprs(operationReplyElement)).toMatchSnapshot();
      });

      context('given address field of type ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const operationReplyElement = OperationReplyElement.refract({
            address: {
              $ref: '#/path/to/address',
            },
          });

          expect(sexprs(operationReplyElement)).toMatchSnapshot();
        });
      });
    });
  });
});
