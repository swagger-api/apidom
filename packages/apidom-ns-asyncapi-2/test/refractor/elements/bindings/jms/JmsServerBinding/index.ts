import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { JmsServerBindingElement } from '../../../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('JmsServerBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const jmsServerBindingElement = JmsServerBindingElement.refract({
          jmsConnectionFactory: 'com.solacesystems.jndi.SolJNDIInitialContextFactory',
          properties: [{}],
          clientID: 'client-id',
          bindingVersion: '0.0.1',
        });

        expect(sexprs(jmsServerBindingElement)).toMatchSnapshot();
      });
    });
  });
});
