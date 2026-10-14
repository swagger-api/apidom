import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { AgentSkillElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('AgentSkillElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const element = AgentSkillElement.refract({
          id: 'sk-1',
          name: 'Lookup',
          description: 'Looks up data',
          tags: ['data'],
          examples: ['Find X'],
          inputModes: ['text/plain'],
          outputModes: ['application/json'],
          securityRequirements: [{ schemes: { oauth: ['read'] } }],
        });

        expect(sexprs(element)).toMatchSnapshot();
      });
    });
  });
});
