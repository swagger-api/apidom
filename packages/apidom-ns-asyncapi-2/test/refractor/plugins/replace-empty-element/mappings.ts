import { expect } from 'chai';
import dedent from 'dedent';
import { sexprs, SourceMapElement } from '@swagger-api/apidom-core';
import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import { refractorPluginReplaceEmptyElement, AsyncApi2Element } from '../../../../src';

describe('given empty value instead of InfoElement', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          asyncapi: 2.5.0
          info:
        `;
    const apiDOM = await parse(yamlDefinition);
    const asyncApiElement = AsyncApi2Element.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    });

    expect(sexprs(asyncApiElement)).toMatchSnapshot();
  });
});

describe('given empty value instead of ContactElement', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          asyncapi: 2.5.0
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

describe('given empty value instead of Message.payload with unspecified schema format', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          asyncapi: 2.5.0
          components:
            messages:
                userSignUp:
                  payload:
        `;
    const apiDOM = await parse(yamlDefinition);
    const asyncApiElement = AsyncApi2Element.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    });

    expect(sexprs(asyncApiElement)).toMatchSnapshot();
  });
});

describe('given empty value instead of Message.payload with supported schema format', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          asyncapi: 2.5.0
          components:
            messages:
                userSignUp:
                  schemaFormat: application/vnd.aai.asyncapi;version=2.5.0
                  payload:
        `;
    const apiDOM = await parse(yamlDefinition);
    const asyncApiElement = AsyncApi2Element.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    });

    expect(sexprs(asyncApiElement)).toMatchSnapshot();
  });
});

describe('given empty value instead of Message.payload with unsupported schema format', function () {
  it('should replace empty value with generic element', async function () {
    const yamlDefinition = dedent`
          asyncapi: 2.5.0
          components:
            messages:
                userSignUp:
                  schemaFormat: application/vnd.apache.avro;version=1.9.0
                  payload:
        `;
    const apiDOM = await parse(yamlDefinition);
    const asyncApiElement = AsyncApi2Element.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    });

    expect(sexprs(asyncApiElement)).toMatchSnapshot();
  });
});

describe('given empty value instead for AsyncAPI.components.schemas', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          asyncapi: 2.5.0
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

describe('given empty value instead for AsyncAPI.components.schemas.*', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          asyncapi: 2.5.0
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

describe('given empty value instead for Schema.properties.*', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          asyncapi: 2.5.0
          components:
            schemas:
              User:
                properties:
                  firstName:
        `;
    const apiDOM = await parse(yamlDefinition);
    const asyncApiElement = AsyncApi2Element.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    }) as AsyncApi2Element;

    expect(sexprs(asyncApiElement)).toMatchSnapshot();
  });
});

describe('given AsyncAPI definition with no empty values', function () {
  it('should do nothing', async function () {
    const yamlDefinition = dedent`
          asyncapi: 2.5.0
          id: urn:com:smartylighting:streetlights:server
        `;
    const apiDOM = await parse(yamlDefinition);
    const asyncApiElement = AsyncApi2Element.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    }) as AsyncApi2Element;

    expect(sexprs(asyncApiElement)).toMatchSnapshot();
  });
});

describe('given AsyncAPI definition with empty values', function () {
  it('should generate proper source maps', async function () {
    const yamlDefinition = dedent`
          asyncapi: 2.5.0
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
    expect(positionStart.equals(expectedPosition)).to.be.true;
    expect(positionEnd.equals(expectedPosition)).to.be.true;
  });
});
