import stampit from 'stampit';
import { head } from 'ramda';
import { isFunction, isArray, isUndefined, isString } from 'ramda-adjunct';
import { ParseResultElement } from 'apidom';

interface ParserOptions {
  mediaType?: string;
}

type Detect = (source: string) => boolean;
type Parse = (source: string, options: ParserOptions) => ParseResultElement;

interface ApiDOMParserAdapter {
  detect?: Detect;
  mediaTypes?: string[];
  parse: Parse;
}

const ApiDOMParser = stampit().init(function ApiDOMParser() {
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

  this.parse = async function parse(source: string, options: ParserOptions = {}) {
    const adapter = findAdapter(source, options.mediaType);

    if (isUndefined(adapter)) {
      return Promise.reject(new Error('Document did not match any registered parsers'));
    }

    return adapter.parse(source, options);
  };
});

export default ApiDOMParser;
