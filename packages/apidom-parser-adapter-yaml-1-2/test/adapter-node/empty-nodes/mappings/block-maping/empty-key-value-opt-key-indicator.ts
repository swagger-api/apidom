import { assert } from 'chai';
import dedent from 'dedent';
import { includesClasses, hasElementSourceMap } from '@swagger-api/apidom-core';

import * as adapter from '../../../../../src/adapter-node.ts';

const setupMemberElement = async (): Promise<any> => {
  const yamlSource = dedent`
    key: value
    ?
  `;
  const { result } = await adapter.parse(yamlSource, { sourceMap: true });
  // @ts-ignore
  return result.content[1];
};
const setupEmptyKeyElement = async () => (await setupMemberElement()).key;
const setupEmptyValueElement = async () => (await setupMemberElement()).value;

describe('given block mapping pair specified as optional “?” mapping key indicator', function () {
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

    assert.strictEqual(startPositionRow, 1);
    assert.strictEqual(startPositionColumn, 0);
    assert.strictEqual(startIndex, 11);
  });

  it('should generate proper source map end position for empty key', async function () {
    const emptyElement = await setupEmptyKeyElement();
    const { endPositionRow, endPositionColumn, endIndex } = emptyElement;

    assert.strictEqual(endPositionRow, 1);
    assert.strictEqual(endPositionColumn, 0);
    assert.strictEqual(endIndex, 11);
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

    assert.strictEqual(startPositionRow, 1);
    assert.strictEqual(startPositionColumn, 1);
    assert.strictEqual(startIndex, 12);
  });

  it('should generate proper source map end position for empty value', async function () {
    const emptyElement = await setupEmptyValueElement();
    const { endPositionRow, endPositionColumn, endIndex } = emptyElement;

    assert.strictEqual(endPositionRow, 1);
    assert.strictEqual(endPositionColumn, 1);
    assert.strictEqual(endIndex, 12);
  });
});
