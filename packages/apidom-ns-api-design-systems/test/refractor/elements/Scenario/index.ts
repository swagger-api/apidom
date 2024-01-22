import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { ScenarioElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('ScenarioElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const scenarioElement = ScenarioElement.refract({
          description: 'description of the scenario',
          when: ['http', 'transaction'],
          then: [{}],
        });

        expect(sexprs(scenarioElement)).toMatchSnapshot();
      });
    });
  });
});
