# Tests

Test templates for the new namespace package. Read this in Phase 5. Tests use ts-mocha with the
`test/mocha-bootstrap.ts` file copied in Phase 4; snapshot tests live next to each element test in
`__snapshots__/`.

## Rule 1: Mirror the sibling package's tests

Reviewers compare new tests with the same test file in a sibling package (PR #5182 got 9 comments
for tests that were shaped differently or checked less). Pick the closest sibling namespace
(`apidom-ns-arazzo-1` for a new spec, the parent namespace for a new version) and, for every test file
you write, open the sibling's file of the same name and keep its `describe`/`context`/`specify`
structure, adapting only names and data. Then check the outline:

```bash
node .claude/skills/add-spec-version/scripts/check-test-parity.mjs \
  packages/apidom-ns-{new}/test/predicates.ts packages/apidom-ns-{sibling}/test/predicates.ts \
  --mask {sibling-spec-words}
```

Every `MISSING` line is either added or has a reason (e.g. the spec has no Reference Object).

## Rule 2: Set every field

Each element test refracts an object that sets **every** field of the element from the field map,
with a realistic value of the right shape (nested objects as objects, arrays as arrays, maps as
maps). A snapshot only proves the fields it contains: PR #5182's `ClientCredentialsOAuthFlow` test
skipped `refreshUrl`, so that field's visitor was never exercised.

## Element Refractor Tests

For each element, create `test/refractor/elements/{ElementName}/index.ts`, following the sibling
(e.g. `apidom-ns-arazzo-1/test/refractor/elements/Info/index.ts`):

```typescript
import { assert, expect } from 'chai';
import { ObjectElement, toValue, sexprs } from '@swagger-api/apidom-core';

import { {ElementName}Element } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('{ElementName}Element', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const {elementName}Element = {ElementName}Element.refract({
          // every field from the field map, realistic values
        });

        expect(sexprs({elementName}Element)).toMatchSnapshot();
      });

      context('given generic ApiDOM element', function () {
        let {elementName}Element: {ElementName}Element;

        beforeEach(function () {
          {elementName}Element = {ElementName}Element.refract(
            new ObjectElement({}, { classes: ['example'] }, { attr: true }),
          ) as {ElementName}Element;
        });

        specify('should refract to semantic ApiDOM tree', function () {
          expect(sexprs({elementName}Element)).toMatchSnapshot();
        });

        specify('should deepmerge meta', function () {
          assert.deepEqual(toValue({elementName}Element.meta), {
            classes: ['{element-class}', 'example'],
          });
        });

        specify('should deepmerge attributes', function () {
          assert.deepEqual(toValue({elementName}Element.attributes), { attr: true });
        });
      });
    });
  });
});
```

## Predicates

`test/predicates.ts` covers every `is{ElementName}Element` predicate with the four cases the other
namespaces use:

```typescript
context('is{ElementName}Element', function () {
  context('given {ElementName}Element instance value', function () {
    specify('should return true', function () {
      assert.isTrue(is{ElementName}Element(new {ElementName}Element()));
    });
  });

  context('given subtype instance value', function () {
    specify('should return true', function () {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      class {ElementName}SubElement extends {ElementName}Element {}

      assert.isTrue(is{ElementName}Element(new {ElementName}SubElement()));
    });
  });

  context('given non {ElementName}Element instance value', function () {
    specify('should return false', function () {
      assert.isFalse(is{ElementName}Element(1));
      assert.isFalse(is{ElementName}Element(null));
      assert.isFalse(is{ElementName}Element(undefined));
      assert.isFalse(is{ElementName}Element({}));
      assert.isFalse(is{ElementName}Element([]));
      assert.isFalse(is{ElementName}Element('string'));
    });
  });

  specify('should support duck-typing', function () {
    const {elementName}ElementDuck = {
      _storedElement: '{elementName}',
      _content: [],
      primitive() {
        return 'object';
      },
      get element() {
        return this._storedElement;
      },
    };

    const {elementName}ElementSwan = {
      _storedElement: undefined,
      _content: undefined,
      primitive() {
        return 'swan';
      },
      get length() {
        return 0;
      },
    };

    assert.isTrue(is{ElementName}Element({elementName}ElementDuck));
    assert.isFalse(is{ElementName}Element({elementName}ElementSwan));
  });
});
```

Only test predicates the namespace actually needs (see "Copy, then prune" in SKILL.md Phase 4).

## Replace Empty Element plugin

See `replace-empty-element.md`: snapshot tests for every object, array (including items) and map
(including values) field.

## Input normalization goes through the adapter path

If the refractor normalizes input (alternative key spellings such as protobuf snake_case
`default_input_modes`, legacy aliases, ...), test it with the input the adapters actually pass: the
parsed generic ApiDOM **Element** from `apidom-parser-adapter-json` / `-yaml-1-2`, not a plain JS
object. In PR #5182 `canonicalizeKeys` only ran for plain objects, the adapters pass Elements, and
every camelCase fixture passed while real snake_case documents silently lost fields:

```typescript
import { parse } from '@swagger-api/apidom-parser-adapter-json';

specify('should normalize snake_case keys from parsed documents', async function () {
  const { result } = await parse('{"name": "agent", "default_input_modes": ["text/plain"]}');
  const element = {RootElement}.refract(result);

  assert.isDefined(element.get('defaultInputModes'));
});
```
