import stampit from 'stampit';
import { ParseResultElement } from 'apidom';
// @ts-ignore
import { parse } from 'apidom-parser-adapter-json';

import { ParserError } from '../../util/errors';
import { Parser as IParser, File as IFile } from '../../types';

const JsonParser: stampit.Stamp<IParser> = stampit({
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
  init(this: IParser, { allowEmpty = this.allowEmpty, sourceMap = this.sourceMap } = {}) {
    this.allowEmpty = allowEmpty;
    this.sourceMap = sourceMap;
  },
  methods: {
    canParse(file: IFile): boolean {
      return file.extension === '.json';
    },
    async parse(file: IFile): Promise<ParseResultElement> {
      try {
        return await parse(file.data, { sourceMap: this.sourceMap });
      } catch (e) {
        throw new ParserError(`Error parsing "${file.uri}"`, e);
      }
    },
  },
});

export default JsonParser;
