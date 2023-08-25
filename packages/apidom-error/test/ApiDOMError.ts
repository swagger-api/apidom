import { assert } from 'chai';

import { ApiDOMError, ApiDOMErrorOptions } from '../src';

describe('apidom-error', function () {
  context('ApiDOMError', function () {
    specify('should create error', function () {
      const error = new ApiDOMError('msg');

      assert.instanceOf(error, ApiDOMError);
      assert.strictEqual(error.message, 'msg');
      assert.strictEqual(error.name, 'ApiDOMError');
    });

    specify('should create error chain', function () {
      const cause = new Error('cause');
      const error = new ApiDOMError('msg', { cause });

      assert.instanceOf(error, ApiDOMError);
      assert.strictEqual(error.message, 'msg');
      assert.strictEqual(error.name, 'ApiDOMError');
      assert.strictEqual(error.cause, cause);
    });

    specify('should create extended error', function () {
      class ExtendedError extends ApiDOMError {}

      const error = new ExtendedError('msg');

      assert.instanceOf(error, ExtendedError);
      assert.instanceOf(error, ApiDOMError);
      assert.strictEqual(error.message, 'msg');
      assert.strictEqual(error.name, 'ExtendedError');
    });

    specify('should create extended error with public property', function () {
      interface ExtendedErrorOptions extends ApiDOMErrorOptions {
        prop1: string;
      }
      class ExtendedError extends ApiDOMError {
        public readonly prop1!: string;

        constructor(message?: string, options?: ExtendedErrorOptions) {
          super(message, options);
          if (typeof options !== 'undefined') {
            this.prop1 = options.prop1;
          }
        }
      }

      const error = new ExtendedError('msg', {
        prop1: 'value1',
      });

      assert.instanceOf(error, ExtendedError);
      assert.instanceOf(error, ApiDOMError);
      assert.strictEqual(error.message, 'msg');
      assert.strictEqual(error.name, 'ExtendedError');
      assert.strictEqual(error.prop1, 'value1');
    });
  });
});
