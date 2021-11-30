import { assert } from 'chai';
import { includesClasses, SourceMapElement } from '@swagger-api/apidom-core';

import * as adapter from '../../../../../src/adapter-node';

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
    const sourceMapElement = emptyElement.meta.get('sourceMap');

    assert.instanceOf(sourceMapElement, SourceMapElement);
  });

  it('should generate proper source map start position', async function () {
    const emptyElement = await setupEmptyElement();
    const sourceMapElement = emptyElement.meta.get('sourceMap');
    const [row, column, char] = [
      sourceMapElement.positionStart.get(0).toValue(),
      sourceMapElement.positionStart.get(1).toValue(),
      sourceMapElement.positionStart.get(2).toValue(),
    ];

    assert.strictEqual(row, 0);
    assert.strictEqual(column, 13);
    assert.strictEqual(char, 13);
  });

  it('should generate proper source map end position', async function () {
    const emptyElement = await setupEmptyElement();
    const sourceMapElement = emptyElement.meta.get('sourceMap');
    const [row, column, char] = [
      sourceMapElement.positionEnd.get(0).toValue(),
      sourceMapElement.positionEnd.get(1).toValue(),
      sourceMapElement.positionEnd.get(2).toValue(),
    ];

    assert.strictEqual(row, 0);
    assert.strictEqual(column, 13);
    assert.strictEqual(char, 13);
  });
});
