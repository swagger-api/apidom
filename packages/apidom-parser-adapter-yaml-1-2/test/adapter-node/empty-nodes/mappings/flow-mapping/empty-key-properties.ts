import { assert } from 'chai';
import { includesClasses, hasElementSourceMap } from '@swagger-api/apidom-core';

import * as adapter from '../../../../../src/adapter-node.ts';

const setupEmptyElement = async () => {
  const yamlSource = '{!str &anchor : value}';
  const { result } = await adapter.parse(yamlSource, { sourceMap: true });
  // @ts-ignore
  return result.getMember('').key;
};

describe('given empty node with tag and anchor as flow mapping key', function () {
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
    assert.strictEqual(startPositionColumn, 13);
    assert.strictEqual(startIndex, 13);
  });

  it('should generate proper source map end position', async function () {
    const emptyElement = await setupEmptyElement();
    const { endPositionRow, endPositionColumn, endIndex } = emptyElement;

    assert.strictEqual(endPositionRow, 0);
    assert.strictEqual(endPositionColumn, 13);
    assert.strictEqual(endIndex, 13);
  });
});
