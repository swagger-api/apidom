import FileResolver from '../resolvers/FileResolver';
import HttpResolverAxios from '../resolvers/HttpResolverAxios';

import OpenApi3_1ResolveStrategy from '../resolve-strategies/openapi-3-1';

import OpenApiJson3_1Parser from '../parsers/apidom-reference-parser-openapi-json-3-1';
import OpenApiYaml3_1Parser from '../parsers/apidom-reference-parser-openapi-yaml-3-1';
import AsyncApiJson2_0Parser from '../parsers/apidom-reference-parser-asyncapi-json-2-0';
import AsyncApiYaml2_0Parser from '../parsers/apidom-reference-parser-asyncapi-yaml-2-0';
import JsonParser from '../parsers/apidom-reference-parser-json';
import YamlParser from '../parsers/apidom-reference-parser-yaml';

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
     * If set to a specific resolve strategy, loop for suitable resolve strategy will be skipped
     * and this strategy will be used directly.
     */
    strategy: null,
    /**
     * Determines strategies how References are identified and processed by resolvers.
     * Strategy is determined by media type.
     *
     * You can add additional resolver strategies of your own, replace an existing one with
     * your own implementation, or remove any resolver by removing it from the list.
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
     */
    maxDepth: +Infinity,
  },
};

export default defaultOptions;
