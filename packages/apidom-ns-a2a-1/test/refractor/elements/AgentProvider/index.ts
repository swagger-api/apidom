import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { AgentProviderElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('AgentProviderElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const element = AgentProviderElement.refract({
          organization: 'Acme',
          url: 'https://acme.example',
        });

        expect(sexprs(element)).toMatchSnapshot();
      });
    });
  });
});
