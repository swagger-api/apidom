import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { IbmmqServerBindingElement } from '../../../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('IbmmqServerBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const ibmmqServerBindingElement = IbmmqServerBindingElement.refract({
          groupId: 'PRODCLSTR1',
          ccdtQueueManagerName: 'qm1',
          cipherSpec: 'ANY_TLS12_OR_HIGHER',
          multiEndpointServer: true,
          heartBeatInterval: 1,
          bindingVersion: '0.1.0',
        });

        expect(sexprs(ibmmqServerBindingElement)).toMatchSnapshot();
      });
    });
  });
});
