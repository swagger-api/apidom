import { expect } from 'chai';
import dedent from 'dedent';
import { sexprs } from '@swagger-api/apidom-core';
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
    });
  });
});
