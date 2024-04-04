import sinon from 'sinon';
import { assert } from 'chai';
import { ApiDOMStructuredError } from '@swagger-api/apidom-error';

import { visit, mergeAllVisitors } from '../../src';

describe('visitor', function () {
  context('given structure with cycle', function () {
    specify('should skip over a sub-tree to avoid recursion', function () {
      const visitor = {
        enter: sinon.spy(),
      };
      const structure = {
        type: 'object',
        children: [
          { type: 'number', value: 1 },
          { type: 'string', value: 'test' },
          { type: 'object', children: [] },
        ],
      };

      // @ts-ignore
      structure.children[2].children.push(structure);
      // @ts-ignore
      visit(structure, visitor, { keyMap: { object: ['children'] } });

      assert.strictEqual(visitor.enter.callCount, 4);
    });
  });

  context('given async visitor in sync mode', function () {
    specify('should throw error', function () {
      const visitor = {
        async enter() {
          return undefined;
        },
      };
      const structure = {
        type: 'object',
        children: [
          { type: 'number', value: 1 },
          { type: 'string', value: 'test' },
          { type: 'object', children: [] },
        ],
      };

      assert.throws(
        () => visit(structure, visitor),
        ApiDOMStructuredError,
        'Async visitor not supported in sync mode',
      );
    });
  });

  context('mergeAll', function () {
    context('given exposeEdits=true', function () {
      specify('should see edited node', function () {
        const visitor1 = {
          string: {
            enter() {
              return { type: 'boolean', value: true };
            },
          },
        };
        const visitor2 = {
          boolean: {
            enter(node: any) {
              node.value = false; // eslint-disable-line no-param-reassign
            },
          },
        };
        const structure = {
          type: 'object',
          children: [
            { type: 'number', value: 1 },
            { type: 'string', value: 'test' },
            { type: 'object', children: [] },
          ],
        };
        const mergedVisitor = mergeAllVisitors([visitor1, visitor2], { exposeEdits: true });
        // @ts-ignore
        const newStructure = visit(structure, mergedVisitor, { keyMap: { object: ['children'] } });

        assert.deepEqual(newStructure, {
          type: 'object',
          children: [
            { type: 'number', value: 1 },
            { type: 'boolean', value: false },
            { type: 'object', children: [] },
          ],
        });
      });
    });

    context('given exposeEditor=false', function () {
      specify('should not see edited node', function () {
        const visitor1 = {
          string: {
            enter() {
              return { type: 'boolean', value: true };
            },
          },
        };
        const visitor2 = {
          boolean: {
            enter(node: any) {
              node.value = false; // eslint-disable-line no-param-reassign
            },
          },
        };
        const structure = {
          type: 'object',
          children: [
            { type: 'number', value: 1 },
            { type: 'string', value: 'test' },
            { type: 'object', children: [] },
          ],
        };
        const mergedVisitor = mergeAllVisitors([visitor1, visitor2]);
        // @ts-ignore
        const newStructure = visit(structure, mergedVisitor, { keyMap: { object: ['children'] } });

        assert.deepEqual(newStructure, {
          type: 'object',
          children: [
            { type: 'number', value: 1 },
            { type: 'boolean', value: true },
            { type: 'object', children: [] },
          ],
        });
      });
    });

    specify('should see edited node in leave hook', function () {
      const visitor1 = {
        string: {
          enter() {
            return { type: 'foo', value: 'bar' };
          },
        },
      };
      const visitor2 = {
        foo: {
          leave(node: any) {
            node.value = 'foo'; // eslint-disable-line no-param-reassign
          },
        },
      };
      const structure = {
        type: 'object',
        children: [
          { type: 'number', value: 1 },
          { type: 'string', value: 2 },
          { type: 'object', children: [] },
        ],
      };
      const mergedVisitor = mergeAllVisitors([visitor1, visitor2]);
      // @ts-ignore
      const newStructure = visit(structure, mergedVisitor, { keyMap: { object: ['children'] } });

      assert.deepEqual(newStructure, {
        type: 'object',
        children: [
          { type: 'number', value: 1 },
          { type: 'foo', value: 'foo' },
          { type: 'object', children: [] },
        ],
      });
    });

    context('given async visitor in sync mode', function () {
      specify('should throw error', function () {
        const visitor1 = {
          enter() {
            return undefined;
          },
        };
        const visitor2 = {
          async enter() {
            return undefined;
          },
        };
        const mergedVisitor = mergeAllVisitors([visitor1, visitor2]);
        const structure = {
          type: 'object',
          children: [
            { type: 'number', value: 1 },
            { type: 'string', value: 'test' },
            { type: 'object', children: [] },
          ],
        };

        assert.throws(
          () => visit(structure, mergedVisitor),
          ApiDOMStructuredError,
          'Async visitor not supported in sync mode',
        );
      });
    });
  });
});
