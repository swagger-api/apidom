import { expect } from 'chai';
import dedent from 'dedent';
import { toValue, dispatchRefractorPlugins } from '@swagger-api/apidom-core';
import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import {
  createToolbox,
  OpenApi3_2Element,
  refractorPluginNormalizeServers,
  keyMap,
  getNodeType,
} from '../../../../src/index.ts';

describe('refractor', function () {
  context('plugins', function () {
    context('normalize-servers', function () {
      specify('should have idempotent characteristics', async function () {
        const yamlDefinition = dedent`
            openapi: 3.1.0
            servers:
              - url: https://example.com/
                description: production server
            paths:
              /:
                get: {}
        `;
        const apiDOM = await parse(yamlDefinition);
        const openApiElement = OpenApi3_2Element.refract(apiDOM.result) as OpenApi3_2Element;
        const options = {
          toolboxCreator: createToolbox,
          visitorOptions: { keyMap, nodeTypeGetter: getNodeType },
        };

        dispatchRefractorPlugins(openApiElement, [refractorPluginNormalizeServers()], options);
        dispatchRefractorPlugins(openApiElement, [refractorPluginNormalizeServers()], options);
        dispatchRefractorPlugins(openApiElement, [refractorPluginNormalizeServers()], options);

        expect(toValue(apiDOM.result)).toMatchSnapshot();
      });
    });
  });
});
