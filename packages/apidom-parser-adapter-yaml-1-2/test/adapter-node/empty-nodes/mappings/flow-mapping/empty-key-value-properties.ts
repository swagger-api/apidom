import { assert } from 'chai';
import { includesClasses, hasElementSourceMap } from '@swagger-api/apidom-core';

import * as adapter from '../../../../../src/adapter-node.ts';

const setupMemberElement = async (): Promise<any> => {
  const yamlSource = '{!str &anchor : !str &anchor}';
  const { result } = await adapter.parse(yamlSource, { sourceMap: true });
  // @ts-ignore
  return result.content[0];
};
const setupEmptyKeyElement = async () => (await setupMemberElement()).key;
const setupEmptyValueElement = async () => (await setupMemberElement()).value;

describe('given flow mapping pair containing empty fields and explicit tag and anchor', function () {
  it('should create empty key element', async function () {
    const emptyElement = await setupEmptyKeyElement();

    assert.isTrue(includesClasses(['yaml-e-node', 'yaml-e-scalar'], emptyElement));
  });

  it('should generate source maps for empty key', async function () {
    const emptyElement = await setupEmptyKeyElement();

    assert.isTrue(hasElementSourceMap(emptyElement));
  });

  it('should generate proper source map start position for empty key', async function () {
    const emptyElement = await setupEmptyKeyElement();
    const { startPositionRow, startPositionColumn, startIndex } = emptyElement;

    assert.strictEqual(startPositionRow, 0);
    assert.strictEqual(startPositionColumn, 13);
    assert.strictEqual(startIndex, 13);
  });

  it('should generate proper source map end position for empty key', async function () {
    const emptyElement = await setupEmptyKeyElement();
    const { endPositionRow, endPositionColumn, endIndex } = emptyElement;

    assert.strictEqual(endPositionRow, 0);
    assert.strictEqual(endPositionColumn, 13);
    assert.strictEqual(endIndex, 13);
  });

  it('should create empty value element', async function () {
    const emptyElement = await setupEmptyValueElement();

    assert.isTrue(includesClasses(['yaml-e-node', 'yaml-e-scalar'], emptyElement));
  });

  it('should generate source maps for empty value', async function () {
    const emptyElement = await setupEmptyValueElement();

    assert.isTrue(hasElementSourceMap(emptyElement));
  });

  it('should generate proper source map start position for empty value', async function () {
    const emptyElement = await setupEmptyValueElement();
    const { startPositionRow, startPositionColumn, startIndex } = emptyElement;

    assert.strictEqual(startPositionRow, 0);
    assert.strictEqual(startPositionColumn, 28);
    assert.strictEqual(startIndex, 28);
  });

  it('should generate proper source map end position for empty value', async function () {
    const emptyElement = await setupEmptyValueElement();
    const { endPositionRow, endPositionColumn, endIndex } = emptyElement;

    assert.strictEqual(endPositionRow, 0);
    assert.strictEqual(endPositionColumn, 28);
    assert.strictEqual(endIndex, 28);
  });
});
