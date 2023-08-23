import { assert } from 'chai';
import { ObjectElement, NumberElement } from '@swagger-api/apidom-core';

import { evaluateMulti } from '../src';

describe('apidom-json-path', function () {
  context('evaluateMulti', function () {
    context('given JSONPath expression as string', function () {
      specify('should retrieve end point values', function () {
        const objectElement = new ObjectElement({
          a: {
            b: [100, 1, 2],
          },
        });
        const result = evaluateMulti(['$.a.b[?(@ < 10)]', '$.a.b[?(@ > 10)]'], objectElement);

        assert.deepEqual(result, [
          ['$.a.b[?(@ < 10)]', [new NumberElement(1), new NumberElement(2)]],
          ['$.a.b[?(@ > 10)]', [new NumberElement(100)]],
        ]);
      });
    });

    context('given JSONPath expression as list', function () {
      specify('should retrieve end point values', function () {
        const objectElement = new ObjectElement({
          a: {
            b: [100, 1, 2],
          },
        });
        const result = evaluateMulti(
          [
            ['$', 'a', 'b', '?(@ < 10)'],
            ['$', 'a', 'b', '?(@ > 10)'],
          ],
          objectElement,
        );

        assert.deepEqual(result, [
          ["$['a']['b']['?(@ < 10)']", [new NumberElement(1), new NumberElement(2)]],
          ["$['a']['b']['?(@ > 10)']", [new NumberElement(100)]],
        ]);
      });
    });

    context('given invalid JSONPath expression', function () {
      specify('should return empty list', function () {
        const objectElement = new ObjectElement({
          a: {
            b: [100, 1, 2],
          },
        });
        const result = evaluateMulti(['%~!@U@IU$@', 'd*AS&*)(&YR3R'], objectElement);

        assert.deepEqual(result, [
          ['%~!@U@IU$@', []],
          ['d*AS&*)(&YR3R', []],
        ]);
      });
    });
  });
});
