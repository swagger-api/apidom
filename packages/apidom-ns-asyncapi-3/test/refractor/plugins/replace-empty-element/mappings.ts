import { expect } from 'chai';
import dedent from 'dedent';
import { sexprs } from '@swagger-api/apidom-core';
import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import { refractorPluginReplaceEmptyElement, AsyncApi3Element } from '../../../../src/index.ts';

describe('given empty value instead of InfoElement', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          asyncapi: 3.0.0
          info:
        `;
    const apiDOM = await parse(yamlDefinition);
    const asyncApiElement = AsyncApi3Element.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    });

    expect(sexprs(asyncApiElement)).toMatchSnapshot();
  });
});

describe('given empty value instead of ContactElement', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          asyncapi: 3.0.0
          info:
            contact:
        `;
    const apiDOM = await parse(yamlDefinition);
    const asyncApiElement = AsyncApi3Element.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    });

    expect(sexprs(asyncApiElement)).toMatchSnapshot();
  });
});

describe('given empty value instead of Message.payload.schema with supported schema format', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          asyncapi: 3.0.0
          components:
            messages:
                userSignUp:
                  payload:
                    schemaFormat: application/vnd.aai.asyncapi;version=3.0.0
                    schema:
        `;
    const apiDOM = await parse(yamlDefinition);
    const asyncApiElement = AsyncApi3Element.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    });

    expect(sexprs(asyncApiElement)).toMatchSnapshot();
  });
});

describe('given empty value instead of Message.payload.schema with unsupported schema format', function () {
  it('should replace empty value with generic element', async function () {
    const yamlDefinition = dedent`
          asyncapi: 3.0.0
          components:
            messages:
                userSignUp:
                  payload:
                    schemaFormat: application/vnd.apache.avro;version=1.9.0
                    schema:
        `;
    const apiDOM = await parse(yamlDefinition);
    const asyncApiElement = AsyncApi3Element.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    });

    expect(sexprs(asyncApiElement)).toMatchSnapshot();
  });
});

describe('given empty value instead for AsyncAPI.components.schemas', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          asyncapi: 3.0.0
          components:
            schemas:
        `;
    const apiDOM = await parse(yamlDefinition);
    const asyncApiElement = AsyncApi3Element.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    }) as AsyncApi3Element;
    const isComponentsSchemas = asyncApiElement
      .get('components')
      .get('schemas')
      .classes.includes('components-schemas');

    expect(sexprs(asyncApiElement)).toMatchSnapshot();
    expect(isComponentsSchemas).to.be.true;
  });
});

describe('given empty value instead for AsyncAPI.components.schemas.*', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          asyncapi: 3.0.0
          components:
            schemas:
              Schema1:
        `;
    const apiDOM = await parse(yamlDefinition);
    const asyncApiElement = AsyncApi3Element.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    }) as AsyncApi3Element;

    expect(sexprs(asyncApiElement)).toMatchSnapshot();
  });
});

describe('given empty value instead for Schema.properties.*', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          asyncapi: 3.0.0
          components:
            schemas:
              User:
                properties:
                  firstName:
        `;
    const apiDOM = await parse(yamlDefinition);
    const asyncApiElement = AsyncApi3Element.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    }) as AsyncApi3Element;

    expect(sexprs(asyncApiElement)).toMatchSnapshot();
  });
});

describe('given AsyncAPI definition with no empty values', function () {
  it('should do nothing', async function () {
    const yamlDefinition = dedent`
          asyncapi: 3.0.0
          id: urn:com:smartylighting:streetlights:server
        `;
    const apiDOM = await parse(yamlDefinition);
    const asyncApiElement = AsyncApi3Element.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    }) as AsyncApi3Element;

    expect(sexprs(asyncApiElement)).toMatchSnapshot();
  });
});

describe('given AsyncAPI definition with empty values', function () {
  it('should generate proper source maps', async function () {
    const yamlDefinition = dedent`
          asyncapi: 3.0.0
          info:
        `;
    const apiDOM = await parse(yamlDefinition, { sourceMap: true });
    const asyncApiElement = AsyncApi3Element.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    }) as AsyncApi3Element;
    const { info: infoValue } = asyncApiElement;

    expect(infoValue?.startPositionRow).to.equal(1);
    expect(infoValue?.startPositionColumn).to.equal(5);
    expect(infoValue?.startIndex).to.equal(21);
    expect(infoValue?.endPositionRow).to.equal(1);
    expect(infoValue?.endPositionColumn).to.equal(5);
    expect(infoValue?.endIndex).to.equal(21);
  });
});
