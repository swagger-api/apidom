import stampit from 'stampit';
import { pick } from 'ramda';
import { ParseResultElement } from '@swagger-api/apidom-core';
import { parse, mediaTypes } from '@swagger-api/apidom-parser-adapter-json';

import { ParserError } from '../../../util/errors';
import { Parser as IParser, File as IFile } from '../../../types';
import Parser from '../Parser';

const JsonParser: stampit.Stamp<IParser> = stampit(Parser, {
  props: {
    name: 'json',
    fileExtensions: ['.json'],
    mediaTypes,
  },
  methods: {
    canParse(file: IFile): boolean {
      return (
        this.mediaTypes.includes(file.mediaType) || this.fileExtensions.includes(file.extension)
      );
    },
    async parse(file: IFile): Promise<ParseResultElement> {
      const source = ArrayBuffer.isView(file.data) ? file.data.toString() : file.data;

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
