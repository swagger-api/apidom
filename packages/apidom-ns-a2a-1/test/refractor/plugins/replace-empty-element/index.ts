import { expect } from 'chai';
import dedent from 'dedent';
import { sexprs } from '@swagger-api/apidom-core';
import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import { refractorPluginReplaceEmptyElement, AgentCardElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('plugins', function () {
    context('replace-empty-element', function () {
      specify(
        'should replace empty capabilities with an AgentCapabilitiesElement',
        async function () {
          const yamlDefinition = dedent`
          name: agent example
          capabilities:
        `;
          const apiDOM = await parse(yamlDefinition);
          const agentCardElement = AgentCardElement.refract(apiDOM.result, {
            plugins: [refractorPluginReplaceEmptyElement()],
          });

          expect(sexprs(agentCardElement)).toMatchSnapshot();
        },
      );

      specify('should replace empty provider with an AgentProviderElement', async function () {
        const yamlDefinition = dedent`
          name: agent example
          provider:
        `;
        const apiDOM = await parse(yamlDefinition);
        const agentCardElement = AgentCardElement.refract(apiDOM.result, {
          plugins: [refractorPluginReplaceEmptyElement()],
        });

        expect(sexprs(agentCardElement)).toMatchSnapshot();
      });

      specify('should replace empty skills with a SkillsElement', async function () {
        const yamlDefinition = dedent`
          name: agent example
          skills:
        `;
        const apiDOM = await parse(yamlDefinition);
        const agentCardElement = AgentCardElement.refract(apiDOM.result, {
          plugins: [refractorPluginReplaceEmptyElement()],
        });

        expect(sexprs(agentCardElement)).toMatchSnapshot();
      });

      specify(
        'should replace empty securitySchemes with a SecuritySchemesElement',
        async function () {
          const yamlDefinition = dedent`
          name: agent example
          securitySchemes:
        `;
          const apiDOM = await parse(yamlDefinition);
          const agentCardElement = AgentCardElement.refract(apiDOM.result, {
            plugins: [refractorPluginReplaceEmptyElement()],
          });

          expect(sexprs(agentCardElement)).toMatchSnapshot();
        },
      );

      specify('should leave non-empty values untouched', async function () {
        const yamlDefinition = dedent`
          name: agent example
          capabilities:
            streaming: true
        `;
        const apiDOM = await parse(yamlDefinition);
        const agentCardElement = AgentCardElement.refract(apiDOM.result, {
          plugins: [refractorPluginReplaceEmptyElement()],
        });

        expect(sexprs(agentCardElement)).toMatchSnapshot();
      });
    });
  });
});
