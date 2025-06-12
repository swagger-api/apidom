import { expect } from 'chai';
import dedent from 'dedent';
import { toValue, dispatchRefractorPlugins } from '@swagger-api/apidom-core';
import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import {
  createToolbox,
  OpenApi3_1Element,
  refractorPluginNormalizeDiscriminatorMapping,
  keyMap,
  getNodeType,
} from '../../../../src/index.ts';

describe('refractor', function () {
  context('plugins', function () {
    context('normalize-dicriminator-mapping', function () {
      specify('should have idempotent characteristics', async function () {
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
        const openApiElement = OpenApi3_1Element.refract(apiDOM.result) as OpenApi3_1Element;
        const options = {
          toolboxCreator: createToolbox,
          visitorOptions: { keyMap, nodeTypeGetter: getNodeType },
        };

        dispatchRefractorPlugins(
          openApiElement,
          [refractorPluginNormalizeDiscriminatorMapping()],
          options,
        );
        dispatchRefractorPlugins(
          openApiElement,
          [refractorPluginNormalizeDiscriminatorMapping()],
          options,
        );
        dispatchRefractorPlugins(
          openApiElement,
          [refractorPluginNormalizeDiscriminatorMapping()],
          options,
        );

        expect(toValue(apiDOM.result)).toMatchSnapshot();
      });
    });
  });
});
