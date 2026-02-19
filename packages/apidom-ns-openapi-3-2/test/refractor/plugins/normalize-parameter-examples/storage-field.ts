import { assert } from 'chai';
import dedent from 'dedent';
import { toValue } from '@swagger-api/apidom-core';
import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import {
  OpenApi3_2Element,
  refractorPluginNormalizeParameterExamples,
} from '../../../../src/index.ts';

describe('refractor', function () {
  context('plugins', function () {
    context('normalize-parameter-examples', function () {
      specify('should use sub-field to store normalized scopes', async function () {
        const yamlDefinition = dedent`
            openapi: 3.2.0
            paths:
              /:
                get:
                  parameters:
                      - in: query
                        name: idempotent
                        schema:
                          type: number
                          example: 1
                        examples:
                          example1:
                            value: 2
  `;
        const apiDOM = await parse(yamlDefinition);
        const openApiElement = OpenApi3_2Element.refract(apiDOM.result, {
          plugins: [refractorPluginNormalizeParameterExamples()],
        }) as OpenApi3_2Element;

        assert.deepEqual(toValue(openApiElement.get('x-normalized')), {
          'parameter-examples': ['/paths/~1/get/parameters/0'],
        });
      });

      context('given custom storage field', function () {
        specify('should use custom storage field to store normalized scopes', async function () {
          const yamlDefinition = dedent`
                openapi: 3.2.0
                paths:
                  /:
                    get:
                      parameters:
                        - in: query
                          name: idempotent
                          schema:
                            type: number
                            example: 1
                          examples:
                            example1:
                              value: 2
          `;
          const apiDOM = await parse(yamlDefinition);
          const openApiElement = OpenApi3_2Element.refract(apiDOM.result, {
            plugins: [
              refractorPluginNormalizeParameterExamples({
                storageField: '$$normalized',
              }),
            ],
          }) as OpenApi3_2Element;

          assert.deepEqual(toValue(openApiElement.get('$$normalized')), {
            'parameter-examples': ['/paths/~1/get/parameters/0'],
          });
        });
      });
    });
  });
});
