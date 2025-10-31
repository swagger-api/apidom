import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { OperationReplyAddressElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('OperationReplyAddressElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const operationReplyAddressElement = OperationReplyAddressElement.refract({
          description: 'operation-reply-address-description',
          location: 'operation-reply-address-location',
        });

        expect(sexprs(operationReplyAddressElement)).toMatchSnapshot();
      });
    });
  });
});
