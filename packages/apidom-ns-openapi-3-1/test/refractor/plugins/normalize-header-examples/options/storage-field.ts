import { assert } from 'chai';
import dedent from 'dedent';
import { toValue } from '@swagger-api/apidom-core';
import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import { OpenApi3_1Element, refractorPluginNormalizeHeaderExamples } from '../../../../../src';

describe('refractor', function () {
  context('plugins', function () {
    context('normalize-header-examples', function () {
      specify(
        'should use x-normalized-header-examples top level field to store normalized scopes',
        async function () {
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
          const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
            plugins: [refractorPluginNormalizeHeaderExamples()],
          }) as OpenApi3_1Element;

          assert.deepEqual(toValue(openApiElement.get('x-normalized')), {
            'header-examples': ['/paths/~1/get/responses/200/headers/content-type'],
          });
        },
      );

      context('given custom storage field', function () {
        specify('should use custom top level field to store normalized scopes', async function () {
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
          const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
            plugins: [
              refractorPluginNormalizeHeaderExamples({
                storageField: '$$normalized',
              }),
            ],
          }) as OpenApi3_1Element;

          assert.deepEqual(toValue(openApiElement.get('$$normalized')), {
            'header-examples': ['/paths/~1/get/responses/200/headers/content-type'],
          });
        });
      });
    });
  });
});
