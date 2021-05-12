import stampit from 'stampit';
import { ParseResultElement } from 'apidom';
import { parse, mediaTypes } from 'apidom-parser-adapter-asyncapi-json-2-0';

import { ParserError } from '../../../util/errors';
import { File as IFile, Parser as IParser } from '../../../types';
import Parser from '../Parser';

const AsyncApiJson2_0Parser: stampit.Stamp<IParser> = stampit(Parser, {
  props: {
    name: 'asyncapi-json-2-0',
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

export default AsyncApiJson2_0Parser;
