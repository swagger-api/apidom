import { expect } from 'chai';
import dedent from 'dedent';
import { toValue } from '@swagger-api/apidom-core';
import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import {
  OpenApi3_2Element,
  refractorPluginNormalizeHeaderExamples,
} from '../../../../../src/index.ts';

describe('refractor', function () {
  context('plugins', function () {
    context('normalize-header-examples', function () {
      context('given Header Object is defined in Components.headers', function () {
        specify('should skip the Header Object from normalization', async function () {
          const yamlDefinition = dedent`
              openapi: 3.2.0
              components:
                headers:
                  header1:
                    schema:
                      type: number
                      example: 1
                    example: 2
            `;
          const apiDOM = await parse(yamlDefinition);
          const openApiElement = OpenApi3_2Element.refract(apiDOM.result, {
            plugins: [refractorPluginNormalizeHeaderExamples()],
          }) as OpenApi3_2Element;

          expect(toValue(openApiElement)).toMatchSnapshot();
        });
      });

      context('given Header Object is defined in Components.pathItems', function () {
        specify('should skip the Header Object from normalization', async function () {
          const yamlDefinition = dedent`
              openapi: 3.2.0
              components:
                responses:
                  response1:
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
          const openApiElement = OpenApi3_2Element.refract(apiDOM.result, {
            plugins: [refractorPluginNormalizeHeaderExamples()],
          }) as OpenApi3_2Element;

          expect(toValue(openApiElement)).toMatchSnapshot();
        });
      });
    });
  });
});
