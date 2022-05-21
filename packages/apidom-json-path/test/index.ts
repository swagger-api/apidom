import { assert } from 'chai';
import { ObjectElement } from '@swagger-api/apidom-core';

import { evaluate, evaluateMulti } from '../src/index';

describe('apidom-json-path', function () {
  context('evaluate', function () {
    context('given JSON Path expression as string', function () {
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

    context('given JSON Path expression as list', function () {
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
  });

  context('evaluateMulti', function () {
    context('given JSON Path expression as string', function () {
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

    context('given JSON Path expression as list', function () {
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
  });
});
