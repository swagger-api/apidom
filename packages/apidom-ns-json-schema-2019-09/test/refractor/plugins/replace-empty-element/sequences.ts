import { expect } from 'chai';
import dedent from 'dedent';
import { sexprs, SourceMapElement } from '@swagger-api/apidom-core';
import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import { refractorPluginReplaceEmptyElement, JSONSchemaElement } from '../../../../src/index.ts';

describe('given empty value for field allOf', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          $schema: 'https://json-schema.org/draft/2019-09/schema'
          allOf:
           -
        `;
    const apiDOM = await parse(yamlDefinition);
    const jsonSchema = JSONSchemaElement.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    });

    expect(sexprs(jsonSchema)).toMatchSnapshot();
  });
});

describe('given empty value for field anyOf', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          $schema: 'https://json-schema.org/draft/2019-09/schema'
          anyOf:
           -
           -
        `;
    const apiDOM = await parse(yamlDefinition);
    const jsonSchema = JSONSchemaElement.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    });

    expect(sexprs(jsonSchema)).toMatchSnapshot();
  });
});

describe('given empty value for field oneOf', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          $schema: 'https://json-schema.org/draft/2019-09/schema'
          oneOf:
           -
           -
        `;
    const apiDOM = await parse(yamlDefinition);
    const jsonSchema = JSONSchemaElement.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    });

    expect(sexprs(jsonSchema)).toMatchSnapshot();
  });
});

describe('given empty value for field examples', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          $schema: 'https://json-schema.org/draft/2019-09/schema'
          examples:
        `;
    const apiDOM = await parse(yamlDefinition);
    const jsonSchema = JSONSchemaElement.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    });

    expect(sexprs(jsonSchema)).toMatchSnapshot();
  });
});

describe('given empty value for field type', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          $schema: 'https://json-schema.org/draft/2019-09/schema'
          type:
        `;
    const apiDOM = await parse(yamlDefinition);
    const jsonSchema = JSONSchemaElement.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    });

    expect(sexprs(jsonSchema)).toMatchSnapshot();
  });
});

describe('given empty value for LinkDescription.templateRequired field', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          $schema: 'https://json-schema.org/draft/2019-09/schema'
          links:
            - templateRequired:
        `;
    const apiDOM = await parse(yamlDefinition);
    const jsonSchemaElement = JSONSchemaElement.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    }) as JSONSchemaElement;

    expect(sexprs(jsonSchemaElement)).toMatchSnapshot();
  });
});

describe('given JSON Schema definition with no empty values', function () {
  it('should do nothing', async function () {
    const yamlDefinition = dedent`
          $schema: 'https://json-schema.org/draft/2019-09/schema'
          oneOf:
           - {}
           - {}
        `;
    const apiDOM = await parse(yamlDefinition);
    const jsonSchemaElement = JSONSchemaElement.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    }) as JSONSchemaElement;

    expect(sexprs(jsonSchemaElement)).toMatchSnapshot();
  });
});

describe('given JSON Schema definition with empty values', function () {
  it('should generate proper source maps', async function () {
    const yamlDefinition = dedent`
          $schema: 'https://json-schema.org/draft/2019-09/schema'
          oneOf:
           -
        `;
    const apiDOM = await parse(yamlDefinition, { sourceMap: true });
    const jsonSchemaElement = JSONSchemaElement.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    }) as JSONSchemaElement;
    const { oneOf: oneOfValue } = jsonSchemaElement;
    const sourceMap = oneOfValue?.get(0)?.meta.get('sourceMap');
    const { positionStart, positionEnd } = sourceMap;
    const expectedPosition = [2, 2, 65];

    expect(oneOfValue?.meta.get('sourceMap')).to.be.an.instanceof(SourceMapElement);
    expect(positionStart.equals(expectedPosition)).to.be.true;
    expect(positionEnd.equals(expectedPosition)).to.be.true;
  });
});
