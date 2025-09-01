import { expect } from 'chai';
import dedent from 'dedent';
import { sexprs } from '@swagger-api/apidom-core';
import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import { refractorPluginReplaceEmptyElement, OpenApi3_1Element } from '../../../../src/index.ts';

describe('given empty value instead of InfoElement', function () {
  it('should replace empty value with semantic element', async function () {
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

describe('given empty value instead of ContactElement', function () {
  it('should replace empty value with semantic element', async function () {
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

describe('given empty value instead for OpenAPI.components.schemas', function () {
  it('should replace empty value with semantic element', async function () {
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

describe('given empty value instead for OpenAPI.components.schemas.*', function () {
  it('should replace empty value with semantic element', async function () {
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

describe('given empty value instead for Schema.properties.*', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          openapi: 3.1.0
          components:
            schemas:
              User:
                properties:
                  firstName:
        `;
    const apiDOM = await parse(yamlDefinition);
    const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    }) as OpenApi3_1Element;

    expect(sexprs(openApiElement)).toMatchSnapshot();
  });
});

describe('given OpenAPI definition with no empty values', function () {
  it('should do nothing', async function () {
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

describe('given OpenAPI definition with empty values', function () {
  it('should generate proper source maps', async function () {
    const yamlDefinition = dedent`
          openapi: 3.1.0
          info:
        `;
    const apiDOM = await parse(yamlDefinition, { sourceMap: true });
    const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    }) as OpenApi3_1Element;
    const { info: infoValue } = openApiElement;

    expect(infoValue?.startPositionRow).to.equal(1);
    expect(infoValue?.startPositionColumn).to.equal(5);
    expect(infoValue?.startIndex).to.equal(20);
    expect(infoValue?.endPositionRow).to.equal(1);
    expect(infoValue?.endPositionColumn).to.equal(5);
    expect(infoValue?.endIndex).to.equal(20);
  });
});
