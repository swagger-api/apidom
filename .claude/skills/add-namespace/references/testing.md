# Tests

Test templates for the new namespace package. Read this in Phase 5. Tests use ts-mocha with the
`test/mocha-bootstrap.ts` file copied in Phase 4; snapshot tests live next to each element test in
`__snapshots__/`.

## Element Refractor Tests

For each element, create a test file `test/refractor/elements/{ElementName}/index.ts`:

```typescript
import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { {ElementName}Element } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('{ElementName}Element', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const {elementName}Element = {ElementName}Element.refract({
          {propertyName}: 'value',
          // Add sample data...
        });

        expect(sexprs({elementName}Element)).toMatchSnapshot();
      });
    });
  });
});
```

Create `test/predicates.ts`:

```typescript
import { expect } from 'chai';

import { {ElementName}Element, is{ElementName}Element } from '../src/index.ts';

describe('predicates', function () {
  context('is{ElementName}Element', function () {
    context('when element is {ElementName}Element', function () {
      specify('should return true', function () {
        const element = new {ElementName}Element();

        expect(is{ElementName}Element(element)).to.be.true;
      });
    });

    context('when element is not {ElementName}Element', function () {
      specify('should return false', function () {
        expect(is{ElementName}Element({})).to.be.false;
        expect(is{ElementName}Element(null)).to.be.false;
        expect(is{ElementName}Element(undefined)).to.be.false;
      });
    });
  });
});
```

Create `test/tsconfig.json`:

```json
{
  "extends": "../../../tsconfig.test.json",
  "compilerOptions": {
    "types": ["mocha", "chai", "node"]
  },
  "include": ["./**/*"],
  "references": [{ "path": ".." }]
}
```
