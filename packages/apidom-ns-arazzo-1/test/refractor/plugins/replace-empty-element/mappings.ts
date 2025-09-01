import { expect } from 'chai';
import dedent from 'dedent';
import { sexprs } from '@swagger-api/apidom-core';
import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import {
  refractorPluginReplaceEmptyElement,
  ArazzoSpecification1Element,
} from '../../../../src/index.ts';

describe('given empty value instead of InfoElement', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
      arazzo: 1.0.1
      info:
    `;
    const apiDOM = await parse(yamlDefinition);
    const workflowsSpecificationElement = ArazzoSpecification1Element.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    });

    expect(sexprs(workflowsSpecificationElement)).toMatchSnapshot();
  });
});

describe('given Workflows definition with empty values', function () {
  it('should generate proper source maps', async function () {
    const yamlDefinition = dedent`
          arazzo: 1.0.1
          info:
        `;
    const apiDOM = await parse(yamlDefinition, { sourceMap: true });
    const workflowsSpecificationElement = ArazzoSpecification1Element.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    }) as ArazzoSpecification1Element;
    const { info: infoValue } = workflowsSpecificationElement;

    expect(infoValue?.startPositionRow).to.equal(1);
    expect(infoValue?.startPositionColumn).to.equal(5);
    expect(infoValue?.startIndex).to.equal(19);
    expect(infoValue?.endPositionRow).to.equal(1);
    expect(infoValue?.endPositionColumn).to.equal(5);
    expect(infoValue?.endIndex).to.equal(19);
  });
});
