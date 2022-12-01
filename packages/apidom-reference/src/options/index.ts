import FileResolver from '../resolve/resolvers/FileResolver/index-node';
import HttpResolverAxios from '../resolve/resolvers/HttpResolverAxios';
import OpenApi3_0ResolveStrategy from '../resolve/strategies/openapi-3-0';
import OpenApi3_1ResolveStrategy from '../resolve/strategies/openapi-3-1';
import AsyncApi2ResolveStrategy from '../resolve/strategies/asyncapi-2';
import ApiDesignSystemsJsonParser from '../parse/parsers/api-design-systems-json';
import ApiDesignSystemsYamlParser from '../parse/parsers/api-design-systems-yaml';
import OpenApiJson3_0Parser from '../parse/parsers/openapi-json-3-0';
import OpenApiYaml3_0Parser from '../parse/parsers/openapi-yaml-3-0';
import OpenApiJson3_1Parser from '../parse/parsers/openapi-json-3-1';
import OpenApiYaml3_1Parser from '../parse/parsers/openapi-yaml-3-1';
import AsyncApiJson2Parser from '../parse/parsers/asyncapi-json-2';
import AsyncApiYaml2Parser from '../parse/parsers/asyncapi-yaml-2';
import JsonParser from '../parse/parsers/json';
import YamlParser from '../parse/parsers/yaml-1-2';
import BinaryParser from '../parse/parsers/binary/index-node';
import OpenApi3_0DereferenceStrategy from '../dereference/strategies/openapi-3-0';
import OpenApi3_1DereferenceStrategy from '../dereference/strategies/openapi-3-1';
import AsyncApi2DereferenceStrategy from '../dereference/strategies/asyncapi-2';
import { ReferenceOptions as IReferenceOptions } from '../types';

const defaultOptions: IReferenceOptions = {
  parse: {
    /**
     * This is media type that
     */
    mediaType: 'text/plain',

    /**
     * Determines how different types of files will be parsed.
     *
     * You can add additional parsers of your own, replace an existing one with
     * your own implementation, or remove any resolver by removing it from the list.
     * It's recommended to keep the order of parser from most specific ones to most generic ones.
     */
    parsers: [
      OpenApiJson3_0Parser({ allowEmpty: true, sourceMap: false }),
      OpenApiYaml3_0Parser({ allowEmpty: true, sourceMap: false }),
      OpenApiJson3_1Parser({ allowEmpty: true, sourceMap: false }),
      OpenApiYaml3_1Parser({ allowEmpty: true, sourceMap: false }),
      AsyncApiJson2Parser({ allowEmpty: true, sourceMap: false }),
      AsyncApiYaml2Parser({ allowEmpty: true, sourceMap: false }),
      ApiDesignSystemsJsonParser({ allowEmpty: true, sourceMap: false }),
      ApiDesignSystemsYamlParser({ allowEmpty: true, sourceMap: false }),
      JsonParser({ allowEmpty: true, sourceMap: false }),
      YamlParser({ allowEmpty: true, sourceMap: false }),
      BinaryParser({ allowEmpty: true }),
    ],

    /**
     * These options are merged with parser plugin instance before the plugin is run.
     */
    parserOpts: {},
  },
  resolve: {
    /**
     * baseURI serves as a base for all relative URL found in ApiDOM references.
     */
    baseURI: '',
    /**
     * Determines how References will be resolved.
     *
     * You can add additional resolvers of your own, replace an existing one with
     * your own implementation, or remove any resolver by removing it from the list.
     */
    resolvers: [
      FileResolver(),
      HttpResolverAxios({ timeout: 5000, redirects: 5, withCredentials: false }),
    ],
    /**
     * These options are merged with resolver plugin instance before the plugin is run.
     */
    resolverOpts: {},
    /**
     * Determines strategies how References are identified and processed by resolvers.
     * Strategy is determined by media type.
     *
     * You can add additional resolver strategies of your own, replace an existing one with
     * your own implementation, or remove any resolve strategy by removing it from the list.
     */
    strategies: [
      OpenApi3_0ResolveStrategy(),
      OpenApi3_1ResolveStrategy(),
      AsyncApi2ResolveStrategy(),
    ],
    /**
     * Determines whether external references will be resolved.
     * If this option is disabled, then none of above resolvers will be called.
     * Instead, external references will simply be ignored.
     */
    external: true,
    /**
     * Determines the maximum depth of resolve algorithms.
     * By default, there is no limit.
     *
     * This option tracks the depth of the file tree not the depth of the dereference path.
     *
     * It can be set to any positive integer number or zero (0).
     *
     * The resolver should throw MaximumResolverDepthError if resolution depth
     * is exceeded by this option.
     */
    maxDepth: +Infinity,
  },
  dereference: {
    /**
     * Determines strategies how ApiDOM is dereferenced.
     * Strategy is determined by media type or by inspecting ApiDOM to be dereferenced.
     *
     * You can add additional dereference strategies of your own, replace an existing one with
     * your own implementation, or remove any dereference strategy by removing it from the list.
     */
    strategies: [
      OpenApi3_0DereferenceStrategy(),
      OpenApi3_1DereferenceStrategy(),
      AsyncApi2DereferenceStrategy(),
    ],
    /**
     * This option accepts an instance of pre-computed ReferenceSet.
     * If provided it will speed up the dereferencing significantly as the external
     * resolution doesn't need to happen anymore.
     */
    refSet: null,
    /**
     * Determines the maximum depth of dereferencing.
     * By default, there is no limit.
     *
     * The maxDepth represents a number of references that needed to be followed
     * before the eventual value was reached.
     *
     * It can be set to any positive integer number or zero (0).
     *
     * The dereferencing should throw MaximumDereferenceDepthError if dereferencing depth
     * is exceeded by this option.
     */
    maxDepth: +Infinity,
  },
};

export default defaultOptions;
