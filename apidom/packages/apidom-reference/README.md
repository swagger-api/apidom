# apidom-reference

`apidom-reference` package contains advanced algorithms for semantic ApiDOM manipulations.
These algorithms include:

- **Advanced parsing**
- **External resolution**
- **Dereference**
- **JSON Pointer support**

...and many more.

Package is divided into three (3) main components:

- **Parsing component**
- **Resolving component**
- **Dereference component**

## Parsing component

Parsing component consists of implementation of default [parser plugins](https://github.com/swagger-api/apidom/tree/master/apidom/packages/apidom-reference/src/parse/parsers).
Defaults parser plugin is a specialized wrapper that wraps one of the ApiDOM parser adapter into specialized API.
Standard ApiDOM parser adapter can only parse AsyncApi/OpenApi definition if provided as a string.
Parser plugins are capable of parsing locale or remote filesystem URIs and network URLs.

**Parsing file localed on local filesystem:**

```js
import { parse } from 'apidom-reference';

await parse('/home/user/oas.json', {
  parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' }
});
```

**Parsing HTTP(S) URL located on internet:**

```js
import { parse } from 'apidom-reference';

await parse('https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.1/webhook-example.json', {
  parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' }
})
```

Notice how we explicitly pass a `mediaType` parsing option. This option is actually **not required**,
but if not provided the parser component will not be able to properly identify appropriate parser
plugin.

What actually happens if you don't provide `mediaType` parsing option?

```js
import { parse } from 'apidom-reference';

await parse('https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.1/webhook-example.json');
```

The result of this operation is going to be generic ApiDOM structure. By analyzing the name of the file
we're about to parse, we can identify the extension of the file: `.json`. At this point we know
that this file is probably going to contain JSON string, though we have no idea what `specification` (AsyncApi/OpenApi)
is encoded within that JSON string. That's how we end up getting generic ApiDOM structure.

In the future, we can introduce smart algorithms for looking in the contents of a file and detecting the
`mediaType` by analyzing it.

### Adding parser plugins

## Resolving component

## Dereference component


