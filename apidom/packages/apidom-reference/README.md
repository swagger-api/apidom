# apidom-reference

`apidom-reference` package contains advanced algorithms for semantic ApiDOM manipulations.
This package is divided into three (3) main components:

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


## Resolve component

Resolve component consists of two (2) sub-components: **File resolution** and **External Resolution**.
Resolve component is used by Parser component under the hood. Resolve components provides a resolved
file contents for a Parser component to parse.

### File resolution

Contains implementation of default [resolver plugins](https://github.com/swagger-api/apidom/tree/master/apidom/packages/apidom-reference/src/resolve/resolvers).
Defaults resolver plugin is an object which knows how to obtain contents of a file represented by URI or URL.

#### Resolver plugins

File resolution comes with two (2) default resolver plugins.

##### [FileResolver](https://github.com/swagger-api/apidom/blob/master/apidom/packages/apidom-reference/src/resolve/resolvers/FileResolver.ts)

This resolver plugin is responsible for resolving a local file.
It detects if the provided URI represents a filesystem path and if so,
reads the file and provides its content.

##### [HttpResolverAxios](https://github.com/swagger-api/apidom/blob/master/apidom/packages/apidom-reference/src/resolve/resolvers/HttpResolverAxios.ts)

This resolver plugin is responsible for resolving a remove file represented by HTTP(s) URL.
It detects if the provided URI represents a HTTP(s) URL and if so,
fetches the file and provides its content.

**File resolution on local filesystem path**:

```js
import { readFile } from 'apidom-reference';

await readFile('/home/user/oas.json'); // Promise<Buffer>
```

**File resolution on HTTP(s) URL:**

```js
import { readFile } from 'apidom-reference';

await readFile('https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.1/webhook-example.json'); // Promise<Buffer>
```
File resolution always returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) containing a [Buffer](https://nodejs.org/api/buffer.html).
It is responsibility of the API consumer to transform Butter into string or any other type.

```js
import { readFile } from 'apidom-reference';

const buffer = await readFile('/home/user/oas.json');
const string = buffer.toString('utf-8');
```

##### Resolver plugins execution order

It's important to understand that default resolver plugins are run in specific order. The order is determined
by the [options.resolve.resolvers](https://github.com/swagger-api/apidom/blob/729a4aa604fb22bd737756ca49eccd6b011bf354/apidom/packages/apidom-reference/src/options/index.ts#L54) option.
Every plugin is pulled from `options.resolve.resolvers` option and it's `canRead` method is called to determine
whether the plugin can resolve the URI. If `canRead` returns `true`, `read` method of plugin is called
and result from reading the file is returned. No subsequent resolver plugins are processed.
If `canRead` returns `false`, next resolver plugin is pulled and this process is repeated until one
of the resolver plugins `canRead` method returns `true` or until entire list of resolver plugins is exhausted (throws error).

```js
[
  FileResolver(),
  HttpResolverAxios({ timeout: 5000, redirects: 5, withCredentials: false }),
]
```

It's possible to **change** resolver plugins **order globally** by mutating global resolve options:

```js
import { options, FileResolver, HttpResolverAxios } from 'apidom-reference';

options.resolve.resolvers = [
  HttpResolverAxios({ timeout: 5000, redirects: 5, withCredentials: false }),
  FileResolver(),
]
```

To **change** resolver plugins **order** on ad-hoc basis:

```js
import { readFile, FileResolver, HttpResolverAxios } from 'apidom-reference';

await readFile('/home/user/oas.json', {
  resolve: {
    resolvers: [
      HttpResolverAxios({ timeout: 5000, redirects: 5, withCredentials: false }),
      FileResolver(),
    ],
  },
});
```

##### Resolver plugin options

Some resolver plugins accept additional options. It's possible to **change** resolver plugin
**options globally** by mutating global resolver options:

```js
import { options, readFile } from 'apidom-reference';

options.resolve.resolverOpts = {
  timeout: 10000,
};

await readFile('https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.1/webhook-example.json');
```

To **change** the resolver plugins **options** on ad-hoc basis:

```js
import { readFile } from 'apidom-reference';

await readFile('https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.1/webhook-example.json', {
  resolve: {
    resolverOpts: { timeout: 10000 },
  },
});
```

Both of above examples will be using [HttpResolverAxios](https://github.com/swagger-api/apidom/blob/master/apidom/packages/apidom-reference/src/resolve/resolvers/HttpResolverAxios.ts) plugin.
(as we're trying to resolve HTTP(s) URL) and the `timeout` of resolution will increase from default 3 seconds
to 10 seconds.

##### Creating new resolver plugin

Resolve component can be extended by additional resolver plugins. Every resolver plugin is an object that
must conform to the following interface/shape:

```typescript
{
  // uniquely identifies this plugin
  name: string,

  // this method is called to determine if the resolver plugin can resolve the file
  canRead(file: IFile): boolean {
    // ...implementation...
  },

  // this method actually resolves the file
  async read(file: IFile): Promise<Buffer> {
    // ...implementation...
  }
}
```

New resolver plugin is then provided as an option to a `readFile` function:

```js
import { readFile, options } from 'apidom-reference';

const myCustomResolverPlugin = {
  name: 'myCustomResolver',
  canRead(file) {
    return true;
  },
  async read(file) {
     // implementation of file resolution
  }
};

await readFile('/home/user/oas.json', {
  resolve: {
    resolvers: [...options.resolve.resolvers, myCustomResolverPlugin],
  }
});
```

In this particular example we're adding our custom resolver plugin as the last plugin
to the available default resolver plugin list, so there's a good chance that one of the
default resolver plugins detects that it can resolve the `/home/user/oas.json` file,
resolves it and returns its content.

If you want to force execution of your custom plugin, add it as a first resolver plugin:

```js
import { readFile, options } from 'apidom-reference';

const myCustomResolverPlugin = {
  name: 'myCustomResolver',
  canRead(file) {
    return true;
  },
  async read(file) {
    // implementation of file resolution
  }
};

await readFile('/home/user/oas.json', {
  resolve: {
    resolvers: [myCustomResolverPlugin, ...options.resolve.resolvers],
  }
});
```

To override the default resolver plugins entirely, set `myCustomResolver` plugin to be the only one available:

```js
import { readFile } from 'apidom-reference';

const myCustomResolverPlugin = {
  name: 'myCustomResolver',
  canRead(file) {
    return true;
  },
  async read(file) {
    // implementation of file resolution
  }
};

await readFile('/home/user/oas.json', {
  resolve: {
    resolvers: [myCustomResolverPlugin],
  }
});
```
New resolver plugins can be based on two predefined stamps: [Resolver](https://github.com/swagger-api/apidom/blob/master/apidom/packages/apidom-reference/src/resolve/resolvers/Resolver.ts) and [HttpResolver](https://github.com/swagger-api/apidom/blob/master/apidom/packages/apidom-reference/src/resolve/resolvers/HttpResolver.ts).

##### Manipulating resolver plugins

Resolver plugins can be added, removed, replaced or reordered. We've already covered these techniques in [Manipulating parser plugins section](#manipulating-parser-plugins).

### External resolution

External resolution is a process of resolving all external dependencies of a particular
document using a specific [external resolution strategy](https://github.com/swagger-api/apidom/tree/master/apidom/packages/apidom-reference/src/resolve/strategies). External resolution strategy is determined by
asserting on `mediaType`. **File Resolution** (file content is read/fetched)
and **Parser component** (file content is parsed) are used under the hood.

**Externally resolving file localed on local filesystem:**

```js
import { resolve } from 'apidom-reference';

await resolve('/home/user/oas.json', {
  parse: { mediType: 'application/vnd.oai.openapi+json;version=3.1.0' },
  resolve: { resolverOpts: { timeout: 10 } },
}); // Promise<ReferenceSet>
```

**Externally resolving HTTP(S) URL located on internet:**

```js
import { resolve } from 'apidom-reference';

await resolve('https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.1/webhook-example.json', {
  parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
  resolve: { resolverOpts: { timeout: 10 } },
}); // Promise<ReferenceSet>
```

**Externally resolving an ApiDOM fragment:**

When externally resolving an ApiDOM fragment, [baseURI](https://github.com/swagger-api/apidom/blob/91763fa4ad876375a413e7049c28c2031c7bbe83/apidom/packages/apidom-reference/src/options/index.ts#L47)
resolve option needs to have a starting point for external dependency resolution.
`mediaType` parse option is unnecessary as we can directly assert the type of ApiDOM fragment.

```js
import { OpenApi3_1Element } from 'apidom-ns-openapi-3-1';
import { resolveApiDOM } from 'apidom-reference';

const apidom = OpenApi3_1Element.refract({
  openapi: '3.1.0',
  components: {
    parameters: {
      externalRef: {
        $ref: './ex.json#/externalParameter', // file is located at /home/user/ex.json
      }
    }
  }
});

const refSet = await resolveApiDOM(apidom, {
  resolve: { baseURI: '/home/user/' },
});

for (const ref of refSet) {
  console.log(ref.uri);
}
// /home/user
// /home/user/ex.json
```

[ReferenceSet](https://github.com/swagger-api/apidom/blob/master/apidom/packages/apidom-reference/src/ReferenceSet.ts) is a [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
like structure containing [Reference](https://github.com/swagger-api/apidom/blob/master/apidom/packages/apidom-reference/src/Reference.ts) objects.
Every Reference object represents single external dependency.

#### [External resolution strategies](https://github.com/swagger-api/apidom/tree/master/apidom/packages/apidom-reference/src/resolve/strategies)

External resolution strategy determines how a document is externally resolved. Depending on document `mediaType`
every strategy differs significantly. Resolve component comes with two (2) default external resolution strategies.

##### [asyncapi-2-0](https://github.com/swagger-api/apidom/tree/master/apidom/packages/apidom-reference/src/resolve/strategies/asyncapi-2-0)

External resolution strategy for understanding and resolving external dependencies of [AsyncApi 2.0.0](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md) definitions.

Supported media types:

```js
[
  'application/vnd.aai.asyncapi;version=2.0.0',
  'application/vnd.aai.asyncapi+json;version=2.0.0',
  'application/vnd.aai.asyncapi+yaml;version=2.0.0'
]
```

##### [openapi-3-1](https://github.com/swagger-api/apidom/tree/master/apidom/packages/apidom-reference/src/resolve/strategies/openapi-3-1)

External resolution strategy for understanding and resolving external dependencies of [OpenApi 3.1.0](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md) definitions.

Supported media types:

```js
[
  'application/vnd.oai.openapi;version=3.1.0',
  'application/vnd.oai.openapi+json;version=3.1.0',
  'application/vnd.oai.openapi+yaml;version=3.1.0'
]
```

##### External resolution strategies execution order

It's important to understand that default external resolution strategies are run in specific order. The order is determined
by the [options.resolve.strategies](https://github.com/swagger-api/apidom/blob/b3a391481360004d3d4a56c1467cece557442ec8/apidom/packages/apidom-reference/src/options/index.ts#L60) option.
Every strategy is pulled from `options.resolve.strategies` option and it's `canResolve` method is called to determine
whether the strategy can externally resolve the URI. If `canResolve` returns `true`, `resolve` method of plugin is called
and result from external resolution is returned. No subsequent strategies  are processed. If `canResolve` returns
`false`, next strategy is pulled and this process is repeated until one of the strategy's `canResolve` method
returns `true` or until entire list of strategies is exhausted (throws error).

```js
[
  OpenApi3_1ResolveStrategy(),
  AsyncApi2_0ResolveStrategy()
]
```
Most specific parser plugins and listed first, most generic are listed last.

It's possible to **change** strategies **order globally** by mutating global resolve options:

```js
import { options, AsyncApi2_0ResolveStrategy, AsyncApi2_0ResolveStrategy } from 'apidom-reference';

options.resolve.strategies = [
  AsyncApi2_0ResolveStrategy(),
  OpenApi3_1ResolveStrategy(),
];
```

To **change** the strategies **order** on ad-hoc basis:

```js
import { resolve, AsyncApi2_0ResolveStrategy, AsyncApi2_0ResolveStrategy } from 'apidom-reference';

await resolve('/home/user/oas.json', {
  parse: {
    mediaType: 'application/vnd.oai.openapi+json;version=3.1.0',
  },
  resolve: {
    strategies: [
      AsyncApi2_0ResolveStrategy(),
      OpenApi3_1ResolveStrategy(),
    ]
  }
});
```
##### Creating new external resolution strategy

Resolve component can be extended by additional strategies. Every strategy is an object that
must conform to the following interface/shape:

```typescript
{
  // uniquely identifies this plugin
  name: string,

  // this method is called to determine if the strategy can resolve the file
  canResolve(file: IFile): boolean {
    // ...implementation...
  },

  // this method actually externally resolves the file
  async resolve(file: IFile): Promise<ReferenceSet> {
    // ...implementation...
  }
}
```

New strategy is then provided as an option to a `resolve` function:

```js
import { resolve, options } from 'apidom-reference';

const myCustomResolverStrategy = {
  name: 'myCustomResolverStrategy',
  canResolve(file) {
    return true;
  },
  async resolve(file) {
     // implementation of file resolution
  }
};

await resolve('/home/user/oas.json', {
  resolve: {
    strategies: [...options.resolve.strategies, myCustomResolverStrategy],
  }
});
```

In this particular example we're adding our custom strategy as the last strategy
to the available default external resolution strategy list, so there's a good chance that one of the
default strategies detects that it can externally resolve the `/home/user/oas.json` file,
resolves it and returns ReferenceSet object.

If you want to force execution of your strategy, add it as a first onen:

```js
import { resolve, options } from 'apidom-reference';


const myCustomResolverStrategy = {
  name: 'myCustomResolverStrategy',
  canResolve(file) {
    return true;
  },
  async resolve(file) {
    // implementation of file resolution
  }
};

await resolve('/home/user/oas.json', {
  resolve: {
    strategies: [myCustomResolverStrategy, ...options.resolve.strategies],
  }
});
```

To override the default strategies entirely, set `myCustomResolverStrategy` strategy to be the only one available:

```js
import { resolve } from 'apidom-reference';

const myCustomResolverStrategy = {
  name: 'myCustomResolverStrategy',
  canResolve(file) {
    return true;
  },
  async resolve(file) {
    // implementation of file resolution
  }
};

await resolve('/home/user/oas.json', {
  resolve: {
    strategies: [myCustomResolverPlugin],
  }
});
```
New strategies can be based on a predefined stamp called [ResolveStrategy](https://github.com/swagger-api/apidom/blob/master/apidom/packages/apidom-reference/src/resolve/strategies/ResolveStrategy.ts).

##### Manipulating external resolution strategies

External resolution strategies can be added, removed, replaced or reordered. We've already covered these techniques in [Manipulating parser plugins section](#manipulating-parser-plugins).



## Dereference component


