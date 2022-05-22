import { assert } from 'chai';
import { ObjectElement } from '@swagger-api/apidom-core';

import { evaluate, evaluateMulti } from '../src';

describe('apidom-json-path', function () {
  context('evaluate', function () {
    context('given JSONPath expression as string', function () {
      specify('should retrieve end point values', function () {
        const objectElement = new ObjectElement({
          a: {
            b: [100, 1, 2],
          },
        });
        const result = evaluate('$.a.b[?(@ < 10)]', objectElement);

        assert.lengthOf(result, 2);
      });
    });

    context('given JSONPath expression as list', function () {
      specify('should retrieve end point values', function () {
        const objectElement = new ObjectElement({
          a: {
            b: [100, 1, 2],
          },
        });
        const result = evaluate(['$', 'a', 'b', '?(@ < 10)'], objectElement);

        assert.lengthOf(result, 2);
      });
    });

    context('given invalid JSONPath expression', function () {
      specify('should return empty list', function () {
        const objectElement = new ObjectElement({
          a: {
            b: [100, 1, 2],
          },
        });
        const result = evaluate('%~!@U@IU$@', objectElement);

        assert.lengthOf(result, 0);
      });
    });
  });

  context('evaluateMulti', function () {
    context('given JSONPath expression as string', function () {
      specify('should retrieve end point values', function () {
        const objectElement = new ObjectElement({
          a: {
            b: [100, 1, 2],
          },
        });
        const result = evaluateMulti(['$.a.b[?(@ < 10)]', '$.a.b[?(@ > 10)]'], objectElement);

        assert.lengthOf(result, 2);
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

        assert.lengthOf(result, 2);
      });
    });

    context('given invalid JSONPath expression', function () {
      specify('should return empty list', function () {
        const objectElement = new ObjectElement({
          a: {
            b: [100, 1, 2],
          },
        });
        const result = evaluate(['%~!@U@IU$@', 'd*AS&*)(&YR3R'], objectElement);

        assert.lengthOf(result, 0);
      });
    });
  });
});
