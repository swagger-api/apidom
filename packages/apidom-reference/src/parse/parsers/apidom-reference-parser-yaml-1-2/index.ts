import stampit from 'stampit';
import { ParseResultElement } from '@swagger-api/apidom-core';
import { parse, mediaTypes } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import { ParserError } from '../../../util/errors';
import { File as IFile, Parser as IParser } from '../../../types';
import Parser from '../Parser';

const YamlParser: stampit.Stamp<IParser> = stampit(Parser, {
  props: {
    name: 'yaml-1-2',
    fileExtensions: ['.yaml', '.yml'],
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
        return await parse(source, { sourceMap: this.sourceMap });
      } catch (error: any) {
        throw new ParserError(`Error parsing "${file.uri}"`, error);
      }
    },
  },
});

export default YamlParser;
