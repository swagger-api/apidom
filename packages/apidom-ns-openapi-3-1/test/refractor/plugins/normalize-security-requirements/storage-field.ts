import { assert } from 'chai';
import dedent from 'dedent';
import { toValue } from '@swagger-api/apidom-core';
import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import {
  OpenApi3_1Element,
  refractorPluginNormalizeSecurityRequirements,
} from '../../../../src/index.ts';

describe('refractor', function () {
  context('plugins', function () {
    context('normalize-security-requirements', function () {
      specify('should use sub-field to store normalized scopes', async function () {
        const yamlDefinition = dedent`
            openapi: 3.1.0
            paths:
              /:
                get: {}
            security:
              - petstore_auth:
                - write:pets
                - read:pets
  `;
        const apiDOM = await parse(yamlDefinition);
        const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
          plugins: [refractorPluginNormalizeSecurityRequirements()],
        }) as OpenApi3_1Element;

        assert.deepEqual(toValue(openApiElement.get('x-normalized')), {
          'security-requirements': ['/paths/~1/get'],
        });
      });

      context('given custom storage field', function () {
        specify('should use custom storage field to store normalized scopes', async function () {
          const yamlDefinition = dedent`
                openapi: 3.1.0
                paths:
                  /:
                    get: {}
                security:
                  - petstore_auth:
                    - write:pets
                    - read:pets
          `;
          const apiDOM = await parse(yamlDefinition);
          const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
            plugins: [
              refractorPluginNormalizeSecurityRequirements({
                storageField: '$$normalized',
              }),
            ],
          }) as OpenApi3_1Element;

          assert.deepEqual(toValue(openApiElement.get('$$normalized')), {
            'security-requirements': ['/paths/~1/get'],
          });
        });
      });
    });
  });
});
