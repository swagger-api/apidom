import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { AgentCardSignatureElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('AgentCardSignatureElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const element = AgentCardSignatureElement.refract({
          protected: 'eyJ...',
          signature: 'sig...',
          header: { alg: 'ES256' },
        });

        expect(sexprs(element)).toMatchSnapshot();
      });
    });
  });
});
