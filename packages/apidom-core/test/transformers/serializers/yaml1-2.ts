import dedent from 'dedent';
import { assert } from 'chai';

import { from } from '../../../src';
import serialize from '../../../src/transformers/serializers/yaml-1-2';

describe('serializers', function () {
  context('yaml-1-2', function () {
    context('given BooleanElement', function () {
      specify('should serialize to YAML 1.2', function () {
        const apidom = from(true);
        const serialized = serialize(apidom);
        const expected = dedent`
          true
        `;

        assert.strictEqual(serialized, expected);
      });
    });

    context('given NumberElement', function () {
      specify('should serialize to YAML 1.2', function () {
        const apidom = from(1);
        const serialized = serialize(apidom);
        const expected = dedent`
          1
        `;

        assert.strictEqual(serialized, expected);
      });
    });

    context('given StringElement', function () {
      specify('should serialize to YAML 1.2', function () {
        const apidom = from('test');
        const serialized = serialize(apidom);
        const expected = dedent`
          "test"
        `;

        assert.strictEqual(serialized, expected);
      });

      context('and is multiline', function () {
        specify('should serialize to YAML 1.2', function () {
          const apidom = from('test\n\ntest\n');
          const serialized = serialize(apidom);
          const expected = String.raw`"test\n\ntest\n"`;

          assert.strictEqual(serialized, expected);
        });
      });
    });

    context('given NullElement', function () {
      specify('should serialize to YAML 1.2', function () {
        const apidom = from(null);
        const serialized = serialize(apidom);
        const expected = dedent`
          null
        `;

        assert.strictEqual(serialized, expected);
      });
    });

    context('given empty ArrayElement', function () {
      specify('should serialize to YAML 1.2', function () {
        const apidom = from([]);
        const serialized = serialize(apidom);
        const expected = dedent`
          []
        `;

        assert.strictEqual(serialized, expected);
      });
    });

    context('given simple ArrayElement', function () {
      specify('should serialize to YAML 1.2', function () {
        const apidom = from([1, true, 'test', null]);
        const serialized = serialize(apidom, { directive: true });
        const expected = dedent`
          %YAML 1.2
          ---

          - 1
          - true
          - "test"
          - null
        `;

        assert.strictEqual(serialized, expected);
      });
    });

    context('given nested ArrayElement', function () {
      specify('should serialize to YAML 1.2', function () {
        const apidom = from([1, [true, 'test', null]]);
        const serialized = serialize(apidom, { directive: true });
        const expected = dedent`
          %YAML 1.2
          ---

          - 1
          -
            - true
            - "test"
            - null
        `;

        assert.strictEqual(serialized, expected);
      });
    });

    context('given ArrayElement in ObjectElement', function () {
      specify('should serialize to YAML 1.2', function () {
        const apidom = from({ a: [1] });
        const serialized = serialize(apidom, { directive: true });
        const expected = dedent`
          %YAML 1.2
          ---

          "a":
            - 1
        `;

        assert.strictEqual(serialized, expected);
      });
    });

    context('given empty ObjectElement', function () {
      specify('should serialize to YAML 1.2', function () {
        const apidom = from({});
        const serialized = serialize(apidom);
        const expected = dedent`
          {}
        `;

        assert.strictEqual(serialized, expected);
      });
    });

    context('given simple ObjectElement', function () {
      specify('should serialize to YAML 1.2', function () {
        const apidom = from({ a: 1, b: true });
        const serialized = serialize(apidom, { directive: true });
        const expected = dedent`
          %YAML 1.2
          ---

          "a": 1
          "b": true
        `;

        assert.strictEqual(serialized, expected);
      });
    });

    context('given nested ObjectElement', function () {
      specify('should serialize to YAML 1.2', function () {
        const apidom = from({ a: 1, b: { c: true } });
        const serialized = serialize(apidom, { directive: true });
        const expected = dedent`
          %YAML 1.2
          ---

          "a": 1
          "b":
            "c": true
        `;

        assert.strictEqual(serialized, expected);
      });
    });

    context('given ObjectElement in ArrayElement', function () {
      specify('should serialize to YAML 1.2', function () {
        const apidom = from([{ a: true }]);
        const serialized = serialize(apidom, { directive: true });
        const expected = dedent`
          %YAML 1.2
          ---

          -
            "a": true
        `;

        assert.strictEqual(serialized, expected);
      });
    });
  });
});
