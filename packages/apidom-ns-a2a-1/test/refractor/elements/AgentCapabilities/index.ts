import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { AgentCapabilitiesElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('AgentCapabilitiesElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const element = AgentCapabilitiesElement.refract({
          streaming: true,
          pushNotifications: false,
          extendedAgentCard: false,
          extensions: [],
        });

        expect(sexprs(element)).toMatchSnapshot();
      });
    });
  });
});
