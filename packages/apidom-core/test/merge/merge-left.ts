import { assert } from 'chai';

import { toValue, ObjectElement, mergeLeft } from '../../src';

/**
 * mergeLeft is just a specialization of mergeRight. We don't need tests here
 * as they would become redundant with mergeRight tests.
 */
describe('mergeLeft', function () {
  it('should merge existing simple keys in target at the roots', function () {
    const source = new ObjectElement({ key1: 'changed', key2: 'value2' });
    const target = new ObjectElement({ key1: 'value1', key3: 'value3' });
    const merged = mergeLeft(target, source);
    const expected = {
      key1: 'value1',
      key2: 'value2',
      key3: 'value3',
    };

    assert.deepEqual(
      toValue(target),
      { key1: 'value1', key3: 'value3' },
      'merge should be immutable',
    );
    assert.deepEqual(toValue(merged), expected);
  });

  it('mergeLeft.all', function () {
    const source = new ObjectElement({ key1: 'changed', key2: 'value2' });
    const target = new ObjectElement({ key1: 'value1', key3: 'value3' });
    const merged = mergeLeft.all([target, source]);
    const expected = {
      key1: 'value1',
      key2: 'value2',
      key3: 'value3',
    };

    assert.deepEqual(
      toValue(target),
      { key1: 'value1', key3: 'value3' },
      'merge should be immutable',
    );
    assert.deepEqual(toValue(merged), expected);
  });
});
