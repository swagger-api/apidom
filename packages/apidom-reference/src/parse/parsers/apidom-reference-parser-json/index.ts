import stampit from 'stampit';
import { ParseResultElement } from 'apidom';
import { parse } from 'apidom-parser-adapter-json';
import { pick } from 'ramda';

import { ParserError } from '../../../util/errors';
import { Parser as IParser, File as IFile } from '../../../types';
import Parser from '../Parser';

const JsonParser: stampit.Stamp<IParser> = stampit(Parser, {
  props: {
    name: 'json',
  },
  methods: {
    canParse(file: IFile): boolean {
      return file.mediaType === 'application/json' || file.extension === '.json';
    },
    async parse(file: IFile): Promise<ParseResultElement> {
      const source = Buffer.isBuffer(file.data) ? file.data.toString() : file.data;

      try {
        const parserOpts = pick(['sourceMap', 'syntacticAnalysis'], this);
        return await parse(source, parserOpts);
      } catch (error: any) {
        throw new ParserError(`Error parsing "${file.uri}"`, error);
      }
    },
  },
});

export default JsonParser;
