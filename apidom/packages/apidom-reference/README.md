# apidom-reference

`apidom-reference` package contains advanced algorithms for semantic ApiDOM manipulations.
These algorithms include:

- **Advanced parsing**
- **External resolution**
- **Dereference**

...and many more.

`apidom-reference` package is divided into three (3) main components:

- **Parse component**
- **Resole component**
- **Dereference component**

## Parse component

Parse component consists of implementation of default [parser plugins](https://github.com/swagger-api/apidom/tree/master/apidom/packages/apidom-reference/src/parse/parsers).
Defaults parser plugin is a specialized wrapper that wraps one of the ApiDOM parser adapter into specialized API.
Standard ApiDOM parser adapter can only parse strings. Parser plugins are capable of parsing locale
or remote filesystem URIs and network URLs.

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

Notice how we explicitly pass a `mediaType` parse option. This option is actually **not required**,
but if not provided the parser component will try to identify appropriate parser plugin by file contents, and it's extension.

What actually happens if you don't provide `mediaType` parse option?

```js
import { parse } from 'apidom-reference';

await parse('https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.1/webhook-example.json');
```

The result of this operation is going to be generic ApiDOM structure. By analyzing the name of the file
we can identify the extension of the file as `.json`. At this point we only know
that this file is probably going to contain JSON string, though we have no idea what data (AsyncApi/OpenApi)
is encoded within that JSON string.

In the future, we will introduce smart algorithms for looking in the contents of a file and detecting the
`mediaType` automatically. Of course not explicitly providing `mediaType` has performance implications (running detection)
so providing it is always a better option.

### Parser plugins

Parse component comes with six (6) default parser plugins.

#### [openapi-json-3-1](https://github.com/swagger-api/apidom/tree/master/apidom/packages/apidom-reference/src/parse/parsers/apidom-reference-parser-openapi-json-3-1)

Wraps [apidom-parser-adapter-openapi-json-3-1](https://github.com/swagger-api/apidom/tree/master/apidom/packages/apidom-parser-adapter-openapi-json-3-1) package
and is uniquely  identified by `openapi-json-3-1` name.

Supported media types:

```js
[
  'application/vnd.oai.openapi;version=3.1.0',
  'application/vnd.oai.openapi+json;version=3.1.0',
]
```

#### [openapi-yaml-3-1](https://github.com/swagger-api/apidom/tree/master/apidom/packages/apidom-reference/src/parse/parsers/apidom-reference-parser-openapi-yaml-3-1)

Wraps [apidom-parser-adapter-openapi-yaml-3-1](https://github.com/swagger-api/apidom/tree/master/apidom/packages/apidom-parser-adapter-openapi-yaml-3-1) package
and is uniquely  identified by `openapi-yaml-3-1` name.

Supported media types:

```js
[
  'application/vnd.oai.openapi;version=3.1.0',
  'application/vnd.oai.openapi+yaml;version=3.1.0',
]
```

#### [asyncapi-json-2-0](https://github.com/swagger-api/apidom/tree/master/apidom/packages/apidom-reference/src/parse/parsers/apidom-reference-parser-asyncapi-json-2-0)

Wraps [apidom-parser-adapter-asyncapi-json-2-0](https://github.com/swagger-api/apidom/tree/master/apidom/packages/apidom-parser-adapter-asyncapi-json-2-0) package
and is uniquely identified by `asyncapi-json-2-0` name.

Supported media types:

```js
[
  'application/vnd.aai.asyncapi;version=2.0.0',
  'application/vnd.aai.asyncapi+json;version=2.0.0',
]
```

#### [asyncapi-yaml-2-0](https://github.com/swagger-api/apidom/tree/master/apidom/packages/apidom-reference/src/parse/parsers/apidom-reference-parser-asyncapi-yaml-2-0)

Wraps [apidom-parser-adapter-asyncapi-yaml-2-0](https://github.com/swagger-api/apidom/tree/master/apidom/packages/apidom-parser-adapter-asyncapi-yaml-2-0) package
and is uniquely  identified by `asyncapi-yaml-2-0` name.


Supported media types:

```js
[
  'application/vnd.aai.asyncapi;version=2.0.0',
  'application/vnd.aai.asyncapi+yaml;version=2.0.0',
]
```

#### [json](https://github.com/swagger-api/apidom/tree/master/apidom/packages/apidom-reference/src/parse/parsers/apidom-reference-parser-json)

Wraps [apidom-parser-adapter-json](https://github.com/swagger-api/apidom/tree/master/apidom/packages/apidom-parser-adapter-json) package
and is uniquely  identified by `json` name.


Supported media types:

```js
['application/json']
```

#### [yaml-1-2](https://github.com/swagger-api/apidom/tree/master/apidom/packages/apidom-reference/src/parse/parsers/apidom-reference-parser-yaml-1-2)

Wraps [apidom-parser-adapter-yaml-1-2](https://github.com/swagger-api/apidom/tree/master/apidom/packages/apidom-parser-adapter-yaml-1-2) package
and is uniquely  identified by `yaml-1-2` name.


Supported media types:

```js
['text/yaml', 'application/yaml']
```

#### Parser plugins execution order

It's important to understand that default parser plugins are run in specific order. The order is determined
by the [options.parse.parsers](https://github.com/swagger-api/apidom/blob/b3a391481360004d3d4a56c1467cece557442ec8/apidom/packages/apidom-reference/src/options/index.ts#L29) option.
Every plugin is pulled from `options.parse.parsers` option and it's `canParse` method is called to determine
whether the plugin can parse the URI. If `canParse` returns `true`, `parse` method of plugin is called
and result from parsing is returned. No subsequent parser plugins are processed. If `canParse` returns
`false`, next parser plugin is pulled and this process is repeated until one of the parser plugins `canParse` method
returns `true` or until entire list of parser plugins is exhausted (throws error).

```js
[
  OpenApiJson3_1Parser({ allowEmpty: true, sourceMap: false }),
  OpenApiYaml3_1Parser({ allowEmpty: true, sourceMap: false }),
  AsyncApiJson2_0Parser({ allowEmpty: true, sourceMap: false }),
  AsyncApiYaml2_0Parser({ allowEmpty: true, sourceMap: false }),
  JsonParser({ allowEmpty: true, sourceMap: false }),
  YamlParser({ allowEmpty: true, sourceMap: false }),
]
```

Most specific parser plugins and listed first, most generic are listed last.

It's possible to **change** the parser plugins **order globally** by mutating global parser options:

```js
import {
  options,
  OpenApiJson3_1Parser,
  OpenApiYaml3_1Parser,
  AsyncApiJson2_0Parser,
  AsyncApiYaml2_0Parser,
  JsonParser,
  YamlParser
} from 'apidom-reference';

options.parse.parsers = [
  OpenApiJson3_1Parser({ allowEmpty: true, sourceMap: false }),
  OpenApiYaml3_1Parser({ allowEmpty: true, sourceMap: false }),
  AsyncApiJson2_0Parser({ allowEmpty: true, sourceMap: false }),
  AsyncApiYaml2_0Parser({ allowEmpty: true, sourceMap: false }),
  YamlParser({ allowEmpty: true, sourceMap: false }),
  JsonParser({ allowEmpty: true, sourceMap: false }),
]
```

To **change** the parser plugins **order** on ad-hoc basis:

```js
import {
  parse,
  OpenApiJson3_1Parser,
  OpenApiYaml3_1Parser,
  AsyncApiJson2_0Parser,
  AsyncApiYaml2_0Parser,
  JsonParser,
  YamlParser
} from 'apidom-reference';

await parse('/home/user/oas.json', {
  parse: {
    mediaType: 'application/vnd.oai.openapi+json;version=3.1.0',
    parsers: [
      OpenApiJson3_1Parser({ allowEmpty: true, sourceMap: false }),
      OpenApiYaml3_1Parser({ allowEmpty: true, sourceMap: false }),
      AsyncApiJson2_0Parser({ allowEmpty: true, sourceMap: false }),
      AsyncApiYaml2_0Parser({ allowEmpty: true, sourceMap: false }),
      YamlParser({ allowEmpty: true, sourceMap: false }),
      JsonParser({ allowEmpty: true, sourceMap: false }),
    ],
  },
});
```

#### Parser plugin options

Parser plugins accept additional options like `allowEmpty` or `sourceMap`. It's possible to **change** parser plugin
**options globally** by mutating global parser options:

```js
import { options, parse } from 'apidom-reference';

options.parser.parserOpts = {
  allowEmpty: false,
  sourceMap: true,
};

await parse('/home/user/oas.json', {
  parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' }
});
```

To **change** the parser plugins **options** on ad-hoc basis:

```js
import { parse } from 'apidom-reference';

await parse('/home/user/oas.json', {
  parse: {
    mediaType: 'application/vnd.oai.openapi+json;version=3.1.0',
    parserOpts: { allowEmpty: false, sourceMap: true },
  },
});
```

### Creating new parser plugin

Parse component can be extended by additional parser plugins. Every parser plugin is an object that
must conform to the following interface/shape:

```typescript
{
  // uniquely identifies this plugin
  name: string,

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

New parser plugin is then provided as an option to a `parse` function:

```js
import { parse, options } from 'apidom-reference';

const myCustomParserPlugin = {
  name: 'myCustomParser',
  canParse(file) {
    return true;
  },
  async parse(file) {
     // implementation of parsing
  }
};

await parse('/home/user/oas.json', {
  parse: {
    mediaType: 'application/vnd.oai.openapi+json;version=3.1.0',
    parsers: [...options.parse.parsers, myCustomParserPlugin],
  }
});
```

In this particular example we're adding our custom parser plugin as the last plugin
to the available default parser plugin list, so there's a good chance that one of the
default parser plugins detects that it can parse the `/home/user/oas.json` file,
parses it and returns.

If you want to force execution of your custom plugin, add it as a first parser plugin:

```js
import { parse, options } from 'apidom-reference';

const myCustomParserPlugin = {
  name: 'myCustomParser',
  canParse(file) {
    return true;
  },
  async parse(file) {
    // implementation of parsing
  }
};

await parse('/home/user/oas.json', {
  parse: {
    mediaType: 'application/vnd.oai.openapi+json;version=3.1.0',
    parsers: [myCustomParserPlugin, ...options.parse.parsers],
  }
});
```

To override the default parser plugins entirely, set `myCustomParser` plugin to be the only one available:

```js
import { parse } from 'apidom-reference';

const myCustomParserPlugin = {
  name: 'myCustomParser',
  canParse(file) {
    return true;
  },
  async parse(file) {
    // implementation of parsing
  }
};

await parse('/home/user/oas.json', {
  parse: {
    mediaType: 'application/vnd.oai.openapi+json;version=3.1.0',
    parsers: [myCustomParserPlugin],
  }
});
```

### Manipulating parser plugins

Parser plugins can be added, removed, replaced or reordered.

Here are two examples of removing one of the parser plugins called `asyncapi-json-2-0`.
We're using the fact that every parser plugin is uniquely identifiable by its name.

**Removing** parser plugin **globally** for all subsequence `parse` calls is achieved by mutating global options:

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

**Removing** default parser plugin on **ad-hoc** basis:

```js
import { parse, options } from 'apidom-reference';

await parse('/home/user/oas.json', {
  parse: {
    mediaType: 'application/vnd.oai.openapi+json;version=3.1.0',
    parsers: options.parse.parsers.filter(parserPlugin => parserPlugin !== 'asyncapi-json-2-0'),
  }
});
```
As we can see, these are all primitive JavaScript Array manipulation techniques.
These techniques can be applied to replacing or reordering parser plugins as well.


## Resole component

## Dereference component


