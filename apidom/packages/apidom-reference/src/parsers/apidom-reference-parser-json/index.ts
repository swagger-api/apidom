import stampit from 'stampit';
import { ParseResultElement } from 'apidom';
// @ts-ignore
import { parse } from 'apidom-parser-adapter-json';

import File from '../../util/File';
import { ParserError } from '../../util/errors';

interface JsonParser {
  allowEmpty: boolean;
  sourceMap: boolean;

  canParse(file: File): boolean;
  parse(file: File): Promise<ParseResultElement>;
}

const JsonParser: stampit.Stamp<JsonParser> = stampit({
  props: {
    /**
     * Whether to allow "empty" files. This includes zero-byte files.
     */
    allowEmpty: true,

    /**
     * Whether to generate source map during parsing.
     */
    sourceMap: true,
  },
  init(this: JsonParser, { allowEmpty = this.allowEmpty, sourceMap = this.sourceMap } = {}) {
    this.allowEmpty = allowEmpty;
    this.sourceMap = sourceMap;
  },
  methods: {
    canParse(file: File): boolean {
      return file.extension === '.json';
    },
    async parse(file: File): Promise<ParseResultElement> {
      try {
        return await parse(file.data, { sourceMap: this.sourceMap });
      } catch (e) {
        throw new ParserError(`Error parsing "${file.url}"`, e);
      }
    },
  },
});

export default JsonParser;
