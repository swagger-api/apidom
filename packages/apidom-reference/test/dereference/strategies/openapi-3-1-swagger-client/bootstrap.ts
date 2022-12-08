// @ts-ignore
import SwaggerClient from 'swagger-client';

import options from '../../../../src/options';
import JsonParser from './helpers/parsers/json';
import YamlParser from './helpers/parsers/yaml1-2';
import OpenApiJson3_1Parser from './helpers/parsers/openapi-json-3-1';
import OpenApiYaml3_1Parser from './helpers/parsers/openapi-yaml-3-1';
import HttpResolverSwaggerClient from '../../../../src/resolve/resolvers/http-swagger-client';
import OpenApi3_1SwaggerClientDereferenceStrategy from '../../../../src/dereference/strategies/openapi-3-1-swagger-client';

const originalParsers = [...options.parse.parsers];
const originalResolvers = [...options.resolve.resolvers];
const originalDereferenceStrategies = [...options.dereference.strategies];

export const before = () => {
  // configure custom parser plugins globally
  options.parse.parsers = options.parse.parsers.map((parser) => {
    // @ts-ignore
    if (parser.name === 'json') {
      return JsonParser({ allowEmpty: true, sourceMap: false });
    }
    // @ts-ignore
    if (parser.name === 'yaml-1-2') {
      return YamlParser({ allowEmpty: true, sourceMap: false });
    }
    // @ts-ignore
    if (parser.name === 'openapi-json-3-1') {
      return OpenApiJson3_1Parser({ allowEmpty: true, sourceMap: false });
    }
    // @ts-ignore
    if (parser.name === 'openapi-yaml-3-1') {
      return OpenApiYaml3_1Parser({ allowEmpty: true, sourceMap: false });
    }

    return parser;
  });

  // configure custom resolver plugins globally
  options.resolve.resolvers = options.resolve.resolvers.map((resolver) => {
    // @ts-ignore
    if (resolver.name === 'http-axios') {
      return HttpResolverSwaggerClient({ swaggerHTTPClient: SwaggerClient.http });
    }

    return resolver;
  });

  // configure custom dereference strategy globally
  options.dereference.strategies = options.dereference.strategies.map((strategy) => {
    // @ts-ignore
    if (strategy.name === 'openapi-3-1') {
      return OpenApi3_1SwaggerClientDereferenceStrategy();
    }

    return strategy;
  });
};

export const after = () => {
  options.parse.parsers = originalParsers;
  options.resolve.resolvers = originalResolvers;
  options.dereference.strategies = originalDereferenceStrategies;
};
