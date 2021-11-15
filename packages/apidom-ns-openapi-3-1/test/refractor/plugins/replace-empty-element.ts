import { expect } from 'chai';
import dedent from 'dedent';
import { sexprs, SourceMapElement } from '@swagger-api/apidom-core';
import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import { refractorPluginReplaceEmptyElement, OpenApi3_1Element } from '../../../src';

describe('refractor', function () {
  context('plugins', function () {
    context('replace-empty-element', function () {
      context('given empty value instead of InfoElement', function () {
        specify('should replace empty value with semantic element', async function () {
          const yamlDefinition = dedent`
          openapi: 3.1.0
          info:
        `;
          const apiDOM = await parse(yamlDefinition);
          const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
            plugins: [refractorPluginReplaceEmptyElement()],
          });

          expect(sexprs(openApiElement)).toMatchSnapshot();
        });
      });

      context('given empty value instead of ContactElement', function () {
        specify('should replace empty value with semantic element', async function () {
          const yamlDefinition = dedent`
          openapi: 3.1.0
          info:
            contact:
        `;
          const apiDOM = await parse(yamlDefinition);
          const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
            plugins: [refractorPluginReplaceEmptyElement()],
          });

          expect(sexprs(openApiElement)).toMatchSnapshot();
        });
      });

      context('given empty value instead for OpenAPI.components.schemas', function () {
        specify('should replace empty value with semantic element', async function () {
          const yamlDefinition = dedent`
          openapi: 3.1.0
          components:
            schemas:
        `;
          const apiDOM = await parse(yamlDefinition);
          const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
            plugins: [refractorPluginReplaceEmptyElement()],
          }) as OpenApi3_1Element;
          const isComponentsSchemas = openApiElement
            .get('components')
            .get('schemas')
            .classes.includes('components-schemas');

          expect(sexprs(openApiElement)).toMatchSnapshot();
          expect(isComponentsSchemas).to.be.true;
        });
      });

      context('given empty value instead for OpenAPI.components.schemas.*', function () {
        specify('should replace empty value with semantic element', async function () {
          const yamlDefinition = dedent`
          openapi: 3.1.0
          components:
            schemas:
              Schema1:
        `;
          const apiDOM = await parse(yamlDefinition);
          const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
            plugins: [refractorPluginReplaceEmptyElement()],
          }) as OpenApi3_1Element;

          expect(sexprs(openApiElement)).toMatchSnapshot();
        });
      });

      context('given OpenAPI definition with no empty values', function () {
        specify('should do nothing', async function () {
          const yamlDefinition = dedent`
          openapi: 3.1.0
          jsonSchemaDialect: https://spec.openapis.org/oas/3.1/dialect/base
        `;
          const apiDOM = await parse(yamlDefinition);
          const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
            plugins: [refractorPluginReplaceEmptyElement()],
          }) as OpenApi3_1Element;

          expect(sexprs(openApiElement)).toMatchSnapshot();
        });
      });

      context('given OpenAPI definition with empty values', function () {
        specify('should generate proper source maps', async function () {
          const yamlDefinition = dedent`
          openapi: 3.1.0
          info:
        `;
          const apiDOM = await parse(yamlDefinition, { sourceMap: true });
          const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
            plugins: [refractorPluginReplaceEmptyElement()],
          }) as OpenApi3_1Element;
          const { info: infoValue } = openApiElement;
          const sourceMap = infoValue?.meta.get('sourceMap');
          const { positionStart, positionEnd } = sourceMap;
          const expectedPosition = [1, 5, 20];

          expect(infoValue?.meta.get('sourceMap')).to.be.an.instanceof(SourceMapElement);
          expect(positionStart.equals(expectedPosition)).to.be.true;
          expect(positionEnd.equals(expectedPosition)).to.be.true;
        });
      });
    });
  });
});
