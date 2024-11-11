import { expect } from 'chai';
import dedent from 'dedent';
import { toValue, dispatchRefractorPlugins } from '@swagger-api/apidom-core';
import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import {
  createToolbox,
  OpenApi3_1Element,
  refractorPluginNormalizeOperationIds,
  keyMap,
  getNodeType,
} from '../../../../src/index.ts';

describe('refractor', function () {
  context('plugins', function () {
    context('normalize-parameters', function () {
      specify('should have idempotent characteristics', async function () {
        const yamlDefinition = dedent`
            openapi: 3.1.0
            components:
              links:
                link1:
                  operationId: get operation ^
              paths:
                /:
                  get:
                    operationId: get operation ^
        `;
        const apiDOM = await parse(yamlDefinition);
        const openApiElement = OpenApi3_1Element.refract(apiDOM.result) as OpenApi3_1Element;
        const options = {
          toolboxCreator: createToolbox,
          visitorOptions: { keyMap, nodeTypeGetter: getNodeType },
        };

        dispatchRefractorPlugins(openApiElement, [refractorPluginNormalizeOperationIds()], options);
        dispatchRefractorPlugins(openApiElement, [refractorPluginNormalizeOperationIds()], options);
        dispatchRefractorPlugins(openApiElement, [refractorPluginNormalizeOperationIds()], options);

        expect(toValue(apiDOM.result)).toMatchSnapshot();
      });
    });
  });
});
