import { assert } from 'chai';

import { parents, ObjectElement } from '../../src';

describe('traversal', function () {
  context('parents', function () {
    context('given directed acyclic ApiDOM tree', function () {
      let data: ObjectElement;
      let parentEdges: WeakMap<any, any>;

      beforeEach(function () {
        data = new ObjectElement({
          a: [1, 2, { b: 'c', d: 'e' }],
        });
        parentEdges = parents(data);
      });

      specify('should add empty parent property to root element', function () {
        assert.isUndefined(parentEdges.get(data));
      });

      specify('should add parent property to #/a key', function () {
        const memberElement = data.getMember('a');
        const parent = parentEdges.get(memberElement.key);

        assert.strictEqual(parent, memberElement);
      });

      specify('should add parent property to #/a value', function () {
        const memberElement = data.getMember('a');
        const parent = parentEdges.get(memberElement.value);

        assert.strictEqual(parent, memberElement);
      });

      specify('should add parent property to #/a/1', function () {
        const arrayElement = data.get('a');
        const numberElement = arrayElement.get(1);
        const parent = parentEdges.get(numberElement);

        assert.strictEqual(parent, arrayElement);
      });

      specify('should add parent property to #/a/2/d key', function () {
        const memberElement = data.get('a').get(2).getMember('d');
        const parent = parentEdges.get(memberElement.key);

        assert.strictEqual(parent, memberElement);
      });

      specify('should add parent property to #/a/2/d value', function () {
        const memberElement = data.get('a').get(2).getMember('d');
        const parent = parentEdges.get(memberElement.value);

        assert.strictEqual(parent, memberElement);
      });
    });

    context('given directed cyclic ApiDOM graph', function () {
      let data: ObjectElement;
      let parentEdges: WeakMap<any, any>;

      beforeEach(function () {
        data = new ObjectElement({
          a: [1, 2, { b: 'c', d: 'e' }],
        });
        data.set('cycle', data);
        parentEdges = parents(data);
      });

      specify('should add empty parent property to root element', function () {
        assert.isUndefined(parentEdges.get(data));
      });

      specify('should add parent property to #/a key', function () {
        const memberElement = data.getMember('a');
        const parent = parentEdges.get(memberElement.key);

        assert.strictEqual(parent, memberElement);
      });

      specify('should add parent property to #/a value', function () {
        const memberElement = data.getMember('a');
        const parent = parentEdges.get(memberElement.value);

        assert.strictEqual(parent, memberElement);
      });

      specify('should add parent property to #/cycle key', function () {
        const memberElement = data.getMember('cycle');
        const parent = parentEdges.get(memberElement.key);

        assert.strictEqual(parent, memberElement);
      });

      specify('should add parent property to #/cycle value', function () {
        const memberElement = data.getMember('cycle');
        const parent = parentEdges.get(memberElement.value);

        assert.isUndefined(parent);
      });

      specify('should add parent property to #/a/1', function () {
        const arrayElement = data.get('a');
        const numberElement = arrayElement.get(1);
        const parent = parentEdges.get(numberElement);

        assert.strictEqual(parent, arrayElement);
      });

      specify('should add parent property to #/a/2/d key', function () {
        const memberElement = data.get('a').get(2).getMember('d');
        const parent = parentEdges.get(memberElement.key);

        assert.strictEqual(parent, memberElement);
      });

      specify('should add parent property to #/a/2/d value', function () {
        const memberElement = data.get('a').get(2).getMember('d');
        const parent = parentEdges.get(memberElement.value);

        assert.strictEqual(parent, memberElement);
      });
    });
  });
});
