import FileResolver from '../resolve/resolvers/FileResolver';
import HttpResolverAxios from '../resolve/resolvers/HttpResolverAxios';
import OpenApi3_1ResolveStrategy from '../resolve/strategies/openapi-3-1';
import OpenApiJson3_1Parser from '../parse/parsers/apidom-reference-parser-openapi-json-3-1';
import OpenApiYaml3_1Parser from '../parse/parsers/apidom-reference-parser-openapi-yaml-3-1';
import AsyncApiJson2_0Parser from '../parse/parsers/apidom-reference-parser-asyncapi-json-2-0';
import AsyncApiYaml2_0Parser from '../parse/parsers/apidom-reference-parser-asyncapi-yaml-2-0';
import JsonParser from '../parse/parsers/apidom-reference-parser-json';
import YamlParser from '../parse/parsers/apidom-reference-parser-yaml';
import OpenApi3_1DereferenceStrategy from '../dereference/strategies/openapi-3-1';
import { ReferenceOptions as IReferenceOptions } from '../types';

const defaultOptions: IReferenceOptions = {
  parse: {
    /**
     * This is media type that
     */
    mediaType: 'text/plain',

    /**
     * Determines how how different types of files will be parsed.
     *
     * You can add additional parsers of your own, replace an existing one with
     * your own implementation, or remove any resolver by removing it from the list.
     * It's recommended to keep the order of parser from most specific ones to most generic ones.
     */
    parsers: [
      OpenApiJson3_1Parser({ allowEmpty: true, sourceMap: false }),
      OpenApiYaml3_1Parser({ allowEmpty: true, sourceMap: false }),
      AsyncApiJson2_0Parser({ allowEmpty: true, sourceMap: false }),
      AsyncApiYaml2_0Parser({ allowEmpty: true, sourceMap: false }),
      JsonParser({ allowEmpty: true, sourceMap: false }),
      YamlParser({ allowEmpty: true, sourceMap: false }),
    ],
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
     * Determines strategies how References are identified and processed by resolvers.
     * Strategy is determined by media type.
     *
     * You can add additional resolver strategies of your own, replace an existing one with
     * your own implementation, or remove any resolve strategy by removing it from the list.
     */
    strategies: [OpenApi3_1ResolveStrategy()],
    /**
     * Determines whether external references will be resolved.
     * If this option is disabled, then none of above resolvers will be called.
     * Instead, external references will simply be ignored.
     */
    external: true,
    /**
     * Determines the maximum depth of resolve algorithms.
     * By default there is no limit.
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
    strategies: [OpenApi3_1DereferenceStrategy()],
    /**
     * Determines the maximum depth of dereferencing.
     * By default there is no limit.
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
