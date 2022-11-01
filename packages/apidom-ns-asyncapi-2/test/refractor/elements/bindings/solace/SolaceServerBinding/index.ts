import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { SolaceServerBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('SolaceServerBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const solaceServerBindingElement = SolaceServerBindingElement.refract({
          bindingVersion: '0.2.0',
          msgVpn: 'network1',
        });

        expect(sexprs(solaceServerBindingElement)).toMatchSnapshot();
      });
    });
  });
});
