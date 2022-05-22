import { assert } from 'chai';
import { ObjectElement, ArrayElement, StringElement } from '@swagger-api/apidom-core';

import { evaluate, EvaluationJsonPointerError, InvalidJsonPointerError } from '../src';

context('apidom-json-pointer', function () {
  context('given valid JSON pointer', function () {
    context('and ObjectElement', function () {
      specify('should evaluate successfully', function () {
        const element = new ObjectElement({ a: { b: 'c' } });
        const expected = element.get('a').get('b');
        const actual = evaluate('/a/b', element);

        assert.strictEqual(actual, expected);
      });

      context('and special characters are included', function () {
        specify('should evaluate successfully', function () {
          const element = new ObjectElement({ '~': { '/': { 'a b': 'c' } } });
          const expected = element.get('~').get('/').get('a b');
          const actual = evaluate('/~0/~1/a%20b', element);

          assert.strictEqual(actual, expected);
        });
      });
    });

    context('and ArrayElement', function () {
      specify('should evaluate successfully', function () {
        const element = new ArrayElement([{ a: [{ b: 'c' }] }]);
        const expected = element.get(0).get('a').get(0).get('b');
        const actual = evaluate('/0/a/0/b', element);

        assert.strictEqual(actual, expected);
      });

      context('and special characters are included', function () {
        specify('should evaluate successfully', function () {
          const element = new ArrayElement([{ '~': [{ '/': 'c' }] }]);
          const expected = element.get(0).get('~').get(0).get('/');
          const actual = evaluate('/0/~0/0/~1', element);

          assert.strictEqual(actual, expected);
        });
      });
    });

    context('and no matching ObjectElement', function () {
      specify('should throw EvaluationJsonPointerError', function () {
        const element = new ObjectElement({ a: { b: 'c' } });

        assert.throws(() => evaluate('/x/y/z', element), EvaluationJsonPointerError);
      });
    });

    context('and no matching ArrayElement', function () {
      specify('should throw EvaluationJsonPointerError', function () {
        const element = new ArrayElement([[0]]);

        assert.throws(() => evaluate('/x/0/z', element), EvaluationJsonPointerError);
      });
    });
  });

  context('given invalid JSON pointer', function () {
    specify('should throw InvalidJsonPointerError', function () {
      const element = new ObjectElement({ a: { b: 'c' } });

      assert.throws(() => evaluate('a/b', element), InvalidJsonPointerError);
    });
  });

  context('given invalid Element', function () {
    specify('should throw EvaluationJsonPointerError', function () {
      const element = new StringElement('string');

      // @ts-ignore
      assert.throws(() => evaluate('/a/b', element), EvaluationJsonPointerError);
    });
  });
});
