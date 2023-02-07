import { expect } from 'chai';
import dedent from 'dedent';
import { sexprs } from '@swagger-api/apidom-core';
import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import { refractorPluginReplaceEmptyElement, AsyncApi2Element } from '../../../../src';

describe('given empty value instead of SecurityRequirementElement', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          asyncapi: 2.6.0
          servers:
            server1:
              security:
                -
        `;
    const apiDOM = await parse(yamlDefinition);
    const asyncApiElement = AsyncApi2Element.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    });

    expect(sexprs(asyncApiElement)).toMatchSnapshot();
  });
});

describe('given empty value instead of OperationTraitElement', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          asyncapi: 2.6.0
          channels:
            "user/subscribe":
              subscribe:
                traits:
                  -
        `;
    const apiDOM = await parse(yamlDefinition);
    const asyncApiElement = AsyncApi2Element.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    });

    expect(sexprs(asyncApiElement)).toMatchSnapshot();
  });
});

describe('given multiple empty value instead of MessageElement', function () {
  it('should replace empty values with semantic elements', async function () {
    const yamlDefinition = dedent`
          asyncapi: 2.6.0
          channels:
            "user/subscribe":
              subscribe:
                message:
                  oneOf:
                    -
                    -
        `;
    const apiDOM = await parse(yamlDefinition);
    const asyncApiElement = AsyncApi2Element.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    });

    expect(sexprs(asyncApiElement)).toMatchSnapshot();
  });
});

describe('given multiple empty value instead of TagElement', function () {
  it('should replace empty values with semantic elements', async function () {
    const yamlDefinition = dedent`
          asyncapi: 2.6.0
          channels:
            "user/subscribe":
              subscribe:
                traits:
                  -
                    tags:
                      -

        `;
    const apiDOM = await parse(yamlDefinition);
    const asyncApiElement = AsyncApi2Element.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    });

    expect(sexprs(asyncApiElement)).toMatchSnapshot();
  });
});

describe('given empty values instead of SchemaElement for allOf keyword', function () {
  it('should replace empty values with semantic elements', async function () {
    const yamlDefinition = dedent`
          asyncapi: 2.6.0
          components:
            schemas:
              Schema1:
                allOf:
                 -
        `;
    const apiDOM = await parse(yamlDefinition);
    const asyncApiElement = AsyncApi2Element.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    });

    expect(sexprs(asyncApiElement)).toMatchSnapshot();
  });
});
