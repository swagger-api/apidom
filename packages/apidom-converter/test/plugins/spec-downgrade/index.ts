import dedent from 'dedent';
import { toValue } from '@swagger-api/apidom-core';
import { expect } from 'chai';

import convert from '../../../src';

describe('converter', function () {
  context('plugins', function () {
    context('spec-downgrade', function () {
      specify('should downgrade OpenAPI specificaiton to 3.0.0', async function () {
        const yamlDefinition = dedent`
        openapi: 3.1.0
        `;
        const openApiElement = await convert(yamlDefinition, '3.1.x');

        expect(toValue(openApiElement)).toMatchSnapshot();
      });
    });
  });
});
