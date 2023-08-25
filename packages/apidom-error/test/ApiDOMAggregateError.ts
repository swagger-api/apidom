import { assert } from 'chai';

import { ApiDOMAggregateError, ApiDOMError } from '../src';

describe('apidom-error', function () {
  context('ApiDOMAggregateError', function () {
    specify('should create aggregate error', function () {
      const error1 = new Error('error1');
      const error2 = new Error('error2');
      const aggregateError = new ApiDOMAggregateError([error1, error2], 'aggregate error');

      assert.instanceOf(aggregateError, AggregateError);
      assert.strictEqual(aggregateError.message, 'aggregate error');
      assert.strictEqual(aggregateError.name, 'ApiDOMAggregateError');
      assert.deepEqual(aggregateError.errors, [error1, error2]);
    });

    specify('should create error chain', function () {
      const cause = new Error('cause');
      const error1 = new Error('error1');
      const error2 = new Error('error2');
      const aggregateError = new ApiDOMAggregateError([error1, error2], 'aggregate error', {
        cause,
      });

      assert.strictEqual(aggregateError.cause, cause);
    });

    specify('should be recognized as ApiDOMError instance', function () {
      const aggregateError = new ApiDOMAggregateError([]);

      assert.instanceOf(aggregateError, ApiDOMError);
    });
  });
});
