import { head } from 'ramda';
import { isArray, isFunction, isString, isUndefined } from 'ramda-adjunct';
import { MediaTypes, Namespace, ParseResultElement } from '@swagger-api/apidom-core';

import ParserError from './errors/ParserError';
import { ApiDOMParserOptions, ApiDOMParserAdapter } from './types';

export type { ApiDOMParserOptions, ApiDOMParserAdapter } from './types';

export { ParserError };

class ApiDOMParser {
  private adapters: ApiDOMParserAdapter[] = [];

  protected async detectAdapterCandidates(source: string): Promise<ApiDOMParserAdapter[]> {
    const candidates = [];

    for (const adapter of this.adapters) {
      // eslint-disable-next-line no-await-in-loop
      if (isFunction(adapter.detect) && (await adapter.detect(source))) {
        candidates.push(adapter);
      }
    }

    return candidates;
  }

  protected async findAdapter(
    source: string,
    mediaType: string | undefined,
  ): Promise<ApiDOMParserAdapter | undefined> {
    if (isString(mediaType)) {
      return this.adapters.find((adapter) => {
        if (!isArray(adapter.mediaTypes)) return false;

        return adapter.mediaTypes.includes(mediaType);
      });
    }

    const candidates = await this.detectAdapterCandidates(source);

    return head(candidates);
  }

  use(adapter: ApiDOMParserAdapter): this {
    this.adapters.push(adapter);
    return this;
  }

  async findNamespace(
    source: string,
    options: ApiDOMParserOptions = {},
  ): Promise<Namespace | undefined> {
    const adapter = await this.findAdapter(source, options.mediaType);

    return adapter?.namespace;
  }

  async findMediaType(source: string): Promise<string | void> {
    const adapter = await this.findAdapter(source, undefined);

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
  }

  async parse(source: string, options: ApiDOMParserOptions = {}): Promise<ParseResultElement> {
    let adapter;

    try {
      adapter = await this.findAdapter(source, options.mediaType);
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
  }
}

export default ApiDOMParser;
