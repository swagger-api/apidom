import { assert } from 'chai';
import { includesClasses, hasElementSourceMap } from '@swagger-api/apidom-core';

import * as adapter from '../../../../../src/adapter-node.ts';

const setupEmptyElement = async () => {
  const yamlSource = '{key: !str &anchor}';
  const { result } = await adapter.parse(yamlSource, { sourceMap: true });
  // @ts-ignore
  return result.get('key');
};

describe('given empty node with tag and anchor as flow mapping value', function () {
  it('should create empty element', async function () {
    const emptyElement = await setupEmptyElement();

    assert.isTrue(includesClasses(['yaml-e-node', 'yaml-e-scalar'], emptyElement));
  });

  it('should generate source maps', async function () {
    const emptyElement = await setupEmptyElement();

    assert.isTrue(hasElementSourceMap(emptyElement));
  });

  it('should generate proper source map start position', async function () {
    const emptyElement = await setupEmptyElement();
    const { startPositionRow, startPositionColumn, startIndex } = emptyElement;

    assert.strictEqual(startPositionRow, 0);
    assert.strictEqual(startPositionColumn, 18);
    assert.strictEqual(startIndex, 18);
  });

  it('should generate proper source map end position', async function () {
    const emptyElement = await setupEmptyElement();
    const { endPositionRow, endPositionColumn, endIndex } = emptyElement;

    assert.strictEqual(endPositionRow, 0);
    assert.strictEqual(endPositionColumn, 18);
    assert.strictEqual(endIndex, 18);
  });
});
