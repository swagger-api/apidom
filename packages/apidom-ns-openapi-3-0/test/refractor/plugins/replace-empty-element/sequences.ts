import { expect } from 'chai';
import dedent from 'dedent';
import { sexprs } from '@swagger-api/apidom-core';
import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import { refractorPluginReplaceEmptyElement, OpenApi3_0Element } from '../../../../src/index.ts';

describe('given empty value instead of ServerElement', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          openapi: 3.0.3
          servers:
           -
        `;
    const apiDOM = await parse(yamlDefinition);
    const openApiElement = OpenApi3_0Element.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    });

    expect(sexprs(openApiElement)).toMatchSnapshot();
  });
});

describe('given empty value instead of SecurityRequirementElement', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          openapi: 3.0.3
          security:
           -
        `;
    const apiDOM = await parse(yamlDefinition);
    const openApiElement = OpenApi3_0Element.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    });

    expect(sexprs(openApiElement)).toMatchSnapshot();
  });
});

describe('given multiple empty values instead of TagElement', function () {
  it('should replace empty values with semantic elements', async function () {
    const yamlDefinition = dedent`
          openapi: 3.0.3
          tags:
           -
           -
        `;
    const apiDOM = await parse(yamlDefinition);
    const openApiElement = OpenApi3_0Element.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    });

    expect(sexprs(openApiElement)).toMatchSnapshot();
  });
});

describe('given empty values instead of SchemaElement for allOf keyword', function () {
  it('should replace empty values with semantic elements', async function () {
    const yamlDefinition = dedent`
          openapi: 3.0.3
          components:
            schemas:
              Schema1:
                allOf:
                 -
        `;
    const apiDOM = await parse(yamlDefinition);
    const openApiElement = OpenApi3_0Element.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    });

    expect(sexprs(openApiElement)).toMatchSnapshot();
  });
});
