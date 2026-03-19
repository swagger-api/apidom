import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { SolaceServerBindingElement } from '../../../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('SolaceServerBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const solaceServerBindingElement = SolaceServerBindingElement.refract({
          bindingVersion: '0.4.0',
          msgVpn: 'network1',
          clientName: 'my-client',
        });

        expect(sexprs(solaceServerBindingElement)).toMatchSnapshot();
      });
    });
  });
});
