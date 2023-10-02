import { assert } from 'chai';
import { includesClasses, toValue, SourceMapElement } from '@swagger-api/apidom-core';

import * as adapter from '../../../../../src/adapter-node';

const setupMemberElement = async (): Promise<any> => {
  const yamlSource = ':';
  const { result } = await adapter.parse(yamlSource, { sourceMap: true });
  // @ts-ignore
  return result.content[0];
};
const setupEmptyKeyElement = async () => (await setupMemberElement()).key;
const setupEmptyValueElement = async () => (await setupMemberElement()).value;

describe('given block mapping pair with empty key and value', function () {
  it('should create empty key element', async function () {
    const emptyElement = await setupEmptyKeyElement();

    assert.isTrue(includesClasses(['yaml-e-node', 'yaml-e-scalar'], emptyElement));
  });

  it('should generate source maps for empty key', async function () {
    const emptyElement = await setupEmptyKeyElement();
    const sourceMapElement = emptyElement.meta.get('sourceMap');

    assert.instanceOf(sourceMapElement, SourceMapElement);
  });

  it('should generate proper source map start position for empty key', async function () {
    const emptyElement = await setupEmptyKeyElement();
    const sourceMapElement = emptyElement.meta.get('sourceMap');
    const [row, column, char] = [
      toValue(sourceMapElement.positionStart.get(0)),
      toValue(sourceMapElement.positionStart.get(1)),
      toValue(sourceMapElement.positionStart.get(2)),
    ];

    assert.strictEqual(row, 0);
    assert.strictEqual(column, 0);
    assert.strictEqual(char, 0);
  });

  it('should generate proper source map end position for empty key', async function () {
    const emptyElement = await setupEmptyKeyElement();
    const sourceMapElement = emptyElement.meta.get('sourceMap');
    const [row, column, char] = [
      toValue(sourceMapElement.positionEnd.get(0)),
      toValue(sourceMapElement.positionEnd.get(1)),
      toValue(sourceMapElement.positionEnd.get(2)),
    ];

    assert.strictEqual(row, 0);
    assert.strictEqual(column, 0);
    assert.strictEqual(char, 0);
  });

  it('should create empty value element', async function () {
    const emptyElement = await setupEmptyValueElement();

    assert.isTrue(includesClasses(['yaml-e-node', 'yaml-e-scalar'], emptyElement));
  });

  it('should generate source maps for empty value', async function () {
    const emptyElement = await setupEmptyValueElement();
    const sourceMapElement = emptyElement.meta.get('sourceMap');

    assert.instanceOf(sourceMapElement, SourceMapElement);
  });

  it('should generate proper source map start position for empty value', async function () {
    const emptyElement = await setupEmptyValueElement();
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

  it('should generate proper source map end position for empty value', async function () {
    const emptyElement = await setupEmptyValueElement();
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
