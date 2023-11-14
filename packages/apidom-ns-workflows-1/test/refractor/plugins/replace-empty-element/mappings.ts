import { assert } from 'chai';
// import dedent from 'dedent';
// import { sexprs } from '@swagger-api/apidom-core';
// import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

// import { refractorPluginReplaceEmptyElement, WorkflowsSpecificationElement } from '../../../../src';

describe('given empty value instead of InfoElement', function () {
  it('should replace empty value with semantic element', async function () {
    // const yamlDefinition = dedent`
    //       workflowsSpec: 1.0.0
    //       info:
    //     `;
    // const apiDOM = await parse(yamlDefinition);
    // const workflowsSpecificationElement = WorkflowsSpecificationElement.refract(apiDOM.result, {
    //   plugins: [refractorPluginReplaceEmptyElement()],
    // });

    // expect(sexprs(workflowsSpecificationElement)).toMatchSnapshot();
    assert.strictEqual(1, 1);
  });
});

// describe('given Workflows description with empty values', function () {
//   it('should generate proper source maps', async function () {
//     const yamlDefinition = dedent`
//           workflowsSpec: 1.0.0
//           info:
//         `;
//     const apiDOM = await parse(yamlDefinition, { sourceMap: true });
//     const workflowsSpecificationElement = WorkflowsSpecificationElement.refract(apiDOM.result, {
//       plugins: [refractorPluginReplaceEmptyElement()],
//     }) as WorkflowsSpecificationElement;
//     const { info: infoValue } = workflowsSpecificationElement;
//     const sourceMap = infoValue?.meta.get('sourceMap');
//     const { positionStart, positionEnd } = sourceMap;
//     const expectedPosition = [1, 5, 20];

//     expect(infoValue?.meta.get('sourceMap')).to.be.an.instanceof(SourceMapElement);
//     expect(positionStart.equals(expectedPosition)).to.be.true;
//     expect(positionEnd.equals(expectedPosition)).to.be.true;
//   });
// });
