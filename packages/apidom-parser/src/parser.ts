import stampit from 'stampit';
import { head } from 'ramda';
import { isArray, isFunction, isString, isUndefined } from 'ramda-adjunct';
import { ParseResultElement, Namespace } from '@swagger-api/apidom-core';

interface ParserOptions extends Record<string, any> {
  mediaType?: string;
}

type Detect = (source: string) => boolean;
type Parse = (source: string, options: ParserOptions) => Promise<ParseResultElement>;

interface ApiDOMParserAdapter {
  detect?: Detect;
  mediaTypes?: string[];
  parse: Parse;
  namespace: Namespace;
}

interface ApiDOMParser {
  use(adapter: ApiDOMParserAdapter): ApiDOMParser;
  findNamespace(source: string, options?: ParserOptions): Namespace;
  parse(source: string, options?: ParserOptions): Promise<ParseResultElement>;
}

const ApiDOMParser: stampit.Stamp<ApiDOMParser> = stampit().init(
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

    this.findNamespace = async function findNamespace(source: string, options: ParserOptions = {}) {
      const adapter = await findAdapter(source, options.mediaType);

      return adapter?.namespace;
    };

    this.parse = async function parse(source: string, options: ParserOptions = {}) {
      const adapter = await findAdapter(source, options.mediaType);

      if (isUndefined(adapter)) {
        throw new Error('Document did not match any registered parsers');
      }

      return adapter.parse(source, options);
    };
  },
);

export default ApiDOMParser;
