import { assert } from 'chai';

import {
  ObjectElement,
  ArrayElement,
  NumberElement,
  NullElement,
  StringElement,
  BooleanElement,
  ArraySlice,
  ObjectSlice,
  KeyValuePair,
  cloneDeep,
  cloneShallow,
  toValue,
} from '../src';

describe('clone', function () {
  context('cloneShallow', function () {
    specify('should shallow clone ObjectElement', function () {
      const valueElement = new ArrayElement([1]);
      const objectElement = new ObjectElement({ a: valueElement });
      const clone = cloneShallow(objectElement);

      objectElement.set('c', 'd');
      valueElement.push(2);

      assert.notStrictEqual(clone, objectElement);
      assert.deepEqual(toValue(clone), { a: [1, 2] });
    });

    specify('should shallow clone ArrayElement', function () {
      const firstItemElement = new ObjectElement({ a: 'b' });
      const arrayElement = new ArrayElement([firstItemElement, 2, 3]);
      const clone = cloneShallow(arrayElement);

      arrayElement.push(4);
      firstItemElement.set('a', 'c');

      assert.notStrictEqual(clone, arrayElement);
      assert.deepEqual(toValue(clone), [{ a: 'c' }, 2, 3]);
    });

    specify('should shallow clone NumberElement', function () {
      const numberElement = new NumberElement(1);
      const clone = cloneShallow(numberElement);

      assert.notStrictEqual(clone, numberElement);
      assert.strictEqual(toValue(clone), 1);
    });

    specify('should shallow clone NullElement', function () {
      const nullElement = new NullElement();
      const clone = cloneShallow(nullElement);

      assert.notStrictEqual(clone, nullElement);
      assert.strictEqual(toValue(clone), null);
    });

    specify('should shallow clone StringElement', function () {
      const stringElement = new StringElement('string');
      const clone = cloneShallow(stringElement);

      assert.notStrictEqual(clone, stringElement);
      assert.strictEqual(toValue(clone), 'string');
    });

    specify('should shallow clone BooleanElement', function () {
      const boolElement = new BooleanElement(true);
      const clone = cloneShallow(boolElement);

      assert.notStrictEqual(clone, boolElement);
      assert.strictEqual(toValue(clone), true);
    });

    specify('should shallow clone KeyValuePair', function () {
      const keyValuePair = new KeyValuePair(new StringElement('key'), new StringElement('value'));
      const clone = cloneShallow(keyValuePair);

      assert.notStrictEqual(clone, keyValuePair);
    });

    specify('should shallow clone ArraySlice', function () {
      const firstItemElement = new NumberElement(1);
      const arraySlice = new ArraySlice([firstItemElement, new NumberElement(2)]);
      const clone = cloneShallow(arraySlice);

      assert.notStrictEqual(clone, arraySlice);
      assert.strictEqual(clone.get(0), firstItemElement);
      assert.deepEqual([...clone], [...arraySlice]);
    });

    specify('should shallow clone ObjectSlice', function () {
      const firstItemElement = new NumberElement(1);
      const objectSlice = new ObjectSlice([firstItemElement, new NumberElement(2)]);
      const clone = cloneShallow(objectSlice);

      assert.notStrictEqual(clone, objectSlice);
      assert.strictEqual(clone.get(0), firstItemElement);
      assert.deepEqual([...clone], [...objectSlice]);
    });
  });

  context('cloneDeep', function () {
    specify('should deep clone ObjectElement', function () {
      const valueElement = new ArrayElement([1]);
      const objectElement = new ObjectElement({ a: valueElement });
      const clone = cloneDeep(objectElement);

      objectElement.set('c', 'd');
      valueElement.push(2);

      assert.notStrictEqual(clone, objectElement);
      assert.deepEqual(toValue(clone), { a: [1] });
    });

    specify('should deep clone ArrayElement', function () {
      const firstItemElement = new ObjectElement({ a: 'b' });
      const arrayElement = new ArrayElement([firstItemElement, 2, 3]);
      const clone = cloneDeep(arrayElement);

      arrayElement.push(4);
      firstItemElement.set('a', 'c');

      assert.notStrictEqual(clone, arrayElement);
      assert.deepEqual(toValue(clone), [{ a: 'b' }, 2, 3]);
    });

    specify('should deep clone NumberElement', function () {
      const numberElement = new NumberElement(1);
      const clone = cloneDeep(numberElement);

      assert.notStrictEqual(clone, numberElement);
      assert.strictEqual(toValue(clone), 1);
    });

    specify('should deep clone NullElement', function () {
      const nullElement = new NullElement();
      const clone = cloneDeep(nullElement);

      assert.notStrictEqual(clone, nullElement);
      assert.strictEqual(toValue(clone), null);
    });

    specify('should deep clone StringElement', function () {
      const stringElement = new StringElement('string');
      const clone = cloneDeep(stringElement);

      assert.notStrictEqual(clone, stringElement);
      assert.strictEqual(toValue(clone), 'string');
    });

    specify('should deep clone BooleanElement', function () {
      const boolElement = new BooleanElement(true);
      const clone = cloneDeep(boolElement);

      assert.notStrictEqual(clone, boolElement);
      assert.strictEqual(toValue(clone), true);
    });

    specify('should deep clone KeyValuePair', function () {
      const keyValuePair = new KeyValuePair(new StringElement('key'), new StringElement('value'));
      const clone = cloneDeep(keyValuePair);

      assert.notStrictEqual(clone, keyValuePair);
    });

    specify('should deep clone ArraySlice', function () {
      const firstItemElement = new NumberElement(1);
      const arraySlice = new ArraySlice([firstItemElement, new NumberElement(2)]);
      const clone = cloneDeep(arraySlice);

      assert.notStrictEqual(clone, arraySlice);
      assert.notStrictEqual(clone.get(0), firstItemElement);
      assert.deepEqual([...clone].map(toValue), [...arraySlice].map(toValue));
    });

    specify('should deep clone ObjectSlice', function () {
      const firstItemElement = new NumberElement(1);
      const objectSlice = new ObjectSlice([firstItemElement, new NumberElement(2)]);
      const clone = cloneDeep(objectSlice);

      assert.notStrictEqual(clone, objectSlice);
      assert.notStrictEqual(clone.get(0), firstItemElement);
      assert.deepEqual([...clone].map(toValue), [...objectSlice].map(toValue));
    });
  });
});
