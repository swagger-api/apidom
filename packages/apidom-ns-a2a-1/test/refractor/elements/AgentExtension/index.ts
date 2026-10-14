import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { AgentExtensionElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('AgentExtensionElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const element = AgentExtensionElement.refract({
          uri: 'urn:example:ext',
          description: 'demo',
          required: true,
          params: { foo: 'bar' },
        });

        expect(sexprs(element)).toMatchSnapshot();
      });
    });
  });
});
