import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert } from 'chai';
import { toValue } from '@swagger-api/apidom-core';

import {
  AgentCardElement,
  isAgentCardElement,
  isAgentCapabilitiesElement,
  isSkillsElement,
  isAgentSkillElement,
} from '../../src/index.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Round-trip a real published Agent Card (sourced from a2aproject/a2a-samples)
 * through the namespace refractor and verify typed elements at each level.
 * This exercises the foundation end-to-end on input that wasn't authored for
 * the test suite.
 */
describe('refractor', function () {
  context('real-world AgentCard', function () {
    const source = fs.readFileSync(
      path.join(__dirname, '..', 'fixtures', 'real-world-planner-agent.json'),
      'utf-8',
    );
    const raw = JSON.parse(source);

    specify('should refract to AgentCardElement', function () {
      const element = AgentCardElement.refract(raw);
      assert.isTrue(isAgentCardElement(element));
    });

    specify('should produce typed scalar accessors', function () {
      const element = AgentCardElement.refract(raw) as AgentCardElement;
      assert.strictEqual(element.name?.toValue(), 'Langraph Planner Agent');
      assert.strictEqual(element.url?.toValue(), 'http://localhost:10102/');
      assert.strictEqual(element.version?.toValue(), '1.0.0');
    });

    specify('should refract capabilities into an AgentCapabilitiesElement', function () {
      const element = AgentCardElement.refract(raw) as AgentCardElement;
      assert.isTrue(isAgentCapabilitiesElement(element.capabilities));
      assert.strictEqual(element.capabilities?.streaming?.toValue(), true);
      assert.strictEqual(element.capabilities?.pushNotifications?.toValue(), true);
    });

    specify('should refract skills into a SkillsElement of AgentSkillElements', function () {
      const element = AgentCardElement.refract(raw) as AgentCardElement;
      assert.isTrue(isSkillsElement(element.skills));
      const firstSkill = element.skills?.get(0);
      assert.isTrue(isAgentSkillElement(firstSkill));
      assert.strictEqual(toValue(firstSkill?.get('id')), 'planner');
      assert.strictEqual(toValue(firstSkill?.get('name')), 'Task Planner');
    });

    specify(
      "should clone-through unknown fields (e.g. 'stateTransitionHistory' not in spec)",
      function () {
        // The real sample uses a stateTransitionHistory field that isn't in
        // A2A v1's AgentCapabilities schema. The refractor should retain it
        // as an untyped MemberElement rather than dropping or crashing.
        const element = AgentCardElement.refract(raw) as AgentCardElement;
        const stateTransition = element.capabilities?.get('stateTransitionHistory');
        assert.strictEqual(toValue(stateTransition), false);
      },
    );

    specify('should keep defaultInputModes / defaultOutputModes as arrays', function () {
      const element = AgentCardElement.refract(raw) as AgentCardElement;
      assert.deepEqual(toValue(element.defaultInputModes), ['text', 'text/plain']);
      assert.deepEqual(toValue(element.defaultOutputModes), ['text', 'text/plain']);
    });
  });
});
