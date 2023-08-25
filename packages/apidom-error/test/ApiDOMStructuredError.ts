import { assert } from 'chai';

import { ApiDOMStructuredError, ApiDOMError } from '../src';

describe('apidom-error', function () {
  context('ApiDOMStructuredError', function () {
    specify('should create error', function () {
      const error = new ApiDOMStructuredError('msg', {
        prop1: 'value1',
        prop2: 3,
      });

      assert.instanceOf(error, ApiDOMStructuredError);
      assert.instanceOf(error, ApiDOMError);
      assert.strictEqual(error.message, 'msg');
      assert.strictEqual(error.name, 'ApiDOMStructuredError');
      // @ts-ignore
      assert.strictEqual(error.prop1, 'value1');
      // @ts-ignore
      assert.strictEqual(error.prop2, 3);
    });

    specify('should create error chain', function () {
      const cause = new Error('cause');
      const error = new ApiDOMStructuredError('msg', {
        prop1: 'value1',
        prop2: 3,
        cause,
      });

      assert.strictEqual(error.cause, cause);
    });
  });
});
