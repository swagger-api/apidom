import stampit from 'stampit';
import { ParseResultElement } from '@swagger-api/apidom-core';
import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import { ParserError } from '../../../util/errors';
import { File as IFile, Parser as IParser } from '../../../types';
import Parser from '../Parser';

const YamlParser: stampit.Stamp<IParser> = stampit(Parser, {
  props: {
    name: 'yaml-1-2',
  },
  methods: {
    canParse(file: IFile): boolean {
      return (
        ['text/yaml', 'application/yaml'].includes(file.mediaType) ||
        ['.yaml', '.yml'].includes(file.extension)
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
