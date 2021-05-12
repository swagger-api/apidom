import stampit from 'stampit';
import { ParseResultElement } from 'apidom';
// @ts-ignore
import { parse } from 'apidom-parser-adapter-yaml-1-2';

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
      const source = Buffer.isBuffer(file.data) ? file.data.toString() : file.data;

      try {
        return await parse(source, { sourceMap: this.sourceMap });
      } catch (e) {
        throw new ParserError(`Error parsing "${file.uri}"`, e);
      }
    },
  },
});

export default YamlParser;
