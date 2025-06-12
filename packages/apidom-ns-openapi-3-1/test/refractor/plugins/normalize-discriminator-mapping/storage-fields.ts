import { assert } from 'chai';
import dedent from 'dedent';
import { toValue } from '@swagger-api/apidom-core';
import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import {
  OpenApi3_1Element,
  refractorPluginNormalizeDiscriminatorMapping,
} from '../../../../src/index.ts';

describe('refractor', function () {
  context('plugins', function () {
    context('normalize-discriminator-mapping', function () {
      specify('should use sub-field to store normalized scopes', async function () {
        const yamlDefinition = dedent`
          openapi: 3.1.0
          components:
            schemas:
              MyResponse:
                type: object
                oneOf:
                  - $ref: '#/components/schemas/Cat'
                  - $ref: '#/components/schemas/Dog'
                discriminator:
                  propertyName: petType
              Pet:
                type: object
                properties:
                  petType:
                    type: string
              Cat:
                allOf:
                  - $ref: '#/components/schemas/Pet'
                  - type: object
                    properties:
                      meows:
                        type: boolean
              Dog:
                allOf:
                  - $ref: '#/components/schemas/Pet'
                  - type: object
                    properties:
                      barks:
                        type: boolean
        `;
        const apiDOM = await parse(yamlDefinition);
        const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
          plugins: [refractorPluginNormalizeDiscriminatorMapping()],
        }) as OpenApi3_1Element;

        assert.deepEqual(toValue(openApiElement.get('x-normalized')), {
          'discriminator-mapping': ['/components/schemas/MyResponse'],
        });
      });

      context('given custom storage field', function () {
        specify('should use custom storage field to store normalized scopes', async function () {
          const yamlDefinition = dedent`
            openapi: 3.1.0
            components:
              schemas:
                MyResponse:
                  type: object
                  oneOf:
                    - $ref: '#/components/schemas/Cat'
                    - $ref: '#/components/schemas/Dog'
                  discriminator:
                    propertyName: petType
                Pet:
                  type: object
                  properties:
                    petType:
                      type: string
                Cat:
                  allOf:
                    - $ref: '#/components/schemas/Pet'
                    - type: object
                      properties:
                        meows:
                          type: boolean
                Dog:
                  allOf:
                    - $ref: '#/components/schemas/Pet'
                    - type: object
                      properties:
                        barks:
                          type: boolean
          `;
          const apiDOM = await parse(yamlDefinition);
          const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
            plugins: [
              refractorPluginNormalizeDiscriminatorMapping({
                storageField: '$$normalized',
              }),
            ],
          }) as OpenApi3_1Element;

          assert.deepEqual(toValue(openApiElement.get('$$normalized')), {
            'discriminator-mapping': ['/components/schemas/MyResponse'],
          });
        });
      });
    });
  });
});
