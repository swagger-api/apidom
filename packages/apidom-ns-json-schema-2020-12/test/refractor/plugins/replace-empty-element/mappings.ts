import { expect } from 'chai';
import dedent from 'dedent';
import { sexprs } from '@swagger-api/apidom-core';
import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import { refractorPluginReplaceEmptyElement, JSONSchemaElement } from '../../../../src/index.ts';

describe('given empty value for field items', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          $schema: 'https://json-schema.org/draft/2020-12/schema'
          items:
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
          $schema: 'https://json-schema.org/draft/2020-12/schema'
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
          $schema: 'https://json-schema.org/draft/2020-12/schema'
          enum:
        `;
    const apiDOM = await parse(yamlDefinition);
    const jsonSchemaElement = JSONSchemaElement.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    });

    expect(sexprs(jsonSchemaElement)).toMatchSnapshot();
  });
});

describe('given empty value instead for properties field keys', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          $schema: 'https://json-schema.org/draft/2020-12/schema'
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

describe('given empty value instead for contains field keys', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          $schema: 'https://json-schema.org/draft/2020-12/schema'
          contains:
        `;
    const apiDOM = await parse(yamlDefinition);
    const jsonSchemaElement = JSONSchemaElement.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    }) as JSONSchemaElement;

    expect(sexprs(jsonSchemaElement)).toMatchSnapshot();
  });
});

describe('given empty value for propertyNames field', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          $schema: 'https://json-schema.org/draft/2020-12/schema'
          propertyNames:
        `;
    const apiDOM = await parse(yamlDefinition);
    const jsonSchemaElement = JSONSchemaElement.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    }) as JSONSchemaElement;

    expect(sexprs(jsonSchemaElement)).toMatchSnapshot();
  });
});

describe('given empty value for if field', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          $schema: 'https://json-schema.org/draft/2020-12/schema'
          if:
        `;
    const apiDOM = await parse(yamlDefinition);
    const jsonSchemaElement = JSONSchemaElement.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    }) as JSONSchemaElement;

    expect(sexprs(jsonSchemaElement)).toMatchSnapshot();
  });
});

describe('given empty value for then field', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          $schema: 'https://json-schema.org/draft/2020-12/schema'
          then:
        `;
    const apiDOM = await parse(yamlDefinition);
    const jsonSchemaElement = JSONSchemaElement.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    }) as JSONSchemaElement;

    expect(sexprs(jsonSchemaElement)).toMatchSnapshot();
  });
});

describe('given empty value for else field', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          $schema: 'https://json-schema.org/draft/2020-12/schema'
          else:
        `;
    const apiDOM = await parse(yamlDefinition);
    const jsonSchemaElement = JSONSchemaElement.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    }) as JSONSchemaElement;

    expect(sexprs(jsonSchemaElement)).toMatchSnapshot();
  });
});

describe('given empty value for $vocabulary field', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          $schema: 'https://json-schema.org/draft/2020-12/schema'
          $vocabulary:
        `;
    const apiDOM = await parse(yamlDefinition);
    const jsonSchemaElement = JSONSchemaElement.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    }) as JSONSchemaElement;

    expect(sexprs(jsonSchemaElement)).toMatchSnapshot();
  });
});

describe('given empty value for unevaluatedItems field', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          $schema: 'https://json-schema.org/draft/2020-12/schema'
          unevaluatedItems:
        `;
    const apiDOM = await parse(yamlDefinition);
    const jsonSchemaElement = JSONSchemaElement.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    }) as JSONSchemaElement;

    expect(sexprs(jsonSchemaElement)).toMatchSnapshot();
  });
});

describe('given empty value for unevaluatedProperties field', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          $schema: 'https://json-schema.org/draft/2020-12/schema'
          unevaluatedProperties:
        `;
    const apiDOM = await parse(yamlDefinition);
    const jsonSchemaElement = JSONSchemaElement.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    }) as JSONSchemaElement;

    expect(sexprs(jsonSchemaElement)).toMatchSnapshot();
  });
});

describe('given empty value for $dependentRequired field', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          $schema: 'https://json-schema.org/draft/2020-12/schema'
          $dependentRequired:
        `;
    const apiDOM = await parse(yamlDefinition);
    const jsonSchemaElement = JSONSchemaElement.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    }) as JSONSchemaElement;

    expect(sexprs(jsonSchemaElement)).toMatchSnapshot();
  });
});

describe('given empty value for contentSchema field', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          $schema: 'https://json-schema.org/draft/2020-12/schema'
          contentSchema:
        `;
    const apiDOM = await parse(yamlDefinition);
    const jsonSchemaElement = JSONSchemaElement.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    }) as JSONSchemaElement;

    expect(sexprs(jsonSchemaElement)).toMatchSnapshot();
  });
});

describe('given empty value for LinkDescription.hrefSchema field', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          $schema: 'https://json-schema.org/draft/2020-12/schema'
          links:
            - hrefSchema:
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
          $schema: 'https://json-schema.org/draft/2020-12/schema'
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

describe('given empty value for LinkDescription.submissionSchema field', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          $schema: 'https://json-schema.org/draft/2020-12/schema'
          links:
            - submissionSchema:
        `;
    const apiDOM = await parse(yamlDefinition);
    const jsonSchemaElement = JSONSchemaElement.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    }) as JSONSchemaElement;

    expect(sexprs(jsonSchemaElement)).toMatchSnapshot();
  });
});

describe('given empty value for LinkDescription.templatePointers field', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          $schema: 'https://json-schema.org/draft/2020-12/schema'
          links:
            - templatePointers:
        `;
    const apiDOM = await parse(yamlDefinition);
    const jsonSchemaElement = JSONSchemaElement.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    }) as JSONSchemaElement;

    expect(sexprs(jsonSchemaElement)).toMatchSnapshot();
  });
});

describe('given empty value for LinkDescription.targetHints field', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          $schema: 'https://json-schema.org/draft/2020-12/schema'
          links:
            - targetHints:
        `;
    const apiDOM = await parse(yamlDefinition);
    const jsonSchemaElement = JSONSchemaElement.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    }) as JSONSchemaElement;

    expect(sexprs(jsonSchemaElement)).toMatchSnapshot();
  });
});

describe('given empty value for LinkDescription.headerSchema field', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          $schema: 'https://json-schema.org/draft/2020-12/schema'
          links:
            - headerSchema:
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
          $schema: 'https://json-schema.org/draft/2020-12/schema'
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
          $schema: 'https://json-schema.org/draft/2020-12/schema'
          properties:
        `;
    const apiDOM = await parse(yamlDefinition, { sourceMap: true });
    const jsonSchemaElement = JSONSchemaElement.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    }) as JSONSchemaElement;
    const { properties: propertiesValue } = jsonSchemaElement;

    expect(propertiesValue?.startPositionRow).to.equal(1);
    expect(propertiesValue?.startPositionColumn).to.equal(11);
    expect(propertiesValue?.startIndex).to.equal(67);
    expect(propertiesValue?.endPositionRow).to.equal(1);
    expect(propertiesValue?.endPositionColumn).to.equal(11);
    expect(propertiesValue?.endIndex).to.equal(67);
  });
});
