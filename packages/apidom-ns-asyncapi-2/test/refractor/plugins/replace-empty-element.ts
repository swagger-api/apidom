import { assert, expect } from 'chai';
import dedent from 'dedent';
import { sexprs, SourceMapElement } from '@swagger-api/apidom-core';
import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import { refractorPluginReplaceEmptyElement, AsyncApi2Element } from '../../../src';

describe('refractor', function () {
  context('plugins', function () {
    context('replace-empty-element', function () {
      context('given empty value instead of InfoElement', function () {
        specify('should replace empty value with semantic element', async function () {
          const yamlDefinition = dedent`
          asyncapi: 2.2.0
          info:
        `;
          const apiDOM = await parse(yamlDefinition);
          const asyncApiElement = AsyncApi2Element.refract(apiDOM.result, {
            plugins: [refractorPluginReplaceEmptyElement()],
          });

          expect(sexprs(asyncApiElement)).toMatchSnapshot();
        });
      });

      context('given empty value instead of ContactElement', function () {
        specify('should replace empty value with semantic element', async function () {
          const yamlDefinition = dedent`
          asyncapi: 2.2.0
          info:
            contact:
        `;
          const apiDOM = await parse(yamlDefinition);
          const asyncApiElement = AsyncApi2Element.refract(apiDOM.result, {
            plugins: [refractorPluginReplaceEmptyElement()],
          });

          expect(sexprs(asyncApiElement)).toMatchSnapshot();
        });
      });

      context('given empty value instead for AsyncAPI.components.schemas', function () {
        specify('should replace empty value with semantic element', async function () {
          const yamlDefinition = dedent`
          asyncapi: 2.2.0
          components:
            schemas:
        `;
          const apiDOM = await parse(yamlDefinition);
          const asyncApiElement = AsyncApi2Element.refract(apiDOM.result, {
            plugins: [refractorPluginReplaceEmptyElement()],
          }) as AsyncApi2Element;
          const isComponentsSchemas = asyncApiElement
            .get('components')
            .get('schemas')
            .classes.includes('components-schemas');

          expect(sexprs(asyncApiElement)).toMatchSnapshot();
          expect(isComponentsSchemas).to.be.true;
        });
      });

      context('given empty value instead for AsyncAPI.components.schemas.*', function () {
        specify('should replace empty value with semantic element', async function () {
          const yamlDefinition = dedent`
          asyncapi: 2.2.0
          components:
            schemas:
              Schema1:
        `;
          const apiDOM = await parse(yamlDefinition);
          const asyncApiElement = AsyncApi2Element.refract(apiDOM.result, {
            plugins: [refractorPluginReplaceEmptyElement()],
          }) as AsyncApi2Element;

          expect(sexprs(asyncApiElement)).toMatchSnapshot();
        });
      });

      context('given AsyncAPI definition with no empty values', function () {
        specify('should do nothing', async function () {
          const yamlDefinition = dedent`
          asyncapi: 2.2.0
          id: urn:com:smartylighting:streetlights:server
        `;
          const apiDOM = await parse(yamlDefinition);
          const asyncApiElement = AsyncApi2Element.refract(apiDOM.result, {
            plugins: [refractorPluginReplaceEmptyElement()],
          }) as AsyncApi2Element;

          expect(sexprs(asyncApiElement)).toMatchSnapshot();
        });
      });

      context('given AsyncAPI definition with empty values', function () {
        specify('should generate proper source maps', async function () {
          const yamlDefinition = dedent`
          asyncapi: 2.2.0
          info:
        `;
          const apiDOM = await parse(yamlDefinition, { sourceMap: true });
          const asyncApiElement = AsyncApi2Element.refract(apiDOM.result, {
            plugins: [refractorPluginReplaceEmptyElement()],
          }) as AsyncApi2Element;
          const { info: infoValue } = asyncApiElement;
          const sourceMap = infoValue?.meta.get('sourceMap');
          const { positionStart, positionEnd } = sourceMap;
          const expectedPosition = [1, 5, 21];

          expect(infoValue?.meta.get('sourceMap')).to.be.an.instanceof(SourceMapElement);
          assert.isTrue(positionStart.equals(expectedPosition));
          assert.isTrue(positionEnd.equals(expectedPosition));
        });
      });
    });
  });
});
