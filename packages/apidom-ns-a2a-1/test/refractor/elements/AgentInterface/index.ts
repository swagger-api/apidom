import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { AgentInterfaceElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('AgentInterfaceElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const element = AgentInterfaceElement.refract({
          url: 'https://example.com/a2a',
          protocolBinding: 'JSONRPC',
          protocolVersion: '1.0',
          tenant: 'tenant-a',
        });

        expect(sexprs(element)).toMatchSnapshot();
      });
    });
  });
});
