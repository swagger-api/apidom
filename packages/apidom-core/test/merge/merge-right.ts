import { assert } from 'chai';

import {
  toValue,
  Element,
  ObjectElement,
  ArrayElement,
  StringElement,
  isObjectElement,
  mergeRight,
} from '../../src';

describe('mergeRight', function () {
  it('should add keys in target that do not exist at the root', function () {
    const source = new ObjectElement({ key1: 'value1', key2: 'value2' });
    const target = new ObjectElement({});
    const merged = mergeRight(target, source);

    assert.deepEqual(toValue(target), {}, 'merge should be immutable');
    assert.deepEqual(toValue(merged), toValue(source));
  });

  it('should merge existing simple keys in target at the roots', function () {
    const source = new ObjectElement({ key1: 'changed', key2: 'value2' });
    const target = new ObjectElement({ key1: 'value1', key3: 'value3' });
    const merged = mergeRight(target, source);
    const expected = {
      key1: 'changed',
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

  it('should shallow merge source into target', function () {
    const source = new ObjectElement({
      key1: {
        subkey1: 'changed',
        subkey3: 'added',
      },
    });
    const target = new ObjectElement({
      key1: {
        subkey1: 'value1',
        subkey2: 'value2',
      },
    });
    const merged = mergeRight(target, source);
    const expected = {
      key1: {
        subkey1: 'changed',
        subkey3: 'added',
      },
    };

    assert.deepEqual(
      toValue(target),
      {
        key1: {
          subkey1: 'value1',
          subkey2: 'value2',
        },
      },
      'merge should be immutable',
    );
    assert.deepEqual(toValue(merged), expected);
  });

  it('should replace simple key with nested object in target', function () {
    const source = new ObjectElement({
      key1: {
        subkey1: 'subvalue1',
        subkey2: 'subvalue2',
      },
    });
    const target = new ObjectElement({
      key1: 'value1',
      key2: 'value2',
    });
    const merged = mergeRight(target, source);
    const expected = {
      key1: {
        subkey1: 'subvalue1',
        subkey2: 'subvalue2',
      },
      key2: 'value2',
    };

    assert.deepEqual(toValue(target), { key1: 'value1', key2: 'value2' });
    assert.deepEqual(toValue(merged), expected);
  });

  it('should add nested object in target', function () {
    const source = new ObjectElement({
      b: {
        c: {},
      },
    });
    const target = new ObjectElement({
      a: {},
    });
    const merged = mergeRight(target, source);
    const expected = {
      a: {},
      b: {
        c: {},
      },
    };

    assert.deepEqual(toValue(merged), expected);
  });

  it('should not clone source and target', function () {
    const source = new ObjectElement({
      b: {
        c: 'foo',
      },
    });
    const target = new ObjectElement({
      a: {
        d: 'bar',
      },
    });
    const merged = mergeRight(target, source) as ObjectElement;
    const expected = {
      a: {
        d: 'bar',
      },
      b: {
        c: 'foo',
      },
    };

    assert.deepEqual(toValue(merged), expected);
    assert.strictEqual(merged.get('a'), target.get('a'));
    assert.strictEqual(merged.get('b'), source.get('b'));
  });

  it('should replace object with simple key in target', function () {
    const source = new ObjectElement({ key1: 'value1' });
    const target = new ObjectElement({
      key1: {
        subkey1: 'subvalue1',
        subkey2: 'subvalue2',
      },
      key2: 'value2',
    });
    const merged = mergeRight(target, source);
    const expected = { key1: 'value1', key2: 'value2' };

    assert.deepEqual(toValue(target), {
      key1: {
        subkey1: 'subvalue1',
        subkey2: 'subvalue2',
      },
      key2: 'value2',
    });
    assert.deepEqual(toValue(merged), expected);
  });

  it('should replace objects with arrays', function () {
    const target = new ObjectElement({ key1: { subkey: 'one' } });
    const source = new ObjectElement({ key1: ['subkey'] });
    const merged = mergeRight(target, source);
    const expected = { key1: ['subkey'] };

    assert.deepEqual(toValue(merged), expected);
  });

  it('should replace arrays with objects', function () {
    const target = new ObjectElement({ key1: ['subkey'] });
    const source = new ObjectElement({ key1: { subkey: 'one' } });
    const merged = mergeRight(target, source);
    const expected = { key1: { subkey: 'one' } };

    assert.deepEqual(toValue(merged), expected);
  });

  it('should replace null with arrays', function () {
    const target = new ObjectElement({
      key1: null,
    });
    const source = new ObjectElement({
      key1: ['subkey'],
    });
    const merged = mergeRight(target, source);
    const expected = {
      key1: ['subkey'],
    };

    assert.deepEqual(toValue(merged), expected);
  });

  it('should work on simple array', function () {
    const source = new ArrayElement(['one', 'three']);
    const target = new ArrayElement(['one', 'two']);
    const merged = mergeRight(target, source);
    const expected = ['one', 'two', 'one', 'three'];

    assert.deepEqual(toValue(merged), expected);
    assert.instanceOf(merged, ArrayElement);
  });

  it('should work on another simple array', function () {
    const target = new ArrayElement(['a1', 'a2', 'c1', 'f1', 'p1']);
    const source = new ArrayElement(['t1', 's1', 'c2', 'r1', 'p2', 'p3']);
    const merged = mergeRight(target, source);
    const expected = ['a1', 'a2', 'c1', 'f1', 'p1', 't1', 's1', 'c2', 'r1', 'p2', 'p3'];

    assert.deepEqual(toValue(target), ['a1', 'a2', 'c1', 'f1', 'p1'], 'merge should be immutable');
    assert.deepEqual(toValue(merged), expected);
    assert.instanceOf(merged, ArrayElement);
  });

  it('should work on array properties', function () {
    const source = new ObjectElement({
      key1: ['one', 'three'],
      key2: ['four'],
    });
    const target = new ObjectElement({
      key1: ['one', 'two'],
    });
    const merged = mergeRight(target, source) as ObjectElement;
    const expected = {
      key1: ['one', 'three'],
      key2: ['four'],
    };

    assert.deepEqual(toValue(merged), expected);
    assert.instanceOf(merged.get('key1'), ArrayElement);
    assert.instanceOf(merged.get('key2'), ArrayElement);
    assert.strictEqual(merged.get('key1'), source.get('key1'), 'should be copied by reference');
    assert.strictEqual(merged.get('key2'), source.get('key2'), 'should be copied by reference');
  });

  it('should work on array of objects', function () {
    const source = new ArrayElement([
      { key1: ['one', 'three'], key2: ['one'] },
      { key3: ['five'] },
    ]);
    const target = new ArrayElement([{ key1: ['one', 'two'] }, { key3: ['four'] }]);
    const merged = mergeRight(target, source) as ArrayElement;
    const expected = [
      { key1: ['one', 'two'] },
      { key3: ['four'] },
      { key1: ['one', 'three'], key2: ['one'] },
      { key3: ['five'] },
    ];

    assert.deepEqual(toValue(merged), expected);
    assert.instanceOf(merged, ArrayElement, 'result should be an array');
    assert.instanceOf(merged.get(0).get('key1'), ArrayElement, 'subkey should be an array too');
    assert.notStrictEqual(merged.get(0).get('key1'), source.get(0).get('key1'), 'should be cloned');
    assert.strictEqual(
      merged.get(0).get('key1'),
      target.get(0).get('key1'),
      'should be copied by reference',
    );
    assert.notStrictEqual(merged.get(0).get('key2'), source.get(0).get('key2'), 'should be cloned');
    assert.notStrictEqual(merged.get(1).get('key3'), source.get(1).get('key3'), 'should be cloned');
    assert.strictEqual(
      merged.get(1).get('key3'),
      target.get(1).get('key3'),
      'should be copied by reference',
    );
  });

  it('should work on custom element types', function () {
    class SourceElement extends ObjectElement {
      element = 'source';
    }
    class TargetElement extends ObjectElement {
      element = 'target';
    }
    class CustomArrayElement extends ArrayElement {
      element = 'customArrayElement';
    }

    const source = new SourceElement({
      key1: new CustomArrayElement(['one', 'three']),
      key2: new CustomArrayElement(['four']),
    });
    const target = new TargetElement({
      key1: new CustomArrayElement(['one', 'two']),
    });
    const merged = mergeRight(target, source) as ObjectElement;
    const expected = {
      key1: ['one', 'three'],
      key2: ['four'],
    };

    assert.deepEqual(toValue(merged), expected);
    assert.instanceOf(merged, TargetElement);
    assert.instanceOf(merged.get('key1'), CustomArrayElement);
    assert.instanceOf(merged.get('key2'), CustomArrayElement);
  });

  it("should clone array's element if it is object", function () {
    const a = new ObjectElement({ key: 'yup' });
    const target = new ArrayElement();
    const source = new ArrayElement([a]);
    const merged = mergeRight(target, source) as ArrayElement;

    assert.strictEqual(merged.get(0), a);
    assert.strictEqual(toValue(merged.get('0').get('key')), 'yup');
  });

  it('should clone an array property when there is no target array', function () {
    const someObject = new ObjectElement();
    const target = new ObjectElement();
    const source = new ObjectElement({ ary: [someObject] });
    const merged = mergeRight(target, source) as ObjectElement;

    assert.deepEqual(toValue(merged), { ary: [{}] });
    assert.strictEqual(merged.get('ary').get(0), someObject);
  });

  it('should overwrite values when property is initialised but undefined', function () {
    const target1 = new ObjectElement({ value: [] });
    const target2 = new ObjectElement({ value: null });
    const target3 = new ObjectElement({ value: 2 });
    const source = new ObjectElement({ value: undefined });

    const hasUndefinedProperty = (merged: ObjectElement) => {
      assert.isTrue(merged.hasKey('value'));
      assert.isUndefined(merged.get('value'));
    };

    hasUndefinedProperty(mergeRight(target1, source) as ObjectElement);
    hasUndefinedProperty(mergeRight(target2, source) as ObjectElement);
    hasUndefinedProperty(mergeRight(target3, source) as ObjectElement);
  });

  it('should copy custom element types correctly in an array', function () {
    class DateElement extends StringElement {
      element = 'date';
    }

    const monday = new DateElement('2016-09-27T01:08:12.761Z');
    const tuesday = new DateElement('2016-09-28T01:18:12.761Z');

    const target = new ArrayElement([monday, 'dude']);
    const source = new ArrayElement([tuesday, 'lol']);

    const expected = ['2016-09-27T01:08:12.761Z', 'dude', '2016-09-28T01:18:12.761Z', 'lol'];
    const merged = mergeRight(target, source) as ArrayElement;

    assert.deepEqual(toValue(merged), expected);
    assert.strictEqual(merged.get(2), source.get(0), 'should not clone');
  });

  it('mergeRight.all', function () {
    const source = new ObjectElement({ key1: 'changed', key2: 'value2' });
    const target = new ObjectElement({ key1: 'value1', key3: 'value3' });
    const merged = mergeRight.all([target, source]);
    const expected = {
      key1: 'changed',
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

  context('given arrayElementMerge option', function () {
    specify('should allow custom merging of ArrayElements', function () {
      const arrayElementMerge = (destination: ArrayElement, source: ArrayElement) => source;
      const target = new ArrayElement([1, 2, 3]);
      const source = new ArrayElement([3, 2, 1]);
      const merged = mergeRight(target, source, { arrayElementMerge });

      assert.deepEqual(toValue(merged), [3, 2, 1]);
    });
  });

  context('given objectElementMerge option', function () {
    specify('should allow custom merging of ObjectElements', function () {
      const objectElementMerge = (destination: ObjectElement, source: ObjectElement) => source;
      const target = new ObjectElement({ a: 1, b: 2 });
      const source = new ObjectElement({ c: 3, d: 4 });
      const merged = mergeRight(target, source, { objectElementMerge });

      assert.deepEqual(toValue(merged), { c: 3, d: 4 });
    });
  });

  context('given isMergeableElement option', function () {
    specify('', function () {
      class CustomObjectElement extends ObjectElement {
        element = 'custom';
      }
      const instantiatedCustomObjectElement = new CustomObjectElement({ special: 'oh yeah' });

      const target = new ObjectElement({
        someProperty: {
          cool: 'oh for sure',
        },
      });
      const source = new ObjectElement({
        someProperty: instantiatedCustomObjectElement,
      });
      const isMergeableElement = (element: Element) =>
        isObjectElement(element) && !(element instanceof CustomObjectElement);
      const merged = mergeRight(target, source, {
        isMergeableElement,
      }) as ObjectElement;

      assert.instanceOf(merged.get('someProperty'), CustomObjectElement);
      assert.isUndefined(merged.get('someProperty').get('cool'));
      assert.strictEqual(toValue(merged.get('someProperty').get('special')), 'oh yeah');
    });
  });
});
