import { assert } from 'chai';
import dedent from 'dedent';
import { toValue } from '@swagger-api/apidom-core';
import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import { OpenApi3_1Element, refractorPluginNormalizeParameters } from '../../../../src';

describe('refractor', function () {
  context('plugins', function () {
    context('normalize-parameters', function () {
      specify('should use sub-field to store normalized scopes', async function () {
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
        const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
          plugins: [refractorPluginNormalizeParameters()],
        }) as OpenApi3_1Element;

        assert.deepEqual(toValue(openApiElement.get('x-normalized')), {
          parameters: ['/paths/~1/get'],
        });
      });

      context('given custom storage field', function () {
        specify('should use custom storage field to store normalized scopes', async function () {
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
          const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
            plugins: [
              refractorPluginNormalizeParameters({
                storageField: '$$normalized',
              }),
            ],
          }) as OpenApi3_1Element;

          assert.deepEqual(toValue(openApiElement.get('$$normalized')), {
            parameters: ['/paths/~1/get'],
          });
        });
      });
    });
  });
});
