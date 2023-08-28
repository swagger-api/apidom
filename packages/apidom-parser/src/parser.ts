import stampit from 'stampit';
import { head } from 'ramda';
import { isArray, isFunction, isString, isUndefined } from 'ramda-adjunct';
import { MediaTypes } from '@swagger-api/apidom-core';

import ParserError from './errors/ParserError';
import {
  ApiDOMParser as ApiDOMParserType,
  ApiDOMParserOptions,
  ApiDOMParserAdapter,
} from './types';

export type {
  ApiDOMParser as ApiDOMParserShape,
  ApiDOMParserOptions,
  ApiDOMParserAdapter,
} from './types';

export { ParserError };

const ApiDOMParser: stampit.Stamp<ApiDOMParserType> = stampit().init(
  function ApiDOMParserConstructor() {
    const adapters: ApiDOMParserAdapter[] = [];

    const detectAdapterCandidates = async (source: string) => {
      const candidates = [];

      for (const adapter of adapters) {
        // eslint-disable-next-line no-await-in-loop
        if (isFunction(adapter.detect) && (await adapter.detect(source))) {
          candidates.push(adapter);
        }
      }

      return candidates;
    };

    const findAdapter = async (source: string, mediaType: string | undefined) => {
      if (isString(mediaType)) {
        return adapters.find((adapter) => {
          if (!isArray(adapter.mediaTypes)) return false;

          return adapter.mediaTypes.includes(mediaType);
        });
      }

      const candidates = await detectAdapterCandidates(source);

      return head(candidates);
    };

    this.use = function use(adapter: ApiDOMParserAdapter) {
      adapters.push(adapter);
      return this;
    };

    this.findNamespace = async function findNamespace(
      source: string,
      options: ApiDOMParserOptions = {},
    ) {
      const adapter = await findAdapter(source, options.mediaType);

      return adapter?.namespace;
    };

    this.findMediaType = async function findMediaType(source: string) {
      const adapter = await findAdapter(source, undefined);

      if (typeof adapter === 'undefined') {
        return new MediaTypes().unknownMediaType;
      }

      if (typeof adapter.mediaTypes === 'undefined') {
        return new MediaTypes().unknownMediaType;
      }

      if (typeof adapter.detectionRegExp === 'undefined') {
        return adapter.mediaTypes.latest();
      }

      const { detectionRegExp } = adapter;
      const matches = source.match(detectionRegExp);

      if (matches === null) {
        return new MediaTypes().unknownMediaType;
      }

      const { groups } = matches;
      const version = groups?.version || groups?.version_json || groups?.version_yaml;
      const format = groups?.version_json ? 'json' : groups?.version_yaml ? 'yaml' : 'generic';

      if (typeof version === 'undefined') {
        return adapter.mediaTypes.latest();
      }

      // @ts-ignore
      return adapter.mediaTypes.findBy(version, format);
    };

    this.parse = async function parse(source: string, options: ApiDOMParserOptions = {}) {
      let adapter;

      try {
        adapter = await findAdapter(source, options.mediaType);
      } catch (error: unknown) {
        throw new ParserError(
          'Encountered an unexpected error while matching parser adapters against the source.',
          {
            source,
            parserOptions: options,
            cause: error,
          },
        );
      }

      if (isUndefined(adapter)) {
        throw new ParserError('Source did not match any registered parsers', {
          source,
          parserOptions: options,
        });
      }

      try {
        return adapter.parse(source, options);
      } catch (error: unknown) {
        throw new ParserError('Parsing encountered an unexpected error.', {
          source,
          parserOptions: options,
          cause: error,
        });
      }
    };
  },
);

export default ApiDOMParser;
