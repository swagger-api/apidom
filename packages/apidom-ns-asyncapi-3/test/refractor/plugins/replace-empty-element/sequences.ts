import { expect } from 'chai';
import dedent from 'dedent';
import { sexprs } from '@swagger-api/apidom-core';
import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import { refractorPluginReplaceEmptyElement, AsyncApi3Element } from '../../../../src/index.ts';

describe('given empty value instead of SecuritySchemeElement', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          asyncapi: 3.0.0
          servers:
            server1:
              security:
                -
        `;
    const apiDOM = await parse(yamlDefinition);
    const asyncApiElement = AsyncApi3Element.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    });

    expect(sexprs(asyncApiElement)).toMatchSnapshot();
  });
});

describe('given empty values instead of OperationTraitElement', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
          asyncapi: 3.0.0
          channels:
            "user/subscribe":
              traits:
                -
        `;
    const apiDOM = await parse(yamlDefinition);
    const asyncApiElement = AsyncApi3Element.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    });

    expect(sexprs(asyncApiElement)).toMatchSnapshot();
  });
});

describe('given empty values instead of ReferenceElement', function () {
  it('should replace empty values with semantic elements', async function () {
    const yamlDefinition = dedent`
          asyncapi: 3.0.0
          channels:
            "user/subscribe":
              subscribe:
                messages:
                  -
                  -
        `;
    const apiDOM = await parse(yamlDefinition);
    const asyncApiElement = AsyncApi3Element.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    });

    expect(sexprs(asyncApiElement)).toMatchSnapshot();
  });
});

describe('given empty values instead of TagElement', function () {
  it('should replace empty values with semantic elements', async function () {
    const yamlDefinition = dedent`
          asyncapi: 3.0.0
          channels:
            "user/subscribe":
              traits:
                -
                  tags:
                    -
                    -
        `;
    const apiDOM = await parse(yamlDefinition);
    const asyncApiElement = AsyncApi3Element.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    });

    expect(sexprs(asyncApiElement)).toMatchSnapshot();
  });
});

describe('given empty values instead of SchemaElement for allOf keyword', function () {
  it('should replace empty values with semantic elements', async function () {
    const yamlDefinition = dedent`
          asyncapi: 3.0.0
          components:
            schemas:
              Schema1:
                allOf:
                 -
                 -
        `;
    const apiDOM = await parse(yamlDefinition);
    const asyncApiElement = AsyncApi3Element.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    });

    expect(sexprs(asyncApiElement)).toMatchSnapshot();
  });
});
