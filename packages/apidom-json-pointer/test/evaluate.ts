import { assert } from 'chai';
import { ObjectElement, ArrayElement, StringElement } from '@swagger-api/apidom-core';

import {
  evaluate,
  uriToPointer,
  EvaluationJsonPointerError,
  InvalidJsonPointerError,
} from '../src';

describe('apidom-json-pointer', function () {
  context('RFC 6901 test', function () {
    specify('should evaluate successfully', function () {
      // https://www.rfc-editor.org/rfc/rfc6901#section-5
      const objectElement = new ObjectElement({
        foo: ['bar', 'baz'],
        '': 0,
        'a/b': 1,
        'c%d': 2,
        'e^f': 3,
        'g|h': 4,
        'i\\j': 5,
        'k"l': 6,
        ' ': 7,
        'm~n': 8,
      });

      assert.strictEqual(evaluate('', objectElement), objectElement);
      assert.strictEqual(evaluate('/foo', objectElement), objectElement.get('foo'));
      assert.strictEqual(evaluate('/foo/0', objectElement), objectElement.get('foo').get(0));
      assert.strictEqual(evaluate('/', objectElement), objectElement.get(''));
      assert.strictEqual(evaluate('/a~1b', objectElement), objectElement.get('a/b'));
      assert.strictEqual(evaluate('/c%d', objectElement), objectElement.get('c%d'));
      assert.strictEqual(evaluate('/e^f', objectElement), objectElement.get('e^f'));
      assert.strictEqual(evaluate('/g|h', objectElement), objectElement.get('g|h'));
      assert.strictEqual(evaluate('/i\\j', objectElement), objectElement.get('i\\j'));
      assert.strictEqual(evaluate('/k"l', objectElement), objectElement.get('k"l'));
      assert.strictEqual(evaluate('/ ', objectElement), objectElement.get(' '));
      assert.strictEqual(evaluate('/m~0n', objectElement), objectElement.get('m~n'));
    });
  });

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

  context('given JSON pointer in URI', function () {
    specify('should return JSON Pointer from URI', function () {
      const uri = 'https://example.com/path/#/a/b';
      const expected = '/a/b';

      assert.strictEqual(uriToPointer(uri), expected);
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
