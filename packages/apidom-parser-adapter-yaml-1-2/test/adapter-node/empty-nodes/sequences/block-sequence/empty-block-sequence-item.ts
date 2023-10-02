import { assert } from 'chai';
import { includesClasses, toValue, SourceMapElement } from '@swagger-api/apidom-core';

import * as adapter from '../../../../../src/adapter-node';

const setupEmptyElement = async () => {
  const yamlSource = '-';
  const { result } = await adapter.parse(yamlSource, { sourceMap: true });
  // @ts-ignore
  return result.get(0);
};

describe('given empty node as block sequence item', function () {
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
      toValue(sourceMapElement.positionStart.get(0)),
      toValue(sourceMapElement.positionStart.get(1)),
      toValue(sourceMapElement.positionStart.get(2)),
    ];

    assert.strictEqual(row, 0);
    assert.strictEqual(column, 1);
    assert.strictEqual(char, 1);
  });

  it('should generate proper source map end position', async function () {
    const emptyElement = await setupEmptyElement();
    const sourceMapElement = emptyElement.meta.get('sourceMap');
    const [row, column, char] = [
      toValue(sourceMapElement.positionEnd.get(0)),
      toValue(sourceMapElement.positionEnd.get(1)),
      toValue(sourceMapElement.positionEnd.get(2)),
    ];

    assert.strictEqual(row, 0);
    assert.strictEqual(column, 1);
    assert.strictEqual(char, 1);
  });
});
