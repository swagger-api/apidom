import { assert } from 'chai';
import { includesClasses, hasElementSourceMap } from '@swagger-api/apidom-core';

import * as adapter from '../../../../../src/adapter-node.ts';

const setupMemberElement = async (): Promise<any> => {
  const yamlSource = '!str &anchor';
  const { result } = await adapter.parse(yamlSource, { sourceMap: true });
  return result;
};

describe('given empty flow scalar node with and explicit tag and anchor', function () {
  it('should create empty element', async function () {
    const emptyElement = await setupMemberElement();

    assert.isTrue(includesClasses(['yaml-e-node', 'yaml-e-scalar'], emptyElement));
  });

  it('should generate source maps', async function () {
    const emptyElement = await setupMemberElement();

    assert.isTrue(hasElementSourceMap(emptyElement));
  });

  it('should generate proper source map start position', async function () {
    const emptyElement = await setupMemberElement();
    const { startPositionRow, startPositionColumn, startIndex } = emptyElement;

    assert.strictEqual(startPositionRow, 0);
    assert.strictEqual(startPositionColumn, 12);
    assert.strictEqual(startIndex, 12);
  });

  it('should generate proper source map end position', async function () {
    const emptyElement = await setupMemberElement();
    const { endPositionRow, endPositionColumn, endIndex } = emptyElement;

    assert.strictEqual(endPositionRow, 0);
    assert.strictEqual(endPositionColumn, 12);
    assert.strictEqual(endIndex, 12);
  });
});
