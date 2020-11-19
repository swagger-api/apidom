import stampit from 'stampit';
import { ParseResultElement } from 'apidom';
// @ts-ignore
import { parse } from 'apidom-parser-adapter-yaml-1-2';

import File from '../../util/File';
import { ParserError } from '../../util/errors';

interface YamlParser {
  allowEmpty: boolean;
  sourceMap: boolean;

  canParse(file: File): boolean;
  parse(file: File): Promise<ParseResultElement>;
}

const YamlParser: stampit.Stamp<YamlParser> = stampit({
  props: {
    /**
     * Whether to allow "empty" files. This includes zero-byte files.
     */
    allowEmpty: true,

    /**
     * Whether to generate source map during parsing.
     */
    sourceMap: false,
  },
  init(this: YamlParser, { allowEmpty = this.allowEmpty, sourceMap = this.sourceMap } = {}) {
    this.allowEmpty = allowEmpty;
    this.sourceMap = sourceMap;
  },
  methods: {
    canParse(file: File): boolean {
      return ['.yaml', '.yml'].includes(file.extension);
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

export default YamlParser;
