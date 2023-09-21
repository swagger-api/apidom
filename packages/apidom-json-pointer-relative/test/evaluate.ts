import { assert } from 'chai';
import { ObjectElement, toValue } from '@swagger-api/apidom-core';

import { evaluate, EvaluationRelativeJsonPointerError } from '../src';

describe('apidom-json-pointer-relative', function () {
  context('evaluate', function () {
    const root = new ObjectElement({
      foo: ['bar', 'baz'],
      highly: {
        nested: {
          objects: true,
        },
      },
    });

    context('evaluate non-negative-integer prefix', function () {
      specify('should evaluate 0', function () {
        const current = root.get('foo').get(1);
        const actual = evaluate('0', current, root);

        assert.strictEqual(actual, current);
        assert.strictEqual(toValue(actual), 'baz');
      });

      specify('should evaluate 1', function () {
        const current = root.get('foo').get(1);
        const actual = evaluate('1', current, root);
        const expected = root.get('foo');

        assert.strictEqual(actual, expected);
      });

      specify('should evaluate 2', function () {
        const current = root.get('foo').get(1);
        const actual = evaluate('2', current, root);

        assert.strictEqual(actual, root);
      });

      specify('should throw if above the root', function () {
        const current = root.get('foo').get(1);

        assert.throws(() => evaluate('100', current, root), EvaluationRelativeJsonPointerError);
      });
    });

    context('evaluate index-manipulation', function () {
      specify('should evaluate 0-1', function () {
        const current = root.get('foo').get(1);
        const actual = evaluate('0-1', current, root);
        const expected = root.get('foo').get(0);

        assert.strictEqual(actual, expected);
        assert.strictEqual(toValue(actual), 'bar');
      });

      specify('should throw on non-existing index', function () {
        const current = root.get('foo').get(1);

        assert.throws(() => evaluate('0-100', current, root), EvaluationRelativeJsonPointerError);
      });
    });

    context('evaluate json-pointer', function () {
      specify('should evaluate 1/0', function () {
        const current = root.get('foo').get(1);
        const actual = evaluate('1/0', current, root);
        const expected = root.get('foo').get(0);

        assert.strictEqual(actual, expected);
        assert.strictEqual(toValue(actual), 'bar');
      });

      specify('should evaluate 2/highly/nested/objects', function () {
        const current = root.get('foo').get(1);
        const actual = evaluate('2/highly/nested/objects', current, root);
        const expected = root.get('highly').get('nested').get('objects');

        assert.strictEqual(actual, expected);
        assert.isTrue(toValue(actual));
      });

      specify('should evaluate 0/objects', function () {
        const current = root.get('highly').get('nested');
        const actual = evaluate('2/highly/nested/objects', current, root);
        const expected = root.get('highly').get('nested').get('objects');

        assert.strictEqual(actual, expected);
        assert.isTrue(toValue(actual));
      });

      specify('should evaluate 1/nested/objects', function () {
        const current = root.get('highly').get('nested');
        const actual = evaluate('1/nested/objects', current, root);
        const expected = root.get('highly').get('nested').get('objects');

        assert.strictEqual(actual, expected);
        assert.isTrue(toValue(actual));
      });

      specify('should evaluate 2/foo/0', function () {
        const current = root.get('highly').get('nested');
        const actual = evaluate('2/foo/0', current, root);
        const expected = root.get('foo').get(0);

        assert.strictEqual(actual, expected);
        assert.strictEqual(toValue(actual), 'bar');
      });
    });

    context('evaluate hash character ("#")', function () {
      specify('should evaluate 0#', function () {
        const current = root.get('foo').get(1);
        const actual = evaluate('0#', current, root);

        assert.strictEqual(toValue(actual), 1);
      });

      specify('should evaluate 0-1#', function () {
        const current = root.get('foo').get(1);
        const actual = evaluate('0-1#', current, root);

        assert.strictEqual(toValue(actual), 0);
      });

      specify('should evaluate 1#', function () {
        const current = root.get('foo').get(1);
        const actual = evaluate('1#', current, root);

        assert.strictEqual(toValue(actual), 'foo');
      });

      context('given starting from the value {"objects":true}', function () {
        specify('should evaluate 0#', function () {
          const current = root.get('highly').get('nested');
          const actual = evaluate('0#', current, root);

          assert.strictEqual(toValue(actual), 'nested');
        });

        specify('should evaluate 1#', function () {
          const current = root.get('highly').get('nested');
          const actual = evaluate('1#', current, root);

          assert.strictEqual(toValue(actual), 'highly');
        });
      });
    });

    context('given invalid Relative JSON Pointer to evaluate', function () {
      specify('should throw InvalidRelativeJsonPointerError', function () {
        const current = root.get('foo').get(1);

        assert.throws(() => evaluate('-1', current, root), EvaluationRelativeJsonPointerError);
      });
    });
  });
});
