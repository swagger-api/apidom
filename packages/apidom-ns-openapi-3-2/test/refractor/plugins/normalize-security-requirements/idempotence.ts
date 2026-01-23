import { expect } from 'chai';
import dedent from 'dedent';
import { toValue, dispatchRefractorPlugins } from '@swagger-api/apidom-core';
import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import {
  createToolbox,
  OpenApi3_2Element,
  refractorPluginNormalizeSecurityRequirements,
  keyMap,
  getNodeType,
} from '../../../../src/index.ts';

describe('refractor', function () {
  context('plugins', function () {
    context('normalize-security-requirements', function () {
      specify('should have idempotent characteristics', async function () {
        const yamlDefinition = dedent`
            openapi: 3.2.0
            paths:
              /:
                get: {}
            security:
              - petstore_auth:
                - write:pets
                - read:pets
  `;
        const apiDOM = await parse(yamlDefinition);
        const openApiElement = OpenApi3_2Element.refract(apiDOM.result) as OpenApi3_2Element;
        const options = {
          toolboxCreator: createToolbox,
          visitorOptions: { keyMap, nodeTypeGetter: getNodeType },
        };

        dispatchRefractorPlugins(
          openApiElement,
          [refractorPluginNormalizeSecurityRequirements()],
          options,
        );
        dispatchRefractorPlugins(
          openApiElement,
          [refractorPluginNormalizeSecurityRequirements()],
          options,
        );
        dispatchRefractorPlugins(
          openApiElement,
          [refractorPluginNormalizeSecurityRequirements()],
          options,
        );

        expect(toValue(apiDOM.result)).toMatchSnapshot();
      });
    });
  });
});
