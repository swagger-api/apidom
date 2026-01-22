import { expect } from 'chai';
import dedent from 'dedent';
import { toValue, dispatchRefractorPlugins } from '@swagger-api/apidom-core';
import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import {
  createToolbox,
  OpenApi3_2Element,
  refractorPluginNormalizeHeaderExamples,
  keyMap,
  getNodeType,
} from '../../../../src/index.ts';

describe('refractor', function () {
  context('plugins', function () {
    context('normalize-header-examples', function () {
      specify('should have idempotent characteristics', async function () {
        const yamlDefinition = dedent`
              openapi: 3.1.0
              paths:
                /:
                  get:
                    responses:
                      "200":
                        headers:
                          content-type:
                            schema:
                              type: number
                              example: 1
                            examples:
                              example1:
                                value: 2
        `;
        const apiDOM = await parse(yamlDefinition);
        const openApiElement = OpenApi3_2Element.refract(apiDOM.result) as OpenApi3_2Element;
        const options = {
          toolboxCreator: createToolbox,
          visitorOptions: { keyMap, nodeTypeGetter: getNodeType },
        };

        dispatchRefractorPlugins(
          openApiElement,
          [refractorPluginNormalizeHeaderExamples()],
          options,
        );
        dispatchRefractorPlugins(
          openApiElement,
          [refractorPluginNormalizeHeaderExamples()],
          options,
        );
        dispatchRefractorPlugins(
          openApiElement,
          [refractorPluginNormalizeHeaderExamples()],
          options,
        );

        expect(toValue(apiDOM.result)).toMatchSnapshot();
      });
    });
  });
});
