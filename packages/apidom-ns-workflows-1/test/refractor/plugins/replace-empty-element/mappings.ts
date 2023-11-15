import { expect } from 'chai';
import dedent from 'dedent';
import { sexprs, SourceMapElement } from '@swagger-api/apidom-core';
import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import {
  refractorPluginReplaceEmptyElement,
  WorkflowsSpecification1Element,
} from '../../../../src';

describe('given empty value instead of InfoElement', function () {
  it('should replace empty value with semantic element', async function () {
    const yamlDefinition = dedent`
      workflowsSpec: 1.0.0
      info:
    `;
    const apiDOM = await parse(yamlDefinition);
    const workflowsSpecificationElement = WorkflowsSpecification1Element.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    });

    expect(sexprs(workflowsSpecificationElement)).toMatchSnapshot();
  });
});

describe('given Workflows definition with empty values', function () {
  it('should generate proper source maps', async function () {
    const yamlDefinition = dedent`
          workflowsSpec: 1.0.0
          info:
        `;
    const apiDOM = await parse(yamlDefinition, { sourceMap: true });
    const workflowsSpecificationElement = WorkflowsSpecification1Element.refract(apiDOM.result, {
      plugins: [refractorPluginReplaceEmptyElement()],
    }) as WorkflowsSpecification1Element;
    const { info: infoValue } = workflowsSpecificationElement;
    const sourceMap = infoValue?.meta.get('sourceMap');
    const { positionStart, positionEnd } = sourceMap;
    const expectedPosition = [1, 5, 26];

    expect(infoValue?.meta.get('sourceMap')).to.be.an.instanceof(SourceMapElement);
    expect(positionStart.equals(expectedPosition)).to.be.true;
    expect(positionEnd.equals(expectedPosition)).to.be.true;
  });
});
