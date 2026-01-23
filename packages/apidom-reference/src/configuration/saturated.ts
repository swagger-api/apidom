import FileResolver from '../resolve/resolvers/file/index-node.ts';
import HTTPResolverAxios from '../resolve/resolvers/http-axios/index.ts';
import OpenAPI2ResolveStrategy from '../resolve/strategies/openapi-2/index.ts';
import OpenAPI3_0ResolveStrategy from '../resolve/strategies/openapi-3-0/index.ts';
import OpenAPI3_1ResolveStrategy from '../resolve/strategies/openapi-3-1/index.ts';
import OpenAPI3_2ResolveStrategy from '../resolve/strategies/openapi-3-2/index.ts';
import AsyncAPI2ResolveStrategy from '../resolve/strategies/asyncapi-2/index.ts';
import ApiDOMResolveStrategy from '../resolve/strategies/apidom/index.ts';
import APIDesignSystemsJSONParser from '../parse/parsers/api-design-systems-json/index.ts';
import APIDesignSystemsYAMLParser from '../parse/parsers/api-design-systems-yaml/index.ts';
import OpenAPIJSON2Parser from '../parse/parsers/openapi-json-2/index.ts';
import OpenAPIYAML2Parser from '../parse/parsers/openapi-yaml-2/index.ts';
import OpenAPIJSON3_0Parser from '../parse/parsers/openapi-json-3-0/index.ts';
import OpenAPIYAML3_0Parser from '../parse/parsers/openapi-yaml-3-0/index.ts';
import OpenAPIJSON3_1Parser from '../parse/parsers/openapi-json-3-1/index.ts';
import OpenAPIYAML3_1Parser from '../parse/parsers/openapi-yaml-3-1/index.ts';
import OpenAPIJSON3_2Parser from '../parse/parsers/openapi-json-3-2/index.ts';
import OpenAPIYAML3_2Parser from '../parse/parsers/openapi-yaml-3-2/index.ts';
import AsyncAPIJSON2Parser from '../parse/parsers/asyncapi-json-2/index.ts';
import AsyncAPIJSON3Parser from '../parse/parsers/asyncapi-json-3/index.ts';
import AsyncAPIYAML2Parser from '../parse/parsers/asyncapi-yaml-2/index.ts';
import AsyncAPIYAML3Parser from '../parse/parsers/asyncapi-yaml-3/index.ts';
import ArazzoJSON1Parser from '../parse/parsers/arazzo-json-1/index.ts';
import ArazzoYAML1Parser from '../parse/parsers/arazzo-yaml-1/index.ts';
import APIDOMJSONParser from '../parse/parsers/apidom-json/index.ts';
import JSONParser from '../parse/parsers/json/index.ts';
import YAMLParser from '../parse/parsers/yaml-1-2/index.ts';
import BinaryParser from '../parse/parsers/binary/index-node.ts';
import ApiDOMDereferenceStrategy from '../dereference/strategies/apidom/index.ts';
import OpenAPI2DereferenceStrategy from '../dereference/strategies/openapi-2/index.ts';
import OpenAPI3_0DereferenceStrategy from '../dereference/strategies/openapi-3-0/index.ts';
import OpenAPI3_1DereferenceStrategy from '../dereference/strategies/openapi-3-1/index.ts';
import OpenAPI3_2DereferenceStrategy from '../dereference/strategies/openapi-3-2/index.ts';
import AsyncAPI2DereferenceStrategy from '../dereference/strategies/asyncapi-2/index.ts';
import AsyncAPI3DereferenceStrategy from '../dereference/strategies/asyncapi-3/index.ts';
import OpenAPI3_1BundleStrategy from '../bundle/strategies/openapi-3-1/index.ts';
import { options } from '../index.ts';

options.parse.parsers = [
  new OpenAPIJSON2Parser({ allowEmpty: true, sourceMap: false }),
  new OpenAPIYAML2Parser({ allowEmpty: true, sourceMap: false }),
  new OpenAPIJSON3_0Parser({ allowEmpty: true, sourceMap: false }),
  new OpenAPIYAML3_0Parser({ allowEmpty: true, sourceMap: false }),
  new OpenAPIJSON3_1Parser({ allowEmpty: true, sourceMap: false }),
  new OpenAPIYAML3_1Parser({ allowEmpty: true, sourceMap: false }),
  new OpenAPIJSON3_2Parser({ allowEmpty: true, sourceMap: false }),
  new OpenAPIYAML3_2Parser({ allowEmpty: true, sourceMap: false }),
  new AsyncAPIJSON2Parser({ allowEmpty: true, sourceMap: false }),
  new AsyncAPIYAML2Parser({ allowEmpty: true, sourceMap: false }),
  new AsyncAPIJSON3Parser({ allowEmpty: true, sourceMap: false }),
  new AsyncAPIYAML3Parser({ allowEmpty: true, sourceMap: false }),
  new ArazzoJSON1Parser({ allowEmpty: true, sourceMap: false }),
  new ArazzoYAML1Parser({ allowEmpty: true, sourceMap: false }),
  new APIDesignSystemsJSONParser({ allowEmpty: true, sourceMap: false }),
  new APIDesignSystemsYAMLParser({ allowEmpty: true, sourceMap: false }),
  new APIDOMJSONParser({ allowEmpty: true, sourceMap: false }),
  new JSONParser({ allowEmpty: true, sourceMap: false }),
  new YAMLParser({ allowEmpty: true, sourceMap: false }),
  new BinaryParser({ allowEmpty: true }),
];

options.resolve.resolvers = [
  new FileResolver(),
  new HTTPResolverAxios({ timeout: 5000, redirects: 5, withCredentials: false }),
];

options.resolve.strategies = [
  new OpenAPI2ResolveStrategy(),
  new OpenAPI3_0ResolveStrategy(),
  new OpenAPI3_1ResolveStrategy(),
  new OpenAPI3_2ResolveStrategy(),
  new AsyncAPI2ResolveStrategy(),
  new ApiDOMResolveStrategy(),
];

options.dereference.strategies = [
  new OpenAPI2DereferenceStrategy(),
  new OpenAPI3_0DereferenceStrategy(),
  new OpenAPI3_1DereferenceStrategy(),
  new OpenAPI3_2DereferenceStrategy(),
  new AsyncAPI2DereferenceStrategy(),
  new AsyncAPI3DereferenceStrategy(),
  new ApiDOMDereferenceStrategy(),
];

options.bundle.strategies = [new OpenAPI3_1BundleStrategy()];

export * from '../index.ts';
