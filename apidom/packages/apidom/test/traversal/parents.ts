import { assert } from 'chai';
import { ObjectElement } from 'apidom';

import { parents } from '../../src';

describe('traversal', function () {
  context('parents', function () {
    context('given directed acyclic ApiDOM tree', function () {
      let daat;
      let parentEdges;

      beforeEach(function () {
        daat = new ObjectElement({
          a: [1, 2, { b: 'c', d: 'e' }],
        });
        parentEdges = parents(daat);
      });

      specify('should add empty parent property to root element', function () {
        assert.isNull(parentEdges.get(daat));
      });

      specify('should add parent property to #/a key', function () {
        const memberElement = daat.getMember('a');
        const parent = parentEdges.get(memberElement.key);

        assert.strictEqual(parent, memberElement);
      });

      specify('should add parent property to #/a value', function () {
        const memberElement = daat.getMember('a');
        const parent = parentEdges.get(memberElement.value);

        assert.strictEqual(parent, memberElement);
      });

      specify('should add parent property to #/a/1', function () {
        const arrayElement = daat.get('a');
        const numberElement = arrayElement.get(1);
        const parent = parentEdges.get(numberElement);

        assert.strictEqual(parent, arrayElement);
      });

      specify('should add parent property to #/a/2/d key', function () {
        const memberElement = daat.get('a').get(2).getMember('d');
        const parent = parentEdges.get(memberElement.key);

        assert.strictEqual(parent, memberElement);
      });

      specify('should add parent property to #/a/2/d value', function () {
        const memberElement = daat.get('a').get(2).getMember('d');
        const parent = parentEdges.get(memberElement.value);

        assert.strictEqual(parent, memberElement);
      });
    });

    context('given directed cyclic ApiDOM graph', function () {
      let daat;
      let parentEdges;

      beforeEach(function () {
        daat = new ObjectElement({
          a: [1, 2, { b: 'c', d: 'e' }],
        });
        daat.set('cycle', daat);
        parentEdges = parents(daat);
      });

      specify('should add empty parent property to root element', function () {
        assert.isNull(parentEdges.get(daat));
      });

      specify('should add parent property to #/a key', function () {
        const memberElement = daat.getMember('a');
        const parent = parentEdges.get(memberElement.key);

        assert.strictEqual(parent, memberElement);
      });

      specify('should add parent property to #/a value', function () {
        const memberElement = daat.getMember('a');
        const parent = parentEdges.get(memberElement.value);

        assert.strictEqual(parent, memberElement);
      });

      specify('should add parent property to #/cycle key', function () {
        const memberElement = daat.getMember('cycle');
        const parent = parentEdges.get(memberElement.key);

        assert.strictEqual(parent, memberElement);
      });

      specify('should add parent property to #/cycle value', function () {
        const memberElement = daat.getMember('cycle');
        const parent = parentEdges.get(memberElement.value);

        assert.isNull(parent);
      });

      specify('should add parent property to #/a/1', function () {
        const arrayElement = daat.get('a');
        const numberElement = arrayElement.get(1);
        const parent = parentEdges.get(numberElement);

        assert.strictEqual(parent, arrayElement);
      });

      specify('should add parent property to #/a/2/d key', function () {
        const memberElement = daat.get('a').get(2).getMember('d');
        const parent = parentEdges.get(memberElement.key);

        assert.strictEqual(parent, memberElement);
      });

      specify('should add parent property to #/a/2/d value', function () {
        const memberElement = daat.get('a').get(2).getMember('d');
        const parent = parentEdges.get(memberElement.value);

        assert.strictEqual(parent, memberElement);
      });
    });
  });
});
