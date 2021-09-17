import { expect } from 'chai';
import { sexprs } from 'apidom';

import { IbmmqMessageBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('IbmmqMessageBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const ibmmqMessageBindingElement = IbmmqMessageBindingElement.refract({
          type: 'jms',
          headers: 'MQFMT_CICS,MQFMT_ADMIN',
          cipherSpec: 'ANY_TLS12_OR_HIGHER',
          description: 'JMS stream message',
          expiry: 1,
          bindingVersion: '0.1.0',
        });

        expect(sexprs(ibmmqMessageBindingElement)).toMatchSnapshot();
      });
    });
  });
});
