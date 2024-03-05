import FileResolver from '../resolve/resolvers/file/index-node';
import HttpResolverAxios from '../resolve/resolvers/http-axios';
import OpenApi2ResolveStrategy from '../resolve/strategies/openapi-2';
import OpenApi3_0ResolveStrategy from '../resolve/strategies/openapi-3-0';
import OpenApi3_1ResolveStrategy from '../resolve/strategies/openapi-3-1';
import AsyncApi2ResolveStrategy from '../resolve/strategies/asyncapi-2';
import ApiDOMResolveStrategy from '../resolve/strategies/apidom';
import ApiDesignSystemsJsonParser from '../parse/parsers/api-design-systems-json';
import ApiDesignSystemsYamlParser from '../parse/parsers/api-design-systems-yaml';
import OpenApiJson2Parser from '../parse/parsers/openapi-json-2';
import OpenApiYaml2Parser from '../parse/parsers/openapi-yaml-2';
import OpenApiJson3_0Parser from '../parse/parsers/openapi-json-3-0';
import OpenApiYaml3_0Parser from '../parse/parsers/openapi-yaml-3-0';
import OpenApiJson3_1Parser from '../parse/parsers/openapi-json-3-1';
import OpenApiYaml3_1Parser from '../parse/parsers/openapi-yaml-3-1';
import AsyncApiJson2Parser from '../parse/parsers/asyncapi-json-2';
import AsyncApiYaml2Parser from '../parse/parsers/asyncapi-yaml-2';
import WorkflowsJson1Parser from '../parse/parsers/workflows-json-1';
import WorkflowsYaml1Parser from '../parse/parsers/workflows-yaml-1';
import ApiDOMJsonParser from '../parse/parsers/apidom-json';
import JsonParser from '../parse/parsers/json';
import YamlParser from '../parse/parsers/yaml-1-2';
import BinaryParser from '../parse/parsers/binary/index-node';
import ApiDOMDereferenceStrategy from '../dereference/strategies/apidom';
import OpenApi2DereferenceStrategy from '../dereference/strategies/openapi-2';
import OpenApi3_0DereferenceStrategy from '../dereference/strategies/openapi-3-0';
import OpenApi3_1DereferenceStrategy from '../dereference/strategies/openapi-3-1';
import AsyncApi2DereferenceStrategy from '../dereference/strategies/asyncapi-2';
import OpenApi3_1BundleStrategy from '../bundle/strategies/openapi-3-1';
import { options } from '../index';

options.parse.parsers = [
  OpenApiJson2Parser({ allowEmpty: true, sourceMap: false }),
  OpenApiYaml2Parser({ allowEmpty: true, sourceMap: false }),
  OpenApiJson3_0Parser({ allowEmpty: true, sourceMap: false }),
  OpenApiYaml3_0Parser({ allowEmpty: true, sourceMap: false }),
  OpenApiJson3_1Parser({ allowEmpty: true, sourceMap: false }),
  OpenApiYaml3_1Parser({ allowEmpty: true, sourceMap: false }),
  AsyncApiJson2Parser({ allowEmpty: true, sourceMap: false }),
  AsyncApiYaml2Parser({ allowEmpty: true, sourceMap: false }),
  WorkflowsJson1Parser({ allowEmpty: true, sourceMap: false }),
  WorkflowsYaml1Parser({ allowEmpty: true, sourceMap: false }),
  ApiDesignSystemsJsonParser({ allowEmpty: true, sourceMap: false }),
  ApiDesignSystemsYamlParser({ allowEmpty: true, sourceMap: false }),
  ApiDOMJsonParser({ allowEmpty: true, sourceMap: false }),
  JsonParser({ allowEmpty: true, sourceMap: false }),
  YamlParser({ allowEmpty: true, sourceMap: false }),
  BinaryParser({ allowEmpty: true }),
];

options.resolve.resolvers = [
  FileResolver(),
  HttpResolverAxios({ timeout: 5000, redirects: 5, withCredentials: false }),
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
