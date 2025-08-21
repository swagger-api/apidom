import { expect } from 'chai';
import dedent from 'dedent';
import { sexprs } from '@swagger-api/apidom-core';
import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import { refractorPluginReplaceEmptyElement, SwaggerElement } from '../../../../src/index.ts';

describe('given empty value instead of InfoElement', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          swagger: "2.0"
          info:
        `;
    const apiDOM = await parse(yamlDefinition);
    const swaggerElement = SwaggerElement.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    });

    expect(sexprs(swaggerElement)).toMatchSnapshot();
  });
});

describe('given empty value instead of ContactElement', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          swagger: "2.0"
          info:
            contact:
        `;
    const apiDOM = await parse(yamlDefinition);
    const swaggerElement = SwaggerElement.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    });

    expect(sexprs(swaggerElement)).toMatchSnapshot();
  });
});

describe('given empty value instead for Operation.parameters', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          swagger: "2.0"
          paths:
            /path:
              get:
                parameters:
        `;
    const apiDOM = await parse(yamlDefinition);
    const swaggerElement = SwaggerElement.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    }) as SwaggerElement;
    const isOperationParameters = swaggerElement
      .get('paths')
      .get('/path')
      .get('get')
      .get('parameters')
      .classes.includes('operation-parameters');

    expect(sexprs(swaggerElement)).toMatchSnapshot();
    expect(isOperationParameters).to.be.true;
  });
});

describe('given empty value instead for Swagger.definitions.Schema1', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          swagger: "2.0"
          definitions:
            Schema1:
        `;
    const apiDOM = await parse(yamlDefinition);
    const swaggerElement = SwaggerElement.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    }) as SwaggerElement;

    expect(sexprs(swaggerElement)).toMatchSnapshot();
  });
});

describe('given empty value instead for Schema.properties.*', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          swagger: "2.0"
          definitions:
            User:
              properties:
                firstName:
        `;
    const apiDOM = await parse(yamlDefinition);
    const swaggerElement = SwaggerElement.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    }) as SwaggerElement;

    expect(sexprs(swaggerElement)).toMatchSnapshot();
  });
});

describe('given OpenAPI definition with no empty values', function () {
  it('should do nothing', async function () {
    const yamlDefinition = dedent`
          swagger: "2.0"
          info: {}
        `;
    const apiDOM = await parse(yamlDefinition);
    const swaggerElement = SwaggerElement.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    }) as SwaggerElement;

    expect(sexprs(swaggerElement)).toMatchSnapshot();
  });
});

describe('given OpenAPI definition with empty values', function () {
  it('should generate proper source maps', async function () {
    const yamlDefinition = dedent`
          swagger: "2.0"
          info:
        `;
    const apiDOM = await parse(yamlDefinition, { sourceMap: true });
    const swaggerElement = SwaggerElement.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    }) as SwaggerElement;
    const { info: infoValue } = swaggerElement;

    expect(infoValue?.startPositionRow).to.equal(1);
    expect(infoValue?.startPositionColumn).to.equal(5);
    expect(infoValue?.startIndex).to.equal(20);
    expect(infoValue?.endPositionRow).to.equal(1);
    expect(infoValue?.endPositionColumn).to.equal(5);
    expect(infoValue?.endIndex).to.equal(20);
  });
});
