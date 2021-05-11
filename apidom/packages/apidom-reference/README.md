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
but if not provided the parser component will try to identify appropriate parser plugin by file contents, and it's extension.

What actually happens if you don't provide `mediaType` parsing option?

```js
import { parse } from 'apidom-reference';

await parse('https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.1/webhook-example.json');
```

The result of this operation is going to be generic ApiDOM structure. By analyzing the name of the file
we're about to parse, we can identify the extension of the file: `.json`. At this point we know
that this file is probably going to contain JSON string, though we have no idea what `specification` (AsyncApi/OpenApi)
is encoded within that JSON string. That's how we end up getting generic ApiDOM structure.

In the future, we will introduce smart algorithms for looking in the contents of a file and detecting the
`mediaType` by analyzing it. Of course not explicitly providing `mediaType` has performance implications
so providing it is always a better option.

### Extending parsing component

Parsing component can be extended by additional parser plugins. Every parser plugin is an object that
must conform to the following interface/shape:

```typescript
{
  // this method is called to determine if the parser can parse the file
  canParse(file: IFile): boolean {
    // ...implementation...
  },
  // this method actually parses the file
  async parse(file: IFile): Promise<ParseResultElement> {
    // ...implementation...
  }
}
```
When we have a plugin implemented, we need to provide it as option to a parsing function.

```js
import { parse, options, mergeOptions } from 'apidom-reference';

const myCustomParserPlugin = { ...implementation... };

await parse('/home/user/oas.json', mergeOptions(options, {
  parse: {
    mediaType: 'application/vnd.oai.openapi+json;version=3.1.0',
    parsers: [...options.parse.parsers, myCustomParserPlugin],
  }
}));
```

In this particular example we're adding our custom parser plugin as the last plugin
to the available default parser plugin list, so there's a good chance that one of the
default parser plugins determines that it can parse the `/home/user/oas.json` file,
parses it and returns.

If you want to force execution of your custom plugin, either add it as a first parser plugin:

```js
import { parse, options, mergeOptions } from 'apidom-reference';

const myCustomParserPlugin = { ...implementation... };

await parse('/home/user/oas.json', mergeOptions(options, {
  parse: {
    mediaType: 'application/vnd.oai.openapi+json;version=3.1.0',
    parsers: [myCustomParserPlugin, ...options.parse.parsers],
  }
}));
```

or override the default parsers entirely:

```js
import { parse } from 'apidom-reference';

const myCustomParserPlugin = { ...implementation... };

await parse('/home/user/oas.json', {
  parse: {
    mediaType: 'application/vnd.oai.openapi+json;version=3.1.0',
    parsers: [myCustomParserPlugin],
  }
});
```

**Removing** one or more of the **default parser plugin** is achieved in following way:

Removing default parser plugin globally for all subsequence `parse` calls is achieved by mutating global options:

```js
import { parse, options, mergeOptions } from 'apidom-reference';

options.parse.parsers = options.parse.parsers.filter(parserPlugin => parserPlugin !== 'asyncapi-json-2-0')

// here you can be sure `asyncapi-json-2-0` plugin was disabled
await parse('/home/user/oas.json', {
  parse: {
    mediaType: 'application/vnd.oai.openapi+json;version=3.1.0',
  }
});
```

Removing default parser plugin on ad-hoc basis:

```js
import { parse, options, mergeOptions } from 'apidom-reference';

await parse('/home/user/oas.json', {
  parse: {
    mediaType: 'application/vnd.oai.openapi+json;version=3.1.0',
    parsers: options.parse.parsers.filter(parserPlugin => parserPlugin !== 'asyncapi-json-2-0'),
  }
});
```

## Resolving component

## Dereference component


