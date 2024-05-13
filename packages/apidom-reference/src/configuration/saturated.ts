import FileResolver from '../resolve/resolvers/file/index-node';
import HTTPResolverAxios from '../resolve/resolvers/http-axios';
import OpenApi2ResolveStrategy from '../resolve/strategies/openapi-2';
import OpenApi3_0ResolveStrategy from '../resolve/strategies/openapi-3-0';
import OpenApi3_1ResolveStrategy from '../resolve/strategies/openapi-3-1';
import AsyncApi2ResolveStrategy from '../resolve/strategies/asyncapi-2';
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
import OpenApi2DereferenceStrategy from '../dereference/strategies/openapi-2';
import OpenApi3_0DereferenceStrategy from '../dereference/strategies/openapi-3-0';
import OpenApi3_1DereferenceStrategy from '../dereference/strategies/openapi-3-1';
import AsyncApi2DereferenceStrategy from '../dereference/strategies/asyncapi-2';
import OpenApi3_1BundleStrategy from '../bundle/strategies/openapi-3-1';
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
  OpenApi2ResolveStrategy(),
  OpenApi3_0ResolveStrategy(),
  OpenApi3_1ResolveStrategy(),
  AsyncApi2ResolveStrategy(),
  ApiDOMResolveStrategy(),
];

options.dereference.strategies = [
  OpenApi2DereferenceStrategy(),
  OpenApi3_0DereferenceStrategy(),
  OpenApi3_1DereferenceStrategy(),
  AsyncApi2DereferenceStrategy(),
  ApiDOMDereferenceStrategy(),
];

options.bundle.strategies = [OpenApi3_1BundleStrategy()];

export * from '../index';
