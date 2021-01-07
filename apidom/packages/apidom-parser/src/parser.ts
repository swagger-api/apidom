import stampit from 'stampit';
import { head } from 'ramda';
import { isArray, isFunction, isString, isUndefined } from 'ramda-adjunct';
import { ParseResultElement, Namespace } from 'apidom';

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

const ApiDOMParser: stampit.Stamp<ApiDOMParser> = stampit().init(function ApiDOMParser() {
  const adapters: ApiDOMParserAdapter[] = [];

  const detectAdapterCandidates = (source: string) => {
    return adapters.filter((adapter) => {
      if (!isFunction(adapter.detect)) return false;

      return adapter.detect(source);
    });
  };

  const findAdapter = (source: string, mediaType: string | undefined) => {
    if (isString(mediaType)) {
      return adapters.find((adapter) => {
        if (!isArray(adapter.mediaTypes)) return false;

        return adapter.mediaTypes.includes(mediaType);
      });
    }

    return head(detectAdapterCandidates(source));
  };

  this.use = function use(adapter: ApiDOMParserAdapter) {
    adapters.push(adapter);
    return this;
  };

  this.findNamespace = function findNamespace(source: string, options: ParserOptions = {}) {
    const adapter = findAdapter(source, options.mediaType);

    return adapter?.namespace;
  };

  this.parse = async function parse(source: string, options: ParserOptions = {}) {
    const adapter = findAdapter(source, options.mediaType);

    if (isUndefined(adapter)) {
      return Promise.reject(new Error('Document did not match any registered parsers'));
    }

    return adapter.parse(source, options);
  };
});

export default ApiDOMParser;
