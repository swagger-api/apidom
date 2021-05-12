import stampit from 'stampit';
import { ParseResultElement } from 'apidom';
import { parse, mediaTypes } from 'apidom-parser-adapter-openapi-json-3-1';

import { ParserError } from '../../../util/errors';
import { File as IFile, Parser as IParser } from '../../../types';
import Parser from '../Parser';

const OpenApiJson3_1Parser: stampit.Stamp<IParser> = stampit(Parser, {
  props: {
    name: 'openapi-json-3-1',
  },
  methods: {
    canParse(file: IFile): boolean {
      return mediaTypes.includes(file.mediaType) && file.extension === '.json';
    },
    async parse(file: IFile): Promise<ParseResultElement> {
      const source = Buffer.isBuffer(file.data) ? file.data.toString() : file.data;

      try {
        return await parse(source, { sourceMap: this.sourceMap });
      } catch (e) {
        throw new ParserError(`Error parsing "${file.uri}"`, e);
      }
    },
  },
});

export default OpenApiJson3_1Parser;
