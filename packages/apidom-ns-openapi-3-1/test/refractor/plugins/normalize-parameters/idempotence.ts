import { expect } from 'chai';
import dedent from 'dedent';
import { toValue, dispatchRefractorPlugins } from '@swagger-api/apidom-core';
import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import {
  createToolbox,
  OpenApi3_1Element,
  refractorPluginNormalizeParameters,
  keyMap,
  getNodeType,
} from '../../../../src/index.ts';

describe('refractor', function () {
  context('plugins', function () {
    context('normalize-parameters', function () {
      specify('should have idempotent characteristics', async function () {
        const yamlDefinition = dedent`
            openapi: 3.1.0
            paths:
              /:
                parameters:
                  - name: param1
                    in: query
                  - name: param2
                    in: query
                get:
                  parameters:
                    - name: param3
                      in: query
      `;
        const apiDOM = await parse(yamlDefinition);
        const openApiElement = OpenApi3_1Element.refract(apiDOM.result) as OpenApi3_1Element;
        const options = {
          toolboxCreator: createToolbox,
          visitorOptions: { keyMap, nodeTypeGetter: getNodeType },
        };

        dispatchRefractorPlugins(openApiElement, [refractorPluginNormalizeParameters()], options);
        dispatchRefractorPlugins(openApiElement, [refractorPluginNormalizeParameters()], options);
        dispatchRefractorPlugins(openApiElement, [refractorPluginNormalizeParameters()], options);

        expect(toValue(apiDOM.result)).toMatchSnapshot();
      });
    });
  });
});
