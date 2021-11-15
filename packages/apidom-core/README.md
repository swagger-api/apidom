# @swagger-api/apidom-core

`apidom` is a package that contains tools for manipulating the ApiDOM structures.

## Base namespace

Base namespace consists of [four higher order elements](https://github.com/swagger-api/apidom/tree/main/packages/apidom-core/src/elements) implemented on top
of [primitive ones](https://github.com/refractproject/minim/tree/main/lib/primitives).

```js
import { createNamespace } from '@swagger-api/apidom-core';

const namespace = createNamespace();

const objectElement = new namespace.elements.Object();
const commentElement = new namespace.elements.Comment();
```

It's possible to create namespace instances using another namespaces.

```js
import { createNamespace } from '@swagger-api/apidom-core';
import openApi3_1Namespace from '@swagger-api/apidom-ns-openapi-3-1';

const namespace = createNamespace(openApi3_1Namespace);

const objectElement = new namespace.elements.Object();
const openApiElement = new namespace.elements.OpenApi3_1();
```

When namespace instance is created in this way, it will extend the base namespace
with the namespace provided as an argument.

## Predicates

This package exposes [predicates](https://github.com/swagger-api/apidom/blob/main/packages/apidom-core/src/predicates/index.ts)
for all primitive elements and all higher order elements that are part of the base namespace.

```js
import { CommentElement, isCommentElement } from '@swagger-api/apidom-core';

const commentElement = new CommentElement();

isCommentElement(commentElement); // => true
```

[Predicate helpers](https://github.com/swagger-api/apidom/blob/main/packages/apidom-core/src/predicates/helpers.ts)
helps in building predicates for this and other packages.

```js
import { createPredicate } from '@swagger-api/apidom-core';

const isMyElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element) =>
      element instanceof MyElement ||
      (hasBasicElementProps(element) && isElementType('myElement', element) && primitiveEq('object', element));
  },
);
```

## Transcluder

Transclusion is the inclusion of one ApiDOM fragment into another ApiDOM fragment.
Our [transcluder](https://github.com/swagger-api/apidom/tree/main/packages/apidom-core/src/transcluder) does exactly that and is based on mutating algorithm.

```js
import { transclude, ArrayElement, NumberElement } from '@swagger-api/apidom-core';

const element = new ArrayElement([1, 2, 3]);
const search = element.get(1);
const replace = new NumberElement(4);

transclude(search, replace, element); // => ArrayElement<[1, 4, 3]>
```

When multiple transclusions are going to be performed use [Transcluder stamp](https://github.com/swagger-api/apidom/blob/main/packages/apidom-core/src/transcluder/Transcluder.ts)
for optimal performance.

```js
import { Transcluder, ArrayElement, NumberElement } from '@swagger-api/apidom-core';

const element = new ArrayElement([1, 2, 3]);
const search = element.get(1);
const replace = new NumberElement(4);
const transcluder = Transcluder({ element });

transcluder.transclude(search, replace); // => ArrayElement<[1, 4, 3]>
```

## Refractors

Refractor is a special layer inside the base namespace that can transform JavaScript structures
into generic ApiDOM structures built from elements of this base namespace.

**Refracting JavaScript structures**:

```js
import { ObjectElement } from '@swagger-api/apidom-core';

const object = {
    title: 'my title',
    description: 'my description',
    version: '0.1.0',
};

ObjectElement.refract(object); // => ObjectElement({ title, description, version })
```

```js
import { CommentElement } from '@swagger-api/apidom-core';

const comment = 'this is comment';

CommentElement.refract(comment); // => CommentElement('this is comment')
```

### Refractor plugins

Refractors can accept plugins as a second argument of refract static method.

```js
import { ObjectElement, StringElement } from '@swagger-api/apidom-core';

const object = { a: 'b' };

const plugin = ({ predicates, namespace }) => ({
  name: 'plugin',
  pre() {
      console.dir('runs before traversal');
  },
  visitor: {
    ObjectElement(objectElement) {
      objectElement.getMember('a').value = new StringElement('c');
    },
  },
  post() {
      console.dir('runs after traversal');
  },
});

ObjectElement.refract(object, { plugins: [plugin] }); // => ObjectElement({ a = 'c' })
```
You can define as many plugins as needed to enhance the resulting namespaced ApiDOM structure.
If multiple plugins with the same visitor method are defined, they run in parallel (just like in Babel).

#### Element identity plugin

`apidom` package comes with `refractorPluginElementIdentity`. When used, this plugin will
assign unique ID to all elements in ApiDOM tree.

```js
import { refractorPluginElementIdentity, ObjectElement } from '@swagger-api/apidom-core';

const objectElement = ObjectElement.refract({ a: 'b' }, {
  plugins: [
    refractorPluginElementIdentity(),
  ]
});

objectElement.id; // 8RaWF9
objectElement.getMember('a').key.id; // NdHHV7
objectElement.getMember('a').value.id; // rFGVFP
```

You can configure the plugin to generate unique IDs in the specific length:

```js
import { refractorPluginElementIdentity, ObjectElement } from '@swagger-api/apidom-core';

const objectElement = ObjectElement.refract({ a: 'b' }, {
  plugins: [
    refractorPluginElementIdentity({ length: 36}),
  ]
});

objectElement.id; // OnReGGrO7fMd9ztacvGfwGbOdGKuOFLiQQ1W
objectElement.getMember('a').key.id; // BN6rHsmqI56SMQ1elshtbgRVECtEWNYS9lmd
objectElement.getMember('a').value.id; // Ki4tWmf9xw9Lwb8MxkXJq1uONmJrmhXifmsI
```

#### Semantic element identity plugin

`apidom` package comes with `refractorPluginSemanticElementIdentity`. When used, this plugin will
assign unique ID to all non-primitive elements in ApiDOM tree. Primitive elements include
`ObjectElement`, `ArrayElement`, `StringElement`, `BooleanElement`, `NullElement` and `NumberElement`.

```js
import { refractorPluginSemanticElementIdentity, ObjectElement } from '@swagger-api/apidom-core';
import { InfoElement } from '@swagger-api/apidom-ns-openapi-3-1';

const infoElement = InfoElement.refract({ title: 'title' });
const objectElement = ObjectElement.refract({ a: 'b', info: infoElement }, {
  plugins: [
    refractorPluginSemanticElementIdentity(),
  ]
});

objectElement.id; // ''
objectElement.getMember('a').key.id; // ''
objectElement.getMember('a').value.id; // ''
objectElement.getMember('info').key.id; // ''
objectElement.getMember('info').value.id; // '8RaWF9'
```

You can configure the plugin to generate unique IDs in the specific length:

```js
import { refractorPluginSemanticElementIdentity, ObjectElement } from '@swagger-api/apidom-core';
import { InfoElement } from '@swagger-api/apidom-ns-openapi-3-1';

const infoElement = InfoElement.refract({ title: 'title' });
const objectElement = ObjectElement.refract({ a: 'b', info: infoElement }, {
  plugins: [
    refractorPluginSemanticElementIdentity({ length: 36 }),
  ]
});

objectElement.id; // ''
objectElement.getMember('a').key.id; // ''
objectElement.getMember('a').value.id; // ''
objectElement.getMember('info').key.id; // ''
objectElement.getMember('info').value.id; // 'OnReGGrO7fMd9ztacvGfwGbOdGKuOFLiQQ1W'
```

## Traversal

`apidom` comes with its own traversal algorithm along with couple of convenient abstractions on top of it.

### visit

[visit](https://github.com/swagger-api/apidom/blob/main/packages/apidom-core/src/traversal/visitor.ts#L104-L103) will walk through an AST using a depth first traversal, calling
the visitor's enter function at each node in the traversal, and calling the
leave function after visiting that node and all of its child nodes.

By returning different values from the enter and leave functions, the
behavior of the visitor can be altered, including skipping over a sub-tree of
the ApiDOM (by returning false), editing the ApiDOM by returning a value or null
to remove the value, or to stop the whole traversal by returning [BREAK](https://github.com/swagger-api/apidom/blob/main/packages/apidom-core/src/index.ts#L52).

When using `visit` to edit an ApiDOM, the original ApiDOM will not be modified, and
a new version of the ApiDOM with the changes applied will be returned from the
visit function.

```js
import { visit, ObjectElement, NumberElement } from '@swagger-api/apidom-core';

const visitor = {
    NumberElement(numberElement) {
        return new NumberElement(2);
    },
};
const element = new ObjectElement({ a: 1 });

const newElement = visit(element, visitor); // => ObjectElement<{a: 2}>
```

This function originally comes from [@swagger-api/apidom-ast package](https://github.com/swagger-api/apidom/blob/main/packages/apidom-ast/src/visitor.ts)
and is originally designed to work with [CST](https://en.wikipedia.org/wiki/Parse_tree). `apidom` package
imports it, specializes it to work with ApiDOM and re-export it.

All following algorithms are based on `visit` function.

### filter

Finds all elements matching the predicate.

```js
import { ObjectElement, filter, isNumberElement } from '@swagger-api/apidom-core'

const objElement = new ObjectElement({ a: 'b', c: 2 });

filter(isNumberElement, objElement); // => ArraySlice<[NumberElement<2>]>
```

### find

Find first element that satisfies the provided predicate.

```js
import { ObjectElement, find, isMemberElement } from '@swagger-api/apidom-core'

const objElement = new ObjectElement({ a: 'b', c: 2 });

find(isNumberElement, objElement); // => NumberElement<2>
```

### findAtOffset

ApiDOM nodes can be associated with source maps. This function finds the most inner node at the given offset.
If includeRightBound is set, also finds nodes that end at the given offset.

```js
import { findAtOffset } from '@swagger-api/apidom-core'

findAtOffset(3, elementWithSourceMaps); // => returns most inner node at offset 3
```

### reject

Complement of [filter](#filter).

```js
import { ArrayElement, reject, isNumberElement } from '@swagger-api/apidom-core'

const arrayElement = new ArrayElement([1, 'a']);

reject(isNumberElement, arrayElement); // => ArraySlice<[StringElement<'a'>]>
```

### some

Tests whether at least one element passes the predicate.

```js
import { ArrayElement, some, isNumberElement } from '@swagger-api/apidom-core'

const arrayElement = new ArrayElement([1, 'a']);

some(isNumberElement, arrayElement); // => true
```

### traverse

Executes the callback on this element and all descendants.

```js
import { ArrayElement, traverse } from '@swagger-api/apidom-core'

const arrayElement = new ArrayElement([1, 'a']);

traverse(console.dir, arrayElement); // => prints ArrayElement, NumberElement, StringElement in this order
```

The execution of the callback can be controlled further by providing a predicate.

```js
import { ArrayElement, traverse, isNumberElement } from '@swagger-api/apidom-core'

const arrayElement = new ArrayElement([1, 'a']);

traverse({ callback: console.dir, predicate: isNumberElement }, arrayElement); // => prints NumberElement<1>
```

### parents

Computes upwards edges from every child to its parent.

```js
import { ObjectElement, parents } from '@swagger-api/apidom-core';

const objectElement = new ObjectElement({
  a: [1, 2, { b: 'c', d: 'e' }],
});

const parentEdges = parents(objectElement); // => WeakMap<childElement, parentElement>
```

## Transformers

Following functions transforms ApiDOM between its various forms. All transformers (except `toValue`) can accept
ApiDOM namespace instance as a second argument.

### from

Transforms data to an Element from a particular namespace.

From a [refracted string](https://github.com/refractproject/refract-spec) form:

```js
import { from } from '@swagger-api/apidom-core';

const refractedString = '{"element":"number","content":1}';

from(refractedString); // => NumberElement<1>
```

From a [refracted](https://github.com/refractproject/refract-spec) form:

```js
import { from } from '@swagger-api/apidom-core';

const refracted = { element: 'number', content: 1 };

from(refracted); // => NumberElement<1>
```

From a JavaScript form:

```js
import { from } from '@swagger-api/apidom-core';

const javascriptForm = 1;

from(javascriptForm); // => NumberElement<1>
```

### toValue

Transforms the ApiDOM into JavaScript POJO. This POJO would be the result of interpreting the ApiDOM
into JavaScript structure.

```js
import { toValue, ObjectElement } from '@swagger-api/apidom-core';

const objElement = new ObjectElement({ a: 'b' });

toValue(objElement); // => { a: 'b' }
```

### dehydrate

Creates a [refract representation](https://github.com/refractproject/refract-spec) of the an Element.

```js
import { dehyrate, NumberElement } from '@swagger-api/apidom-core';

const numberElement = new NumberElement(1);

dehyrate(numberElement); // => { element: 'number', content: 1 }
```

### toString

Create a [refracted string](https://github.com/refractproject/refract-spec) representation of an Element.

```js
import { toString, NumberElement } from '@swagger-api/apidom-core';

const numberElement = new NumberElement(1);

toString(numberElement); // => '{"element":"number","content":1}'
```
