# @swagger-api/apidom-reference

`@swagger-api/apidom-reference` package contains advanced algorithms for semantic ApiDOM manipulations.
This package is divided into three (3) main components:

- **Parse component**
- **Resolve component**
- **Dereference component**

## Installation

After [prerequisites](https://github.com/swagger-api/apidom/blob/main/README.md#prerequisites) for installing this package are satisfied, you can install it
via [npm CLI](https://docs.npmjs.com/cli) by running the following command:

```sh
 $ npm install @swagger-api/apidom-reference
```

## Configurations

This package has two main exports suitable for different use-cases. **Empty** configuration and **saturated** configuration.

### Empty configuration

```js
import { parse } from '@swagger-api/apidom-reference/configuration/empty';
import { OpenApiJson3_1Parser } from '@swagger-api/apidom-reference/parse/parsers/openapi-json-3-1';

await parse('/home/user/oas.json', {
  parse: {
    mediaType: 'application/vnd.oai.openapi+json;version=3.1.0',
    parsers: [OpenApiJson3_0Parser({ allowEmpty: true, sourceMap: false })]
  }
});
```

When using this approach, `options` object is not configured with parsers, resolvers or strategies.
This is suitable for creating **web bundles** and gives you total control of the contents of your bundles.

### Saturated configuration

```js
import { parse } from '@swagger-api/apidom-reference';
```
or
```js
import { parse } from '@swagger-api/apidom-reference/configuration/saturaged';
```

Both of above imports are equivalent. This approach is suitable for **Node.js** environments.
`options` object is pre-configured with all the parsers, resolvers and strategies.

## Parse component

Parse component consists of implementation of default [parser plugins](https://github.com/swagger-api/apidom/tree/main/packages/apidom-reference/src/parse/parsers).
Defaults parser plugin is a specialized wrapper that wraps one of the ApiDOM parser adapter into specialized API.
Standard ApiDOM parser adapter can only parse strings. Parser plugins are capable of parsing local filesystem URIs and network URLs.

**Parsing a file localed on local filesystem:**

```js
import { parse } from '@swagger-api/apidom-reference';

await parse('/home/user/oas.json', {
  parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' }
});
```

**Parsing an HTTP(S) URL located on internet:**

```js
import { parse } from '@swagger-api/apidom-reference';

await parse('https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.1/webhook-example.json', {
  parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' }
})
```

Notice how we explicitly pass a `mediaType` parse option. This option is actually **not required**,
but if not provided, the Parse component will try to identify appropriate parser plugin by file contents, and it's extension (`.json`).

What actually happens if you don't provide `mediaType` parse option?

```js
import { parse } from '@swagger-api/apidom-reference';

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

Parse component comes with number of default parser plugins.

#### [openapi-json-3-0](https://github.com/swagger-api/apidom/tree/main/packages/apidom-reference/src/parse/parsers/openapi-json-3-0)

Wraps [@swagger-api/apidom-parser-adapter-openapi-json-3-0](https://github.com/swagger-api/apidom/tree/main/packages/apidom-parser-adapter-openapi-json-3-0) package
and is uniquely  identified by `openapi-json-3-1` name.

Supported media types are:

```js
[
  'application/vnd.oai.openapi;version=3.0.0',
  'application/vnd.oai.openapi+json;version=3.0.0',
  'application/vnd.oai.openapi;version=3.0.1',
  'application/vnd.oai.openapi+json;version=3.0.1',
  'application/vnd.oai.openapi;version=3.0.2',
  'application/vnd.oai.openapi+json;version=3.0.2',
  'application/vnd.oai.openapi;version=3.0.3',
  'application/vnd.oai.openapi+json;version=3.0.3',
]
```

#### [openapi-yaml-3-0](https://github.com/swagger-api/apidom/tree/main/packages/apidom-reference/src/parse/parsers/openapi-yaml-3-0)

Wraps [@swagger-api/apidom-parser-adapter-openapi-yaml-3-0](https://github.com/swagger-api/apidom/tree/main/packages/apidom-parser-adapter-openapi-yaml-3-0) package
and is uniquely  identified by `openapi-yaml-3-1` name.

Supported media types are:

```js
[
  'application/vnd.oai.openapi;version=3.0.0',
  'application/vnd.oai.openapi+yaml;version=3.0.0',
  'application/vnd.oai.openapi;version=3.0.1',
  'application/vnd.oai.openapi+yaml;version=3.0.1',
  'application/vnd.oai.openapi;version=3.0.2',
  'application/vnd.oai.openapi+yaml;version=3.0.2',
  'application/vnd.oai.openapi;version=3.0.3',
  'application/vnd.oai.openapi+yaml;version=3.0.3',
]
```

#### [openapi-json-3-1](https://github.com/swagger-api/apidom/tree/main/packages/apidom-reference/src/parse/parsers/openapi-json-3-1)

Wraps [@swagger-api/apidom-parser-adapter-openapi-json-3-1](https://github.com/swagger-api/apidom/tree/main/packages/apidom-parser-adapter-openapi-json-3-1) package
and is uniquely  identified by `openapi-json-3-1` name.

Supported media types are:

```js
[
  'application/vnd.oai.openapi;version=3.1.0',
  'application/vnd.oai.openapi+json;version=3.1.0',
]
```

#### [openapi-yaml-3-1](https://github.com/swagger-api/apidom/tree/main/packages/apidom-reference/src/parse/parsers/openapi-yaml-3-1)

Wraps [@swagger-api/apidom-parser-adapter-openapi-yaml-3-1](https://github.com/swagger-api/apidom/tree/main/packages/apidom-parser-adapter-openapi-yaml-3-1) package
and is uniquely  identified by `openapi-yaml-3-1` name.

Supported media types are:

```js
[
  'application/vnd.oai.openapi;version=3.1.0',
  'application/vnd.oai.openapi+yaml;version=3.1.0',
]
```

#### [asyncapi-json-2](https://github.com/swagger-api/apidom/tree/main/packages/apidom-reference/src/parse/parsers/asyncapi-json-2)

Wraps [@swagger-api/apidom-parser-adapter-asyncapi-json-2](https://github.com/swagger-api/apidom/tree/main/packages/apidom-parser-adapter-asyncapi-json-2) package
and is uniquely identified by `asyncapi-json-2` name.

Supported media types are:

```js
[
  'application/vnd.aai.asyncapi;version=2.0.0',
  'application/vnd.aai.asyncapi;version=2.1.0',
  'application/vnd.aai.asyncapi;version=2.2.0',
  'application/vnd.aai.asyncapi;version=2.3.0',
  'application/vnd.aai.asyncapi;version=2.4.0',
  'application/vnd.aai.asyncapi;version=2.5.0',
  'application/vnd.aai.asyncapi;version=2.6.0',
  'application/vnd.aai.asyncapi+json;version=2.0.0',
  'application/vnd.aai.asyncapi+json;version=2.1.0',
  'application/vnd.aai.asyncapi+json;version=2.2.0',
  'application/vnd.aai.asyncapi+json;version=2.3.0',
  'application/vnd.aai.asyncapi+json;version=2.4.0',
  'application/vnd.aai.asyncapi+json;version=2.5.0',
  'application/vnd.aai.asyncapi+json;version=2.6.0',
]
```

#### [asyncapi-yaml-2](https://github.com/swagger-api/apidom/tree/main/packages/apidom-reference/src/parse/parsers/asyncapi-yaml-2)

Wraps [@swagger-api/apidom-parser-adapter-asyncapi-yaml-2](https://github.com/swagger-api/apidom/tree/main/packages/apidom-parser-adapter-asyncapi-yaml-2) package
and is uniquely  identified by `asyncapi-yaml-2` name.


Supported media types are:

```js
[
  'application/vnd.aai.asyncapi;version=2.0.0',
  'application/vnd.aai.asyncapi;version=2.1.0',
  'application/vnd.aai.asyncapi;version=2.2.0',
  'application/vnd.aai.asyncapi;version=2.3.0',
  'application/vnd.aai.asyncapi;version=2.3.0',
  'application/vnd.aai.asyncapi;version=2.4.0',
  'application/vnd.aai.asyncapi;version=2.5.0',
  'application/vnd.aai.asyncapi;version=2.6.0',
  'application/vnd.aai.asyncapi+yaml;version=2.0.0',
  'application/vnd.aai.asyncapi+yaml;version=2.1.0',
  'application/vnd.aai.asyncapi+yaml;version=2.2.0',
  'application/vnd.aai.asyncapi+yaml;version=2.3.0',
  'application/vnd.aai.asyncapi+yaml;version=2.4.0',
  'application/vnd.aai.asyncapi+yaml;version=2.5.0',
  'application/vnd.aai.asyncapi+yaml;version=2.6.0',
]
```

#### [api-design-systems-json](https://github.com/swagger-api/apidom/tree/main/packages/apidom-reference/src/parse/parsers/api-design-systems-json)

Wraps [@swagger-api/apidom-parser-adapter-api-design-systsems-json](https://github.com/swagger-api/apidom/tree/main/packages/apidom-parser-adapter-api-design-systems-json) package
and is uniquely identified by `api-design-systems-json` name.

Supported media types are:

```js
[
  'application/vnd.aai.apidesignsystems;version=2021-05-07',
  'application/vnd.aai.apidesignsystems+json;version=2021-05-07'
]
```

#### [api-design-systems-yaml](https://github.com/swagger-api/apidom/tree/main/packages/apidom-reference/src/parse/parsers/api-design-systems-yaml)

Wraps [@swagger-api/apidom-parser-adapter-api-design-systems-yaml](https://github.com/swagger-api/apidom/tree/main/packages/apidom-parser-adapter-api-design-systems-yaml) package
and is uniquely  identified by `api-design-systems-yaml` name.


Supported media types are:

```js
[
  'application/vnd.aai.apidesignsystems;version=2021-05-07',
  'application/vnd.aai.apidesignsystems+yaml;version=2021-05-07'
]
```

#### [json](https://github.com/swagger-api/apidom/tree/main/packages/apidom-reference/src/parse/parsers/json)

Wraps [@swagger-api/apidom-parser-adapter-json](https://github.com/swagger-api/apidom/tree/main/packages/apidom-parser-adapter-json) package
and is uniquely  identified by `json` name.


Supported media types are:

```js
[
  'application/json'
]
```

#### [yaml-1-2](https://github.com/swagger-api/apidom/tree/main/packages/apidom-reference/src/parse/parsers/yaml-1-2)

Wraps [@swagger-api/apidom-parser-adapter-yaml-1-2](https://github.com/swagger-api/apidom/tree/main/packages/apidom-parser-adapter-yaml-1-2) package
and is uniquely  identified by `yaml-1-2` name.


Supported media types are:

```js
[
  'text/yaml',
  'application/yaml'
]
```

#### [binary](https://github.com/swagger-api/apidom/tree/main/packages/apidom-reference/src/parse/parsers/binary)

Can parse any binary or non-binary file and return it's content as `base64` encoded string.
This parser is uniquely identified by `binary` name.


**All** media types are supported.

#### Parser plugins execution order

It's important to understand that default parser plugins are run in specific order. The order is determined
by the [options.parse.parsers](https://github.com/swagger-api/apidom/blob/ba888d711a4292e8ed0b72e343c4902a4bf0d45a/packages/apidom-reference/src/configuration/saturated.ts#L22) option.
Every plugin is pulled from `options.parse.parsers` option, and it's `canParse` method is called to determine
whether the plugin can parse the URI. If `canParse` returns `true`, `parse` method of plugin is called
and result from parsing is returned. No subsequent parser plugins are run. If `canParse` returns
`false`, next parser plugin is pulled and this process is repeated until one of the parser plugins `canParse` method
returns `true` or until entire list of parser plugins is exhausted (throws error).

```js
[
  OpenApiJson3_0Parser({ allowEmpty: true, sourceMap: false }),
  OpenApiYaml3_0Parser({ allowEmpty: true, sourceMap: false }),
  OpenApiYaml3_1Parser({ allowEmpty: true, sourceMap: false }),
  OpenApiJson3_1Parser({ allowEmpty: true, sourceMap: false }),
  OpenApiYaml3_1Parser({ allowEmpty: true, sourceMap: false }),
  AsyncApiJson2Parser({ allowEmpty: true, sourceMap: false }),
  AsyncApiYaml2Parser({ allowEmpty: true, sourceMap: false }),
  ApiDesignSystemsJsonParser({ allowEmpty: true, sourceMap: false }),
  ApiDesignSystemsYamlParser({ allowEmpty: true, sourceMap: false }),
  JsonParser({ allowEmpty: true, sourceMap: false }),
  YamlParser({ allowEmpty: true, sourceMap: false }),
  BinaryParser({ allowEmpty: true }),
]
```
Most specific parser plugins are listed first, most generic are listed last.

It's possible to **change** the parser plugins **order globally** by mutating global `parse` options:

```js
import { options } from '@swagger-api/apidom-reference';
import { OpenApiJson3_0Parser } from '@swagger-api/apidom-reference/parse/parsers/openapi-json-3-0';
import { OpenApiYaml3_0Parser } from '@swagger-api/apidom-reference/parse/parsers/openapi-yaml-3-0'
import { OpenApiJson3_1Parser } from '@swagger-api/apidom-reference/parse/parsers/openapi-json-3-1';
import { OpenApiYaml3_1Parser } from '@swagger-api/apidom-reference/parse/parsers/openapi-yaml-3-1'
import { AsyncApiJson2Parser } from '@swagger-api/apidom-reference/parse/parsers/asyncapi-json-2';
import { AsyncApiYaml2Parser } from '@swagger-api/apidom-reference/parse/parsers/asyncapi-yaml-2';
import { ApiDesignSystemsJsonParser } from '@swagger-api/apidom-reference/parse/parsers/api-design-systems-json';
import { ApiDesignSystemsYamlParser } from '@swagger-api/apidom-reference/parse/parsers/api-design-systems-json';
import { JsonParser } from '@swagger-api/apidom-reference/parse/parsers/json';
import { YamlParser } from '@swagger-api/apidom-reference/parse/parsers/yaml';
import { BinaryParser } from '@swagger-api/apidom-reference/parse/parsers/binary';


options.parse.parsers = [
  OpenApiJson3_0Parser({ allowEmpty: true, sourceMap: false }),
  OpenApiYaml3_0Parser({ allowEmpty: true, sourceMap: false }),
  OpenApiJson3_1Parser({ allowEmpty: true, sourceMap: false }),
  OpenApiYaml3_1Parser({ allowEmpty: true, sourceMap: false }),
  AsyncApiJson2Parser({ allowEmpty: true, sourceMap: false }),
  AsyncApiYaml2Parser({ allowEmpty: true, sourceMap: false }),
  ApiDesignSystemsJsonParser({ allowEmpty: true, sourceMap: false }),
  ApiDesignSystemsYamlParser({ allowEmpty: true, sourceMap: false }),
  YamlParser({ allowEmpty: true, sourceMap: false }),
  JsonParser({ allowEmpty: true, sourceMap: false }),
  BinaryParser({ allowEmpty: true }),
]
```

To **change** the parser plugins **order** on ad-hoc basis:

```js
import { parse } from '@swagger-api/apidom-reference';
import { OpenApiJson3_0Parser } from '@swagger-api/apidom-reference/parse/parsers/openapi-json-3-0';
import { OpenApiYaml3_0Parser } from '@swagger-api/apidom-reference/parse/parsers/openapi-yaml-3-0'
import { OpenApiJson3_1Parser } from '@swagger-api/apidom-reference/parse/parsers/openapi-json-3-1';
import { OpenApiYaml3_1Parser } from '@swagger-api/apidom-reference/parse/parsers/openapi-yaml-3-1'
import { AsyncApiJson2Parser } from '@swagger-api/apidom-reference/parse/parsers/asyncapi-json-2';
import { AsyncApiYaml2Parser } from '@swagger-api/apidom-reference/parse/parsers/asyncapi-yaml-2';
import { ApiDesignSystemsJsonParser } from '@swagger-api/apidom-reference/parse/parsers/api-design-systems-json';
import { ApiDesignSystemsYamlParser } from '@swagger-api/apidom-reference/parse/parsers/api-design-systems-json';
import { JsonParser } from '@swagger-api/apidom-reference/parse/parsers/json';
import { YamlParser } from '@swagger-api/apidom-reference/parse/parsers/yaml';
import { BinaryParser } from '@swagger-api/apidom-reference/parse/parsers/binary';

await parse('/home/user/oas.json', {
  parse: {
    mediaType: 'application/vnd.oai.openapi+json;version=3.1.0',
    parsers: [
      OpenApiJson3_1Parser({ allowEmpty: true, sourceMap: false }),
      OpenApiYaml3_1Parser({ allowEmpty: true, sourceMap: false }),
      OpenApiJson3_0Parser({ allowEmpty: true, sourceMap: false }),
      OpenApiYaml3_0Parser({ allowEmpty: true, sourceMap: false }),
      AsyncApiJson2Parser({ allowEmpty: true, sourceMap: false }),
      AsyncApiYaml2Parser({ allowEmpty: true, sourceMap: false }),
      ApiDesignSystemsJsonParser({ allowEmpty: true, sourceMap: false }),
      ApiDesignSystemsYamlParser({ allowEmpty: true, sourceMap: false }),
      YamlParser({ allowEmpty: true, sourceMap: false }),
      JsonParser({ allowEmpty: true, sourceMap: false }),
      BinaryParser({ allowEmpty: true }),
    ],
  },
});
```

#### Parser plugin options

Parser plugins accept additional options like `allowEmpty` or `sourceMap`. It's possible to **change** parser plugin
**options globally** by mutating global `parse` options:

```js
import { options, parse } from '@swagger-api/apidom-reference';

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
import { parse } from '@swagger-api/apidom-reference';

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
  // uniquely identifies this parser plugin
  name: string,

  // this method is called to determine whether the parser plugin can parse the file
  async canParse(file: IFile): Promise<boolean> {
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
import { parse, options } from '@swagger-api/apidom-reference';

const myCustomParserPlugin = {
  name: 'myCustomParserPlugin',
  async canParse(file) {
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
import { parse, options } from '@swagger-api/apidom-reference';

const myCustomParserPlugin = {
  name: 'myCustomParserPlugin',
  async canParse(file) {
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

To override the default parser plugins entirely, set `myCustomParserPlugin` plugin to be the only one available:

```js
import { parse } from '@swagger-api/apidom-reference';

const myCustomParserPlugin = {
  name: 'myCustomParserPlugin',
  async canParse(file) {
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

Here are two examples of removing one of the parser plugins called `asyncapi-json-2`.
We're using the fact that every parser plugin is uniquely identifiable by its name.

**Removing** parser plugin **globally** for all subsequence `parse` calls is achieved by mutating global options:

```js
import { parse, options, mergeOptions } from '@swagger-api/apidom-reference';

options.parse.parsers = options.parse.parsers.filter(parserPlugin => parserPlugin !== 'asyncapi-json-2')

// here you can be sure `asyncapi-json-2` plugin was disabled
await parse('/home/user/oas.json', {
  parse: {
    mediaType: 'application/vnd.oai.openapi+json;version=3.1.0',
  }
});
```

**Removing** default parser plugin on **ad-hoc** basis:

```js
import { parse, options } from '@swagger-api/apidom-reference';

await parse('/home/user/oas.json', {
  parse: {
    mediaType: 'application/vnd.oai.openapi+json;version=3.1.0',
    parsers: options.parse.parsers.filter(parserPlugin => parserPlugin.name !== 'asyncapi-json-2'),
  }
});
```
As you can see, these are all primitive JavaScript Array manipulation techniques.
These techniques can be applied to replacing (use [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)) or reordering parser plugins as well.


## Resolve component

`Resolve component` consists of two (2) sub-components: **File resolution** and **External Resolution**.
`Resolve component` is used by [Parse component](#parse-component) under the hood. `Resolve component` provides a resolved
file contents for a Parse component to parse.

### File resolution

Contains implementation of default [resolver plugins](https://github.com/swagger-api/apidom/tree/main/packages/apidom-reference/src/resolve/resolvers).
Defaults resolver plugin is an object which knows how to obtain contents of a file represented by URI or URL.

#### Resolver plugins

File resolution comes with two (2) default resolver plugins.

##### [FileResolver](https://github.com/swagger-api/apidom/blob/main/packages/apidom-reference/src/resolve/resolvers/file)

This resolver plugin is responsible for resolving a local file.
It detects if the provided URI represents a filesystem path and if so,
reads the file and provides its content.

**WARNING**: use this plugin with caution, as it can read files from a local file system.
By default, this plugin will reject to read any files from the local file system, unless
explicitly provided by **fileAllowList** option.

###### Providing file allow list

File allow list can be provided **globally** as an option to `FileResolver` in form
of array of *glob patterns* or *regular expressions*.

```js
import { options } from '@swagger-api/apidom-reference';
import { FileResolver } from '@swagger-api/apidom-reference/resolve/resolvers/file';
import { HttpResolverAxios } from '@swagger-api/apidom-reference/resolve/resolvers/http-axios';

options.resolve.resolvers = [
  FileResolver({
    fileAllowList: [
      '*.json',
      /\.json$/,
    ]
  }),
  HttpResolverAxios({ timeout: 5000, redirects: 5, withCredentials: false }),
]
```

File allow list can also be provided on ad-hoc basis:

```js
import { resolve } from '@swagger-api/apidom-reference';

await resolve('/home/user/oas.json', {
  resolve: {
    resolverOpts: {
      fileAllowList: [
        '*.json',
        /\.json$/,
      ]
    },
  },
});
```

##### [HttpResolverAxios](https://github.com/swagger-api/apidom/blob/main/packages/apidom-reference/src/resolve/resolvers/http-axios)

This resolver plugin is responsible for resolving a remote file represented by HTTP(s) URL.
It detects if the provided URI represents an HTTP(s) URL and if so,
fetches the file and provides its content.

###### [Axios Request Config](https://axios-http.com/docs/req_config) support

HttpResolverAxios plugin supports all the options available in [Axios Request Config](https://axios-http.com/docs/req_config).
Config options can be provided in following way:

```js
import { resolve } from '@swagger-api/apidom-reference';

await resolve('https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.1/webhook-example.json', {
  resolve: {
    resolverOpts: {
      axiosConfig: {
        timeout: 10000,
        withCredentials: false,
        responseType: 'json',
      },
    },
  },
});
```

###### [Axios Interceptors](https://axios-http.com/docs/interceptors) support

HttpResolverAxios plugin supports [Axios Interceptors](https://axios-http.com/docs/interceptors).
Interceptors can be provided in following way:

```js
import { resolve } from '@swagger-api/apidom-reference';

const requestInterceptor = (config) => config;
const responseInterceptor = (response) => response;

await resolve('https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.1/webhook-example.json', {
  resolve: {
    resolverOpts: {
      axiosConfig: {
        interceptors: {
          request: requestInterceptor,
          response: responseInterceptor,
        },
      },
    },
  },
});
```

Multiple request and response interceptors can be provided in following way:

```js
import { resolve } from '@swagger-api/apidom-reference';

const requestInterceptor1 = (config) => config;
const requestInterceptor2 = (config) => config;
const responseInterceptor1 = (response) => response;
const responseInterceptor2 = async (error) => Promise.reject(error);

await resolve('https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.1/webhook-example.json', {
  resolve: {
    resolverOpts: {
      axiosConfig: {
        interceptors: {
          request: [requestInterceptor1, requestInterceptor2],
          response: [responseInterceptor1, responseInterceptor2],
        },
      },
    },
  },
});
```

**File resolution on local filesystem path**:

```js
import { readFile } from '@swagger-api/apidom-reference';

await readFile('/home/user/oas.json'); // Promise<Buffer>
```

**File resolution on HTTP(s) URL:**

```js
import { readFile } from '@swagger-api/apidom-reference';

await readFile('https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.1/webhook-example.json'); // Promise<Buffer>
```
File resolution always returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) containing a [Buffer](https://nodejs.org/api/buffer.html).
It is responsibility of the API consumer to transform `Buffer` into `String` or any other type.

```js
import { readFile } from '@swagger-api/apidom-reference';

const buffer = await readFile('/home/user/oas.json');
const string = buffer.toString('utf-8');
```

##### Resolver plugins execution order

It's important to understand that default resolver plugins are run in specific order. The order is determined
by the [options.resolve.resolvers]https://github.com/swagger-api/apidom/blob/ba888d711a4292e8ed0b72e343c4902a4bf0d45a/packages/apidom-reference/src/configuration/saturated.ts#L36) option.
Every plugin is pulled from `options.resolve.resolvers` option, and it's `canRead` method is called to determine
whether the plugin can resolve the URI. If `canRead` returns `true`, `read` method of plugin is called
and result from reading the file is returned. No subsequent resolver plugins are run.
If `canRead` returns `false`, next resolver plugin is pulled and this process is repeated until one
of the resolver plugins `canRead` method returns `true` or until entire list of resolver plugins is exhausted (throws error).

```js
[
  FileResolver(),
  HttpResolverAxios({ timeout: 5000, redirects: 5, withCredentials: false }),
]
```

It's possible to **change** resolver plugins **order globally** by mutating global `resolve` option:

```js
import { options } from '@swagger-api/apidom-reference';
import { FileResolver } from '@swagger-api/apidom-reference/resolve/resolvers/file';
import { HttpResolverAxios } from '@swagger-api/apidom-reference/resolve/resolvers/http-axios';

options.resolve.resolvers = [
  HttpResolverAxios({ timeout: 5000, redirects: 5, withCredentials: false }),
  FileResolver(),
]
```

To **change** resolver plugins **order** on ad-hoc basis:

```js
import { readFile } from '@swagger-api/apidom-reference';
import { FileResolver } from '@swagger-api/apidom-reference/resolve/resolvers/file';
import { HttpResolverAxios } from '@swagger-api/apidom-reference/resolve/resolvers/http-axios';

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
**options globally** by mutating global `resolve` options:

```js
import { options, readFile } from '@swagger-api/apidom-reference';

options.resolve.resolverOpts = {
  axiosConfig: {
    timeout: 10000,
  },
};

await readFile('https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.1/webhook-example.json');
```

To **change** the resolver plugins **options** on ad-hoc basis:

```js
import { readFile } from '@swagger-api/apidom-reference';

await readFile('https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.1/webhook-example.json', {
  resolve: {
    resolverOpts: {
      axiosConfig: {
        timeout: 10000,
      },
    },
  },
});
```

Both of above examples will be using [HttpResolverAxios](https://github.com/swagger-api/apidom/blob/main/packages/apidom-reference/src/resolve/resolvers/http-axios) plugin
(as we're trying to resolve HTTP(s) URL) and the `timeout` of resolution will increase from **default 3 seconds**
to 10 seconds.

##### Creating new resolver plugin

Resolve component can be extended by additional resolver plugins. Every resolver plugin is an object that
must conform to the following interface/shape:

```typescript
{
  // uniquely identifies this plugin
  name: string,

  // this method is called to determine whether the resolver plugin can resolve the file
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
import { readFile, options } from '@swagger-api/apidom-reference';

const myCustomResolverPlugin = {
  name: 'myCustomResolverPlugin',
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
import { readFile, options } from '@swagger-api/apidom-reference';

const myCustomResolverPlugin = {
  name: 'myCustomResolverPlugin',
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

To override the default resolver plugins entirely, set `myCustomResolverPlugin` plugin to be the only one available:

```js
import { readFile } from '@swagger-api/apidom-reference';

const myCustomResolverPlugin = {
  name: 'myCustomResolverPlugin',
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
New resolver plugins can be based on two predefined stamps: [Resolver](https://github.com/swagger-api/apidom/blob/main/packages/apidom-reference/src/resolve/resolvers/Resolver.ts) and [HttpResolver](https://github.com/swagger-api/apidom/blob/main/packages/apidom-reference/src/resolve/resolvers/HttpResolver.ts).

##### Manipulating resolver plugins

Resolver plugins can be added, removed, replaced or reordered. We've already covered these techniques in [Manipulating parser plugins section](#manipulating-parser-plugins).

### External resolution

External resolution is a process of resolving all external dependencies of a particular
document using a specific [external resolution strategy](https://github.com/swagger-api/apidom/tree/main/packages/apidom-reference/src/resolve/strategies). External resolution strategy is determined by
asserting on `mediaType` option. [File Resolution](#file-resolution) (file content is read/fetched)
and [Parse component](#parse-component) (file content is parsed) are used under the hood.

**Externally resolving a file localed on a local filesystem:**

```js
import { resolve } from '@swagger-api/apidom-reference';

await resolve('/home/user/oas.json', {
  parse: { mediType: 'application/vnd.oai.openapi+json;version=3.1.0' },
}); // Promise<ReferenceSet>
```

**Externally resolving an HTTP(S) URL located on an internet:**

```js
import { resolve } from '@swagger-api/apidom-reference';

await resolve('https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.1/webhook-example.json', {
  parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
  resolve: {
    resolverOpts: {
      axiosConfig: {
        timeout: 10
      },
    },
  },
}); // Promise<ReferenceSet>
```

**Externally resolving an ApiDOM fragment:**

When externally resolving an ApiDOM fragment, [baseURI](https://github.com/swagger-api/apidom/blob/91763fa4ad876375a413e7049c28c2031c7bbe83/apidom/packages/apidom-reference/src/options/index.ts#L47)
resolve option needs to be provided to have a starting point for external dependency resolution.
`mediaType` parse option is unnecessary as we can directly assert the type of ApiDOM fragment.

```js
import { OpenApi3_1Element } from '@swagger-api/apidom-ns-openapi-3-1';
import { resolveApiDOM } from '@swagger-api/apidom-reference';

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

[ReferenceSet](https://github.com/swagger-api/apidom/blob/main/packages/apidom-reference/src/ReferenceSet.ts) is a [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
like structure containing list of [Reference](https://github.com/swagger-api/apidom/blob/main/packages/apidom-reference/src/Reference.ts) objects.
Every Reference object represents single external dependency.

#### [External resolution strategies](https://github.com/swagger-api/apidom/tree/main/packages/apidom-reference/src/resolve/strategies)

External resolution strategy determines how a document is externally resolved. Depending on document `mediaType`
every strategy differs significantly. Resolve component comes with two (2) default external resolution strategies.

##### [asyncapi-2](https://github.com/swagger-api/apidom/tree/main/packages/apidom-reference/src/resolve/strategies/asyncapi-2)

External resolution strategy for understanding and resolving external dependencies of [AsyncApi 2.x.y](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md) definitions.

Supported media types:

```js
[
  'application/vnd.aai.asyncapi;version=2.0.0',
  'application/vnd.aai.asyncapi+json;version=2.0.0',
  'application/vnd.aai.asyncapi+yaml;version=2.0.0',
  'application/vnd.aai.asyncapi;version=2.1.0',
  'application/vnd.aai.asyncapi+json;version=2.1.0',
  'application/vnd.aai.asyncapi+yaml;version=2.1.0',
  'application/vnd.aai.asyncapi;version=2.2.0',
  'application/vnd.aai.asyncapi+json;version=2.2.0',
  'application/vnd.aai.asyncapi+yaml;version=2.2.0',
  'application/vnd.aai.asyncapi;version=2.3.0',
  'application/vnd.aai.asyncapi+json;version=2.3.0',
  'application/vnd.aai.asyncapi+yaml;version=2.3.0',
  'application/vnd.aai.asyncapi;version=2.4.0',
  'application/vnd.aai.asyncapi+json;version=2.4.0',
  'application/vnd.aai.asyncapi+yaml;version=2.4.0',
  'application/vnd.aai.asyncapi;version=2.5.0',
  'application/vnd.aai.asyncapi+json;version=2.5.0',
  'application/vnd.aai.asyncapi+yaml;version=2.5.0',
  'application/vnd.aai.asyncapi;version=2.6.0',
  'application/vnd.aai.asyncapi+json;version=2.6.0',
  'application/vnd.aai.asyncapi+yaml;version=2.6.0',
]
```
##### [openapi-3-0](https://github.com/swagger-api/apidom/tree/main/packages/apidom-reference/src/resolve/strategies/openapi-3-0)

External resolution strategy for understanding and resolving external dependencies of [OpenApi 3.0.x](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md) definitions.

Supported media types:

```js
[
  'application/vnd.oai.openapi;version=3.0.0',
  'application/vnd.oai.openapi+json;version=3.0.0',
  'application/vnd.oai.openapi+yaml;version=3.0.0',
  'application/vnd.oai.openapi;version=3.0.1',
  'application/vnd.oai.openapi+json;version=3.0.1',
  'application/vnd.oai.openapi+yaml;version=3.0.1',
  'application/vnd.oai.openapi;version=3.0.2',
  'application/vnd.oai.openapi+json;version=3.0.2',
  'application/vnd.oai.openapi+yaml;version=3.0.2',
  'application/vnd.oai.openapi;version=3.0.3',
  'application/vnd.oai.openapi+json;version=3.0.3',
  'application/vnd.oai.openapi+yaml;version=3.0.3',
]
```

##### [openapi-3-1](https://github.com/swagger-api/apidom/tree/main/packages/apidom-reference/src/resolve/strategies/openapi-3-1)

External resolution strategy for understanding and resolving external dependencies of [OpenApi 3.1.0](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md) definitions.

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
by the [options.resolve.strategies](https://github.com/swagger-api/apidom/blob/ba888d711a4292e8ed0b72e343c4902a4bf0d45a/packages/apidom-reference/src/configuration/saturated.ts#L41) option.
Every strategy is pulled from `options.resolve.strategies` option and its `canResolve` method is called to determine
whether the strategy can externally resolve the URI. If `canResolve` returns `true`, `resolve` method of strategy is called
and result from external resolution is returned. No subsequent strategies  are run. If `canResolve` returns
`false`, next strategy is pulled and this process is repeated until one of the strategy's `canResolve` method
returns `true` or until entire list of strategies is exhausted (throws error).

```js
[
  OpenApi3_0ResolveStrategy(),
  OpenApi3_1ResolveStrategy(),
  AsyncApi2ResolveStrategy(),
]
```
Most specific strategies are listed first, most generic are listed last.

It's possible to **change** strategies **order globally** by mutating global `resolve` option:

```js
import { options } from '@swagger-api/apidom-reference';
import { AsyncApi2ResolveStrategy } from '@swagger-api/apidom-reference/resolve/strategies/asyncapi-2';
import { OpenApi3_0ResolveStrategy } from '@swagger-api/apidom-reference/resolve/strategies/openapi-3-0';
import { OpenApi3_1ResolveStrategy } from '@swagger-api/apidom-reference/resolve/strategies/openapi-3-1';

options.resolve.strategies = [
  OpenApi3_0ResolveStrategy(),
  OpenApi3_1ResolveStrategy(),
  AsyncApi2ResolveStrategy(),
];
```

To **change** the strategies **order** on ad-hoc basis:

```js
import { resolve } from '@swagger-api/apidom-reference';
import { AsyncApi2ResolveStrategy } from '@swagger-api/apidom-reference/resolve/strategies/asyncapi-2';
import { OpenApi3_0ResolveStrategy } from '@swagger-api/apidom-reference/resolve/strategies/openapi-3-0';
import { OpenApi3_1ResolveStrategy } from '@swagger-api/apidom-reference/resolve/strategies/openapi-3-1';


await resolve('/home/user/oas.json', {
  parse: {
    mediaType: 'application/vnd.oai.openapi+json;version=3.1.0',
  },
  resolve: {
    strategies: [
      AsyncApi2ResolveStrategy(),
      OpenApi3_0ResolveStrategy(),
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

  // this method is called to determine whether the strategy can externally resolve the file
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
import { resolve, options } from '@swagger-api/apidom-reference';

const myCustomResolverStrategy = {
  name: 'myCustomResolverStrategy',
  canResolve(file) {
    return true;
  },
  async resolve(file) {
     // implementation of external resolution
  }
};

await resolve('/home/user/oas.json', {
  parse: {
    mediaType: 'application/vnd.oai.openapi+json;version=3.1.0',
  },
  resolve: {
    strategies: [...options.resolve.strategies, myCustomResolverStrategy],
  }
});
```

In this particular example we're adding our custom strategy as the last strategy
to the available default external resolution strategy list, so there's a good chance that one of the
default strategies detects that it can externally resolve the `/home/user/oas.json` file,
resolves it and returns `ReferenceSet` object.

If you want to force execution of your strategy, add it as a first one:

```js
import { resolve, options } from '@swagger-api/apidom-reference';


const myCustomResolverStrategy = {
  name: 'myCustomResolverStrategy',
  canResolve(file) {
    return true;
  },
  async resolve(file) {
    // implementation of external resolution
  }
};

await resolve('/home/user/oas.json', {
  parse: {
    mediaType: 'application/vnd.oai.openapi+json;version=3.1.0',
  },
  resolve: {
    strategies: [myCustomResolverStrategy, ...options.resolve.strategies],
  }
});
```

To override the default strategies entirely, set `myCustomResolverStrategy` strategy to be the only one available:

```js
import { resolve } from '@swagger-api/apidom-reference';

const myCustomResolverStrategy = {
  name: 'myCustomResolverStrategy',
  canResolve(file) {
    return true;
  },
  async resolve(file) {
    // implementation of external resolution
  }
};

await resolve('/home/user/oas.json', {
  parse: {
    mediaType: 'application/vnd.oai.openapi+json;version=3.1.0',
  },
  resolve: {
    strategies: [myCustomResolverPlugin],
  }
});
```
New strategies can be based on a predefined stamp called [ResolveStrategy](https://github.com/swagger-api/apidom/blob/main/packages/apidom-reference/src/resolve/strategies/ResolveStrategy.ts).

##### Manipulating external resolution strategies

External resolution strategies can be added, removed, replaced or reordered. We've already covered these techniques in [Manipulating parser plugins section](#manipulating-parser-plugins).

## Dereference component

Dereferencing is a process of transcluding referencing element (internal or external) with a referenced element
using a specific [dereference strategy](https://github.com/swagger-api/apidom/tree/main/packages/apidom-reference/src/dereference/strategies).
Dereferencing strategy is determined by asserting on `mediaType` option. [File Resolution](#file-resolution) (file content is read/fetched)
and [Parse component](#parse-component) (file content is parsed) are used under the hood.

**Dereferencing a file localed on a local filesystem:**

```js
import { dereference } from '@swagger-api/apidom-reference';

await dereference('/home/user/oas.json', {
  parse: { mediType: 'application/vnd.oai.openapi+json;version=3.1.0' },
}); // Promise<Element>
```

**Dereferencing a HTTP(S) URL located on an internet:**

```js
import { dereference } from '@swagger-api/apidom-reference';

await dereference('https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.1/webhook-example.json', {
  parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
  resolve: {
    resolverOpts: {
      axiosConfig: {
        timeout: 10
      },
    },
  },
}); // Promise<ReferenceSet>
```

**Dereferencing an ApiDOM fragment:**

When dereferencing an ApiDOM fragment, [baseURI](https://github.com/swagger-api/apidom/blob/91763fa4ad876375a413e7049c28c2031c7bbe83/apidom/packages/apidom-reference/src/options/index.ts#L47)
resolve option needs to be provided to have a starting point for external dependency resolution.
`mediaType` parse option is unnecessary as we can directly assert the type of ApiDOM fragment.

**ex.json**

```json
{
  "externalParameter": {
    "name": "param1",
    "in": "query"
  }
}
```

```js
import { OpenApi3_1Element } from '@swagger-api/apidom-ns-openapi-3-1';
import { dereferenceApiDOM } from '@swagger-api/apidom-reference';

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

const dereferenced = await dereferenceApiDOM(apidom, {
  resolve: { baseURI: '/home/user/' },
});
/**
 * OpenApi3_1Element {
 *   openapi: '3.1.0',
 *   components: {
 *     parameters: {
 *       externalRef: {
 *         name: param1,
 *         in: query
 *       }
 *     }
 *   }
 * }
 */
```

#### [Dereference strategies](https://github.com/swagger-api/apidom/tree/main/packages/apidom-reference/src/dereference/strategies)

Dereference strategy determines how a document is internally or externally dereferenced. Depending on document `mediaType` option,
every strategy differs significantly. `Dereference component` comes with two (2) default dereference strategies.

##### [asyncapi-2](https://github.com/swagger-api/apidom/tree/main/packages/apidom-reference/src/dereference/strategies/asyncapi-2)

Dereference strategy for dereferencing [AsyncApi 2.x.y](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md) definitions.

Supported media types:

```js
[
  'application/vnd.aai.asyncapi;version=2.0.0',
  'application/vnd.aai.asyncapi+json;version=2.0.0',
  'application/vnd.aai.asyncapi+yaml;version=2.0.0',
  'application/vnd.aai.asyncapi;version=2.1.0',
  'application/vnd.aai.asyncapi+json;version=2.1.0',
  'application/vnd.aai.asyncapi+yaml;version=2.1.0',
  'application/vnd.aai.asyncapi;version=2.2.0',
  'application/vnd.aai.asyncapi+json;version=2.2.0',
  'application/vnd.aai.asyncapi+yaml;version=2.2.0',
  'application/vnd.aai.asyncapi;version=2.3.0',
  'application/vnd.aai.asyncapi+json;version=2.3.0',
  'application/vnd.aai.asyncapi+yaml;version=2.3.0',
  'application/vnd.aai.asyncapi;version=2.4.0',
  'application/vnd.aai.asyncapi+json;version=2.4.0',
  'application/vnd.aai.asyncapi+yaml;version=2.4.0',
  'application/vnd.aai.asyncapi;version=2.5.0',
  'application/vnd.aai.asyncapi+json;version=2.5.0',
  'application/vnd.aai.asyncapi+yaml;version=2.5.0',
  'application/vnd.aai.asyncapi;version=2.6.0',
  'application/vnd.aai.asyncapi+json;version=2.6.0',
  'application/vnd.aai.asyncapi+yaml;version=2.6.0',
]
```

##### [openapi-3-0](https://github.com/swagger-api/apidom/tree/main/packages/apidom-reference/src/dereference/strategies/openapi-3-0)

Dereference strategy for dereferencing [OpenApi 3.0.x](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md) definitions.

Supported media types:

```js
[
  'application/vnd.oai.openapi;version=3.0.0',
  'application/vnd.oai.openapi+json;version=3.0.0',
  'application/vnd.oai.openapi+yaml;version=3.0.0',
  'application/vnd.oai.openapi;version=3.0.1',
  'application/vnd.oai.openapi+json;version=3.0.1',
  'application/vnd.oai.openapi+yaml;version=3.0.1',
  'application/vnd.oai.openapi;version=3.0.2',
  'application/vnd.oai.openapi+json;version=3.0.2',
  'application/vnd.oai.openapi+yaml;version=3.0.2',
  'application/vnd.oai.openapi;version=3.0.3',
  'application/vnd.oai.openapi+json;version=3.0.3',
  'application/vnd.oai.openapi+yaml;version=3.0.3',
]
```

##### [openapi-3-1](https://github.com/swagger-api/apidom/tree/main/packages/apidom-reference/src/dereference/strategies/openapi-3-1)

Dereference strategy for dereferencing [OpenApi 3.1.0](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md) definitions.

Supported media types:

```js
[
  'application/vnd.oai.openapi;version=3.1.0',
  'application/vnd.oai.openapi+json;version=3.1.0',
  'application/vnd.oai.openapi+yaml;version=3.1.0'
]
```

##### Dereference strategies execution order

It's important to understand that default dereference strategies are run in specific order. The order is determined
by the [options.dereference.strategies](https://github.com/swagger-api/apidom/blob/b3a391481360004d3d4a56c1467cece557442ec8/apidom/packages/apidom-reference/src/options/index.ts#L88) option.
Every strategy is pulled from `options.dereference.strategies` option and it's `canDereference` method is called to determine
whether the strategy can dereference the URI. If `canDereference` returns `true`, `dereference` method of strategy is called
and result from dereferencing is returned. No subsequent strategies  are run. If `canDereference` returns
`false`, next strategy is pulled and this process is repeated until one of the strategy's `canDereference` method
returns `true` or until entire list of strategies is exhausted (throws error).

```js
[
  OpenApi3_0DereferenceStrategy(),
  OpenApi3_1DereferenceStrategy(),
  AsyncApi2DereferenceStrategy(),
]
```
Most specific strategies are listed first, most generic are listed last.

It's possible to **change** strategies **order globally** by mutating global `dereference` option:

```js
import { options } from '@swagger-api/apidom-reference';
import { AsyncApi2DereferenceStrategy } from '@swagger-api/apidom-reference/dereference/strategies/asyncapi-2'
import { OpenApi3_0DereferenceStrategy } from '@swagger-api/apidom-reference/dereference/strategies/openapi-3-0'
import { OpenApi3_1DereferenceStrategy } from '@swagger-api/apidom-reference/dereference/strategies/openapi-3-1'

options.dereference.strategies = [
  OpenApi3_0DereferenceStrategy(),
  OpenApi3_1DereferenceStrategy(),
  AsyncApi2DereferenceStrategy(),
];
```

To **change** the strategies **order** on ad-hoc basis:

```js
import { dereference } from '@swagger-api/apidom-reference';
import { AsyncApi2DereferenceStrategy } from '@swagger-api/apidom-reference/dereference/strategies/asyncapi-2'
import { OpenApi3_0DereferenceStrategy } from '@swagger-api/apidom-reference/dereference/strategies/openapi-3-0'
import { OpenApi3_1DereferenceStrategy } from '@swagger-api/apidom-reference/dereference/strategies/openapi-3-1'

await dereference('/home/user/oas.json', {
  parse: {
    mediaType: 'application/vnd.oai.openapi+json;version=3.1.0',
  },
  dereference: {
    strategies: [
      AsyncApi2DereferenceStrategy(),
      OpenApi3_0DereferenceStrategy(),
      OpenApi3_1DereferenceStrategy(),
    ]
  }
});
```
##### Creating new dereference strategy

Dereference component can be extended by additional strategies. Every strategy is an object that
must conform to the following interface/shape:

```typescript
{
  // uniquely identifies this plugin
  name: string,

  // this method is called to determine whether the strategy can dereference the file
  canDereference(file: IFile): boolean {
    // ...implementation...
  },

  // this method actually dereferences the file
  async dereference(file: IFile, options: IReferenceOptions): Promise<Element> {
    // ...implementation...
  }
}
```

New strategy is then provided as an option to the `dereference` function:

```js
import { dereference, options } from '@swagger-api/apidom-reference';

const myCustomDereferenceStrategy = {
  name: 'myCustomDereferenceStrategy',
  canDereference(file) {
    return true;
  },
  async dereference(file, options: IReferenceOptions) {
     // implementation of dereferenceing
  }
};

await dereference('/home/user/oas.json', {
  parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
  dereference: {
    strategies: [...options.dereference.strategies, myCustomDereferenceStrategy],
  }
});
```

In this particular example we're adding our custom strategy as the last strategy
to the available default dereference strategy list, so there's a good chance that one of the
default strategies detects that it can dereference the `/home/user/oas.json` file,
dereferences it and returns a dereferenced element.

If you want to force execution of your strategy, add it as a first one:

```js
import { dereference, options } from '@swagger-api/apidom-reference';

const myCustomDereferenceStrategy = {
  name: 'myCustomDereferenceStrategy',
  canDereference(file) {
    return true;
  },
  async dereference(file, options: IReferenceOptions) {
    // implementation of dereferenceing
  }
};

await dereference('/home/user/oas.json', {
  parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
  dereference: {
    strategies: [myCustomDereferenceStrategy, ...options.dereference.strategies],
  }
});
```

To override the default strategies entirely, set `myCustomDereferenceStrategy` strategy to be the only one available:

```js
import { dereference } from '@swagger-api/apidom-reference';

const myCustomDereferenceStrategy = {
  name: 'myCustomDereferenceStrategy',
  canDereference(file) {
    return true;
  },
  async dereference(file, options: IReferenceOptions) {
    // implementation of dereferenceing
  }
};

await dereference('/home/user/oas.json', {
  parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
  dereference: {
    strategies: [myCustomDereferenceStrategy],
  }
});
```

New strategies can be based on a predefined stamp called [DereferenceStrategy](https://github.com/swagger-api/apidom/blob/main/packages/apidom-reference/src/dereference/strategies/DereferenceStrategy.ts).

##### Manipulating dereference strategies

Dereference strategies can be added, removed, replaced or reordered. We've already covered these techniques in [Manipulating parser plugins section](#manipulating-parser-plugins).

##### Increasing speed of dereference

Our two default dereference strategies are built on asynchronous sequential traversing of ApiDOM.
The total time of dereferencing is the sum of `traversing` + sum of `external resolution per referencing element`.
By having a huge number of external dependencies in your definition file, dereferencing can get quite slow.
Fortunately there is solution for this by running an `external resolution` first,
and passing its result to dereferencing via an option. External resolution is built on asynchronous parallel traversal (on single file),
so it's theoretically always faster on huge amount of external dependencies than the dereferencing.

```js
import { resolve, dereference } from '@swagger-api/apidom-reference';

const refSet = await resolve('/home/user/oas.json', {
  parse: { mediType: 'application/vnd.oai.openapi+json;version=3.1.0' },
});

const dereferenced = await dereference('/home/user/oas.json', {
  parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
  dereference: { refSet },
});
```

Total time of dereferencing is now the sum of `external resolution traversing` + `dereference traversing` + sum of `max external resolution per file`.
