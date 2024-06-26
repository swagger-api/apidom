import FileResolver from '../resolve/resolvers/file/index-node';
import HTTPResolverAxios from '../resolve/resolvers/http-axios';
import OpenAPI2ResolveStrategy from '../resolve/strategies/openapi-2';
import OpenAPI3_0ResolveStrategy from '../resolve/strategies/openapi-3-0';
import OpenAPI3_1ResolveStrategy from '../resolve/strategies/openapi-3-1';
import AsyncAPI2ResolveStrategy from '../resolve/strategies/asyncapi-2';
import ApiDOMResolveStrategy from '../resolve/strategies/apidom';
import APIDesignSystemsJSONParser from '../parse/parsers/api-design-systems-json';
import APIDesignSystemsYAMLParser from '../parse/parsers/api-design-systems-yaml';
import OpenAPIJSON2Parser from '../parse/parsers/openapi-json-2';
import OpenAPIYAML2Parser from '../parse/parsers/openapi-yaml-2';
import OpenAPIJSON3_0Parser from '../parse/parsers/openapi-json-3-0';
import OpenAPIYAML3_0Parser from '../parse/parsers/openapi-yaml-3-0';
import OpenAPIJSON3_1Parser from '../parse/parsers/openapi-json-3-1';
import OpenAPIYAML3_1Parser from '../parse/parsers/openapi-yaml-3-1';
import AsyncAPIJSON2Parser from '../parse/parsers/asyncapi-json-2';
import AsyncAPIYAML2Parser from '../parse/parsers/asyncapi-yaml-2';
import WorkflowsJSON1Parser from '../parse/parsers/workflows-json-1';
import WorkflowsYAML1Parser from '../parse/parsers/workflows-yaml-1';
import APIDOMJSONParser from '../parse/parsers/apidom-json';
import JSONParser from '../parse/parsers/json';
import YAMLParser from '../parse/parsers/yaml-1-2';
import BinaryParser from '../parse/parsers/binary/index-node';
import ApiDOMDereferenceStrategy from '../dereference/strategies/apidom';
import OpenAPI2DereferenceStrategy from '../dereference/strategies/openapi-2';
import OpenAPI3_0DereferenceStrategy from '../dereference/strategies/openapi-3-0';
import OpenAPI3_1DereferenceStrategy from '../dereference/strategies/openapi-3-1';
import AsyncAPI2DereferenceStrategy from '../dereference/strategies/asyncapi-2';
import OpenAPI3_1BundleStrategy from '../bundle/strategies/openapi-3-1';
import { options } from '../index';

options.parse.parsers = [
  new OpenAPIJSON2Parser({ allowEmpty: true, sourceMap: false }),
  new OpenAPIYAML2Parser({ allowEmpty: true, sourceMap: false }),
  new OpenAPIJSON3_0Parser({ allowEmpty: true, sourceMap: false }),
  new OpenAPIYAML3_0Parser({ allowEmpty: true, sourceMap: false }),
  new OpenAPIJSON3_1Parser({ allowEmpty: true, sourceMap: false }),
  new OpenAPIYAML3_1Parser({ allowEmpty: true, sourceMap: false }),
  new AsyncAPIJSON2Parser({ allowEmpty: true, sourceMap: false }),
  new AsyncAPIYAML2Parser({ allowEmpty: true, sourceMap: false }),
  new WorkflowsJSON1Parser({ allowEmpty: true, sourceMap: false }),
  new WorkflowsYAML1Parser({ allowEmpty: true, sourceMap: false }),
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
  new AsyncAPI2ResolveStrategy(),
  new ApiDOMResolveStrategy(),
];

options.dereference.strategies = [
  new OpenAPI2DereferenceStrategy(),
  new OpenAPI3_0DereferenceStrategy(),
  new OpenAPI3_1DereferenceStrategy(),
  new AsyncAPI2DereferenceStrategy(),
  new ApiDOMDereferenceStrategy(),
];

options.bundle.strategies = [new OpenAPI3_1BundleStrategy()];

export * from '../index';
