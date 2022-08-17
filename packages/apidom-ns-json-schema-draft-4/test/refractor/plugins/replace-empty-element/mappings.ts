import { expect } from 'chai';
import dedent from 'dedent';
import { sexprs, SourceMapElement } from '@swagger-api/apidom-core';
import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import { refractorPluginReplaceEmptyElement, JSONSchemaElement } from '../../../../src';

describe('given empty value for field additionalItems', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          $schema: 'http://json-schema.org/draft-04/schema#'
          additionalItems:
        `;
    const apiDOM = await parse(yamlDefinition);
    const jsonSchemaElement = JSONSchemaElement.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    });

    expect(sexprs(jsonSchemaElement)).toMatchSnapshot();
  });
});

describe('given empty value for field patternProperties', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          $schema: 'http://json-schema.org/draft-04/schema#'
          patternProperties:
        `;
    const apiDOM = await parse(yamlDefinition);
    const jsonSchemaElement = JSONSchemaElement.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    });

    expect(sexprs(jsonSchemaElement)).toMatchSnapshot();
  });
});

describe('given empty value for field enum', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          $schema: 'http://json-schema.org/draft-04/schema#'
          enum:
        `;
    const apiDOM = await parse(yamlDefinition);
    const jsonSchemaElement = JSONSchemaElement.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    });

    expect(sexprs(jsonSchemaElement)).toMatchSnapshot();
  });
});

describe('given empty value for properties field', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          $schema: 'http://json-schema.org/draft-04/schema#'
          properties:
            prop1:
        `;
    const apiDOM = await parse(yamlDefinition);
    const jsonSchemaElement = JSONSchemaElement.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    }) as JSONSchemaElement;

    expect(sexprs(jsonSchemaElement)).toMatchSnapshot();
  });
});

describe('given empty value for LinkDescription.targetSchema field', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          $schema: 'http://json-schema.org/draft-04/schema#'
          links:
            - targetSchema:
        `;
    const apiDOM = await parse(yamlDefinition);
    const jsonSchemaElement = JSONSchemaElement.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    }) as JSONSchemaElement;

    expect(sexprs(jsonSchemaElement)).toMatchSnapshot();
  });
});

describe('given empty value for LinkDescription.schema field', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          $schema: 'http://json-schema.org/draft-04/schema#'
          links:
            - schema:
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
          $schema: 'http://json-schema.org/draft-04/schema#'
          properties:
            prop1: {}
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
          $schema: 'http://json-schema.org/draft-04/schema#'
          properties:
        `;
    const apiDOM = await parse(yamlDefinition, { sourceMap: true });
    const jsonSchemaElement = JSONSchemaElement.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    }) as JSONSchemaElement;
    const { properties: propertiesValue } = jsonSchemaElement;
    const sourceMap = propertiesValue?.meta.get('sourceMap');
    const { positionStart, positionEnd } = sourceMap;
    const expectedPosition = [1, 11, 62];

    expect(propertiesValue?.meta.get('sourceMap')).to.be.an.instanceof(SourceMapElement);
    expect(positionStart.equals(expectedPosition)).to.be.true;
    expect(positionEnd.equals(expectedPosition)).to.be.true;
  });
});
